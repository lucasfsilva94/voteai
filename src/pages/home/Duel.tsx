import { PORTRAITS } from '../../data/portraits.ts'
import { CANDIDATES } from '../../lib/engine.ts'
import type { CandidateId } from '../../lib/types.ts'

function CandidateCard({ id }: { id: CandidateId }) {
  const c = CANDIDATES[id]
  return (
    <figure className={`duel-card duel-${id}`}>
      <img src={PORTRAITS[id]} alt={`Retrato de ${c.name}`} width={320} height={400} loading="lazy" />
      <figcaption>
        <strong>{c.name}</strong>
        <span>
          {c.party} · {c.number}
        </span>
      </figcaption>
    </figure>
  )
}

export function Duel() {
  return (
    <section className="duel page" id="candidatos">
      <div className="duel-copy motion-reveal">
        <h2>Dois candidatos no 2º turno. Aqui, as ideias vêm primeiro.</h2>
        <p>
          As propostas saem dos planos de governo que os dois registraram no TSE. No teste, você lê cada uma sem saber de quem é; os nomes só aparecem no
          resultado.
        </p>
      </div>
      <div className="duel-cards motion-reveal">
        <CandidateCard id="A" />
        <span className="duel-vs" aria-hidden="true">
          ×
        </span>
        <CandidateCard id="B" />
      </div>
      <p className="duel-note motion-reveal">Mesmo espaço, mesmo número de propostas exclusivas para cada um: 11 de cada lado e 3 que os dois apoiam.</p>
    </section>
  )
}
