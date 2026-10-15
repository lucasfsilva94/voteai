// Rules of the test: balanced draw of 25 proposals, scoring, and session validation. Pure functions, no DOM.
import type { Answer, AreaId, CandidateId, Proposal, Result, Session } from './types.ts'

export const ANSWERS: Record<Answer, { label: string; weight: number; position: 'concorda' | 'discorda' | null }> = {
  agree: { label: 'Concordo', weight: 1, position: 'concorda' },
  disagree: { label: 'Discordo', weight: 1, position: 'discorda' },
  important: { label: 'Importante', weight: 2, position: 'concorda' },
  skip: { label: 'Não sei', weight: 0, position: null },
}

export const CANDIDATES: Record<CandidateId, { name: string; party: string; number: string }> = {
  A: { name: 'Flávio Bolsonaro', party: 'PL', number: '22' },
  B: { name: 'Lula', party: 'PT', number: '13' },
}

export const AREAS: Record<AreaId, string> = {
  economia: 'Economia',
  seguranca: 'Segurança',
  'saude-educacao': 'Saúde e educação',
  'programas-sociais': 'Programas sociais',
  'meio-ambiente': 'Meio ambiente',
  costumes: 'Costumes',
  instituicoes: 'Instituições',
}

export const SESSION_KEY = 'voteai:session:1'
export const TOTAL = 25

type Proposer = CandidateId | 'both' | 'none'

export function proposer(p: Pick<Proposal, 'posicoes'>): Proposer {
  const a = p.posicoes.A === 'concorda'
  const b = p.posicoes.B === 'concorda'
  return a && b ? 'both' : a ? 'A' : b ? 'B' : 'none'
}

export function shuffle<T>(items: readonly T[], rng: () => number = Math.random): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function createOrder(proposals: readonly Proposal[], rng: () => number = Math.random, firstId: string | null = null): string[] {
  // Three shared proposals plus eleven exclusive proposals from each candidate.
  const selected: Proposal[] = []
  const counts: Record<Proposer, number> = { A: 0, B: 0, both: 0, none: 0 }
  const quotas: Partial<Record<Proposer, number>> = { A: 11, B: 11, both: 3 }
  const hasRoom = (p: Proposal) => counts[proposer(p)] < (quotas[proposer(p)] ?? 0)
  const pool = shuffle(proposals.filter((p) => Object.hasOwn(quotas, proposer(p))), rng)
  const add = (p: Proposal) => {
    selected.push(p)
    counts[proposer(p)]++
  }
  const first = pool.find((p) => p.id === firstId)
  if (first) add(first)
  for (const area of shuffle(Object.keys(AREAS), rng)) {
    if (selected.some((p) => p.area === area)) continue
    const p = pool.find((p) => p.area === area && !selected.includes(p) && hasRoom(p))
    if (p) add(p)
  }
  while (selected.length < TOTAL) {
    const available = pool.filter((p) => !selected.includes(p) && hasRoom(p))
    available.sort((a, b) => selected.filter((p) => p.area === a.area).length - selected.filter((p) => p.area === b.area).length)
    if (!available.length) throw new Error('Catálogo insuficiente para um teste equilibrado.')
    add(available[0])
  }
  const ids = shuffle(selected, rng).map((p) => p.id)
  if (firstId && ids.includes(firstId)) {
    ids.splice(ids.indexOf(firstId), 1)
    ids.unshift(firstId)
  }
  return ids
}

export function calculate(proposals: readonly Pick<Proposal, 'id' | 'area' | 'posicoes'>[], answers: Partial<Record<string, Answer>>): Result {
  const scores = { A: 0, B: 0 }
  const areas: Result['areas'] = {}
  let weight = 0
  let answered = 0
  let skipped = 0
  for (const p of proposals) {
    const key = answers[p.id]
    const answer = key ? ANSWERS[key] : undefined
    if (!answer) continue
    if (answer.weight === 0) {
      skipped++
      continue
    }
    answered++
    weight += answer.weight
    const area = (areas[p.area] ??= { scores: { A: 0, B: 0 }, weight: 0 })
    area.weight += answer.weight
    const source = proposer(p)
    for (const id of ['A', 'B'] as const) {
      // With no documented opposition, disagreement is allocated to the other candidate
      // by the comparative rule of the test, not presented as an official position.
      const matches =
        p.posicoes[id] === answer.position ||
        (answer.position === 'discorda' && p.posicoes[id] === 'sem-posicao' && source !== 'both' && source !== 'none' && source !== id)
      if (matches) {
        scores[id] += answer.weight
        area.scores[id] += answer.weight
      }
    }
  }
  const percentages = { A: weight ? Math.round((scores.A / weight) * 100) : 0, B: weight ? Math.round((scores.B / weight) * 100) : 0 }
  const status = !weight ? 'empty' : scores.A === scores.B ? 'tie' : 'winner'
  return { scores, weight, percentages, areas, answered, skipped, status, winner: status === 'winner' ? (scores.A > scores.B ? 'A' : 'B') : null }
}

export function validSession(value: unknown, proposals: readonly Proposal[]): value is Session {
  const v = value as Session | null
  if (
    !v ||
    v.version !== 1 ||
    !Array.isArray(v.order) ||
    v.order.length !== TOTAL ||
    !Number.isInteger(v.index) ||
    v.index < 0 ||
    v.index > TOTAL ||
    typeof v.revealed !== 'boolean' ||
    !v.answers ||
    typeof v.answers !== 'object' ||
    Array.isArray(v.answers)
  )
    return false
  const ids = new Set(proposals.map((p) => p.id))
  if (new Set(v.order).size !== TOTAL || v.order.some((id) => !ids.has(id))) return false
  if (Object.entries(v.answers).some(([id, answer]) => !v.order.includes(id) || !Object.hasOwn(ANSWERS, answer as string))) return false
  if (v.order.slice(0, v.index).some((id) => !Object.hasOwn(v.answers, id))) return false
  if (v.revealed && v.index !== TOTAL) return false
  return true
}

type ReadableStorage = Pick<Storage, 'getItem'> | null
type WritableStorage = Pick<Storage, 'setItem'> | null

export function loadSession(storage: ReadableStorage, proposals: readonly Proposal[]): Session | null {
  try {
    const value: unknown = JSON.parse(storage?.getItem(SESSION_KEY) ?? 'null')
    return validSession(value, proposals) ? value : null
  } catch {
    return null
  }
}

export function saveSession(storage: WritableStorage, session: unknown): boolean {
  try {
    if (!storage) return false
    storage.setItem(SESSION_KEY, JSON.stringify(session))
    return true
  } catch {
    return false
  }
}
