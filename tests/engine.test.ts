import assert from 'node:assert/strict'
import { test } from 'vitest'
import { PROPOSALS } from '../src/data/catalog.ts'
import { AREAS, calculate, createOrder, loadSession, proposer, saveSession, SESSION_KEY, validSession } from '../src/lib/engine.ts'
import type { Answer, Position, Session } from '../src/lib/types.ts'

function rng(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 2 ** 32
  }
}
const p = (posicoes: { A: Position; B: Position }, id = 'x') => ({ id, area: 'economia' as const, posicoes })
const answers = (value: Record<string, Answer>) => value

test('catalog has 50 sourced proposals, known candidates, valid positions and seven themes', () => {
  assert.equal(PROPOSALS.length, 50)
  assert.equal(new Set(PROPOSALS.map((p) => p.id)).size, 50)
  for (const proposal of PROPOSALS) {
    assert.ok(AREAS[proposal.area])
    assert.ok(proposal.fontes.length)
    for (const f of proposal.fontes) {
      assert.ok(/^https:\/\//.test(f.url))
      assert.ok(f.pagina > 0)
      assert.ok(['A', 'B'].includes(f.candidato))
    }
  }
})

test('25 unique proposals balance exclusive candidates and include every theme across 250 seeds', () => {
  for (let seed = 0; seed < 250; seed++) {
    const order = createOrder(PROPOSALS, rng(seed))
    assert.equal(order.length, 25)
    assert.equal(new Set(order).size, 25)
    const cards = order.map((id) => PROPOSALS.find((p) => p.id === id)!)
    assert.equal(cards.filter((p) => proposer(p) === 'A').length, 11)
    assert.equal(cards.filter((p) => proposer(p) === 'B').length, 11)
    assert.equal(cards.filter((p) => proposer(p) === 'both').length, 3)
    assert.equal(new Set(cards.map((p) => p.area)).size, 7)
  }
})

test('demo proposal is first and order still balanced', () => {
  const order = createOrder(PROPOSALS, rng(4), 'amb-06')
  assert.equal(order[0], 'amb-06')
  assert.equal(new Set(order).size, 25)
})

test('concordo awards proposer, discordo allocates other comparative side without changing positions', () => {
  const card = p({ A: 'concorda', B: 'sem-posicao' })
  assert.deepEqual(calculate([card], answers({ x: 'agree' })).scores, { A: 1, B: 0 })
  assert.deepEqual(calculate([card], answers({ x: 'disagree' })).scores, { A: 0, B: 1 })
  assert.equal(card.posicoes.B, 'sem-posicao')
})

test('explicit opposition and importance double weighting', () => {
  const a = p({ A: 'discorda', B: 'concorda' })
  const b = p({ A: 'concorda', B: 'sem-posicao' }, 'y')
  const r = calculate([a, b], answers({ x: 'important', y: 'agree' }))
  assert.deepEqual(r.scores, { A: 1, B: 2 })
  assert.equal(r.weight, 3)
  assert.deepEqual(r.percentages, { A: 33, B: 67 })
  assert.equal(r.winner, 'B')
  assert.equal(r.areas.economia?.weight, 3)
})

test('shared agreement scores both independently; disagreement awards neither', () => {
  const card = p({ A: 'concorda', B: 'concorda' })
  const r = calculate([card], answers({ x: 'important' }))
  assert.deepEqual(r.percentages, { A: 100, B: 100 })
  assert.equal(r.status, 'tie')
  assert.equal(r.winner, null)
  const d = calculate([card], answers({ x: 'disagree' }))
  assert.deepEqual(d.scores, { A: 0, B: 0 })
  assert.equal(d.status, 'tie')
})

test('only skip and unanswered proposals never choose candidate', () => {
  const card = p({ A: 'concorda', B: 'sem-posicao' })
  for (const given of [{}, { x: 'skip' as const }]) {
    const r = calculate([card], given)
    assert.equal(r.status, 'empty')
    assert.equal(r.winner, null)
    assert.equal(r.weight, 0)
  }
  assert.equal(calculate([card], answers({ x: 'skip' })).skipped, 1)
})

test('changed answer replaces previous contribution', () => {
  const card = p({ A: 'concorda', B: 'sem-posicao' })
  const given: Record<string, Answer> = { x: 'important' }
  assert.equal(calculate([card], given).weight, 2)
  given.x = 'disagree'
  const r = calculate([card], given)
  assert.equal(r.weight, 1)
  assert.equal(r.winner, 'B')
})

test('session validation rejects corrupt, changed and incomplete content', () => {
  const good: Session = { version: 1, order: createOrder(PROPOSALS, rng(2)), answers: {}, index: 0, revealed: false }
  assert.ok(validSession(good, PROPOSALS))
  const bad: unknown[] = [
    null,
    { ...good, version: 2 },
    { ...good, index: 1 },
    { ...good, revealed: true },
    { ...good, order: Array(25).fill('eco-01') },
    { ...good, answers: { missing: 'agree' } },
    { ...good, answers: { [good.order[0]]: 'invented' } },
    { ...good, answers: [] },
  ]
  for (const value of bad) assert.equal(validSession(value, PROPOSALS), false)
  assert.deepEqual(loadSession({ getItem: () => JSON.stringify(good) }, PROPOSALS), good)
  assert.equal(loadSession({ getItem: () => '{oops' }, PROPOSALS), null)
})

test('blocked storage degrades without throwing and saves under correct key', () => {
  const blocked = {
    getItem(): string | null {
      throw Error('blocked')
    },
    setItem(): void {
      throw Error('blocked')
    },
  }
  assert.equal(loadSession(blocked, PROPOSALS), null)
  assert.equal(saveSession(blocked, {}), false)
  assert.equal(saveSession(null, {}), false)
  let stored: [string, string] | undefined
  assert.ok(
    saveSession(
      {
        setItem(k: string, v: string) {
          stored = [k, v]
        },
      },
      { version: 1 },
    ),
  )
  assert.equal(stored?.[0], SESSION_KEY)
})
