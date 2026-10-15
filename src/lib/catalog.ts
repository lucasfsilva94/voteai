import { PROPOSALS } from '../data/catalog.ts'
import type { AreaId, Proposal } from './types.ts'

export const proposalById = new Map<string, Proposal>(PROPOSALS.map((p) => [p.id, p]))

export function getProposal(id: string): Proposal {
  const p = proposalById.get(id)
  if (!p) throw new Error(`Proposta desconhecida: ${id}`)
  return p
}

// Icon used for each theme (see components/Icon.tsx).
export const THEME_ICONS: Record<AreaId, IconName> = {
  economia: 'economia',
  seguranca: 'seguranca',
  'saude-educacao': 'saude',
  'programas-sociais': 'social',
  'meio-ambiente': 'leaf',
  costumes: 'costumes',
  instituicoes: 'instituicoes',
}

export type IconName =
  | 'check' | 'cross' | 'arrow' | 'back' | 'star' | 'question' | 'lock' | 'leaf' | 'economia' | 'seguranca' | 'saude' | 'social'
  | 'costumes' | 'instituicoes' | 'clock' | 'mute' | 'volume' | 'share' | 'external' | 'eye' | 'ballot' | 'play' | 'pause' | 'reset'

// Search ignores accents and case.
export const normalize = (text: string) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

export { PROPOSALS }
