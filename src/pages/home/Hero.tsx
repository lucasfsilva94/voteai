import type { Ref } from 'react'
import { Countdown } from '../../components/Countdown.tsx'
import { Icon } from '../../components/Icon.tsx'
import { DemoPad } from './DemoPad.tsx'

type Props = {
  ctaLabel: string
  saved: boolean
  onCta: () => void
  onRestart: () => void
  headingRef: Ref<HTMLHeadingElement>
  ctaRef: Ref<HTMLButtonElement>
}

export function Hero({ ctaLabel, saved, onCta, onRestart, headingRef, ctaRef }: Props) {
  return (
    <div className="hero-shell">
      <section className="hero page">
        <div className="hero-copy">
          <h1 className="hero-title" ref={headingRef}>
            <span className="title-line">Vote nas ideias.</span>
            <em>
              <span className="title-line">Descubra</span>
              <span className="title-line title-underlined">
                os nomes.
                <svg className="title-underline" viewBox="0 0 400 22" aria-hidden="true" preserveAspectRatio="none">
                  <path d="M4 15 Q180 0 396 12" pathLength={1} />
                </svg>
              </span>
            </em>
          </h1>
          <p className="hero-description">
            Segundo turno para presidente: Lula ou Flávio Bolsonaro? Responda a 25 propostas sem saber de quem é cada uma e descubra com quem você mais
            concorda.
          </p>
          <button type="button" className="button button-primary hero-cta" onClick={onCta} ref={ctaRef}>
            {ctaLabel} <Icon name="arrow" />
          </button>
          <div className="hero-facts">
            <span>
              <Icon name="clock" size={16} /> Cerca de 3 minutos
            </span>
            <span>
              <Icon name="lock" size={16} /> Sem cadastro
            </span>
          </div>
          {saved && (
            <button type="button" className="text-button restart-link" onClick={onRestart}>
              Começar um novo teste
            </button>
          )}
          <Countdown className="countdown-hero" />
        </div>
        <DemoPad />
      </section>
    </div>
  )
}
