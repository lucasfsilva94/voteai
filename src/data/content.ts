import type { Answer } from '../lib/types.ts'

// Demo notes on the landing use proposals both candidates support, so the example never leans to one side.
export const DEMO_NOTES: { id: string; answer: Answer }[] = [
  { id: 'sau-01', answer: 'agree' },
  { id: 'amb-01', answer: 'important' },
  { id: 'amb-05', answer: 'disagree' },
  { id: 'cos-06', answer: 'agree' },
]

// Real proposals for the moving strip: five from each candidate's plan and four shared, across the seven themes.
export const STRIP_NOTES = ['eco-02', 'seg-05', 'sau-01', 'soc-04', 'amb-02', 'cos-04', 'ins-04', 'eco-04', 'seg-03', 'sau-05', 'soc-02', 'amb-01', 'cos-06', 'ins-03']

export const FAQ: [question: string, answer: string][] = [
  ['Isto é uma pesquisa eleitoral?', 'Não. O voteAI não registra voto, não soma respostas de ninguém e não prevê o resultado da eleição. Ele mostra um retrato das suas respostas a um recorte de propostas.'],
  ['De onde vêm as propostas?', 'Dos planos de governo de Lula e Flávio Bolsonaro registrados no TSE. Cada proposta aponta o documento e a página, e os textos foram reescritos em linguagem simples. Você confere tudo em Fontes e critérios.'],
  ['Por que o nome do candidato fica escondido?', 'Para você julgar a ideia, e não a pessoa. O nome de quem propôs cada item aparece só no final, junto com as fontes.'],
  ['Como a afinidade é calculada?', 'Concordo dá 1 ponto a quem apoia a proposta, Importante dá 2, Discordo dá 1 ponto ao outro lado e Não sei não conta. Os dois percentuais são independentes e não precisam somar 100%.'],
  ['Minhas respostas ficam guardadas?', 'Só neste aparelho, para você continuar de onde parou. Nada é enviado. Você pode apagar tudo em Fontes e critérios.'],
  ['Posso fazer o teste de novo?', 'Pode. Cada teste sorteia 25 das 50 propostas, sempre equilibradas entre os dois candidatos e os sete temas.'],
]

// Runoff for president: Sunday, 25 October 2026.
export const RUNOFF = { year: 2026, month: 9, day: 25, label: '25 de outubro de 2026' }
