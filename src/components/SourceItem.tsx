import { THEME_ICONS } from '../lib/catalog.ts'
import { ANSWERS, AREAS, CANDIDATES } from '../lib/engine.ts'
import type { Answer, Proposal } from '../lib/types.ts'
import { Icon } from './Icon.tsx'
import './SourceItem.scss'

const POSITION_LABEL = { concorda: 'A favor', discorda: 'Contra', 'sem-posicao': 'Sem posição' } as const

// One proposal with both candidates' positions and links to the plan pages.
export function SourceItem({ proposal, answer }: { proposal: Proposal; answer?: Answer }) {
  return (
    <details className="source-item">
      <summary>
        <span className="source-topic">
          <Icon name={THEME_ICONS[proposal.area]} size={16} />
          {AREAS[proposal.area]}
        </span>
        <strong>{proposal.texto}</strong>
        {answer && (
          <span className="answer-badge">
            {ANSWERS[answer].label}
            {answer === 'important' ? ' ×2' : ''}
          </span>
        )}
        <span className="details-plus" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="source-body">
        <p>{proposal.contexto}</p>
        <div className="positions">
          {(['B', 'A'] as const).map((id) => (
            <span key={id} className={`position-${id}`}>
              <strong>{CANDIDATES[id].name}</strong> {POSITION_LABEL[proposal.posicoes[id]]}
            </span>
          ))}
        </div>
        {proposal.fontes.map((f) => (
          <a key={`${f.url}-${f.pagina}`} className="source-link" href={`${f.url}#page=${f.pagina}`} target="_blank" rel="noopener noreferrer">
            {CANDIDATES[f.candidato].name} · {f.documento} · p. {f.pagina} <Icon name="external" size={15} />
          </a>
        ))}
      </div>
    </details>
  )
}
