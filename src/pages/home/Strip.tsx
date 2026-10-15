import { Icon } from '../../components/Icon.tsx'
import { STRIP_NOTES } from '../../data/content.ts'
import { getProposal, THEME_ICONS } from '../../lib/catalog.ts'
import { AREAS } from '../../lib/engine.ts'
import type { AreaId } from '../../lib/types.ts'

function StripNotes() {
  return STRIP_NOTES.map((id) => {
    const p = getProposal(id)
    return (
      <li key={id} className="strip-note">
        <span className="topic">
          <Icon name={THEME_ICONS[p.area]} size={15} /> {AREAS[p.area]}
        </span>
        <p>{p.texto}</p>
      </li>
    )
  })
}

// Real proposals drifting past, without authorship. The second track repeats the first so the loop is seamless.
export function Strip() {
  return (
    <section className="strip-section" aria-labelledby="strip-title">
      <div className="page strip-head motion-reveal">
        <h2 id="strip-title">Ideias de verdade, sobre a vida de todo mundo.</h2>
        <ul className="topics-list">
          {(Object.entries(AREAS) as [AreaId, string][]).map(([id, label]) => (
            <li key={id}>
              <Icon name={THEME_ICONS[id]} size={16} />
              {label}
            </li>
          ))}
        </ul>
      </div>
      <div className="strip-track-wrap">
        <ul className="strip-track">
          <StripNotes />
        </ul>
        <ul className="strip-track" aria-hidden="true">
          <StripNotes />
        </ul>
      </div>
    </section>
  )
}
