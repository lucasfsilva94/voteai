export type CandidateId = 'A' | 'B'
export type Answer = 'agree' | 'disagree' | 'important' | 'skip'
export type AreaId = 'economia' | 'seguranca' | 'saude-educacao' | 'programas-sociais' | 'meio-ambiente' | 'costumes' | 'instituicoes'
export type Position = 'concorda' | 'discorda' | 'sem-posicao'

export type Source = { candidato: CandidateId; documento: string; url: string; pagina: number }

export type Proposal = {
  id: string
  area: AreaId
  texto: string
  contexto: string
  posicoes: Record<CandidateId, Position>
  eixo?: { nome: string; direcao: number }
  fontes: Source[]
}

export type Session = {
  version: 1
  order: string[]
  answers: Partial<Record<string, Answer>>
  index: number
  revealed: boolean
}

export type Result = {
  scores: Record<CandidateId, number>
  weight: number
  percentages: Record<CandidateId, number>
  areas: Partial<Record<AreaId, { scores: Record<CandidateId, number>; weight: number }>>
  answered: number
  skipped: number
  status: 'winner' | 'tie' | 'empty'
  winner: CandidateId | null
}
