import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { TOTAL } from '../../lib/engine.ts'
import { scrollToSection, usePage } from '../../hooks/usePage.ts'
import { useSession } from '../../state/session.tsx'
import { Faq, FinalCta, StickyCta, Trust } from './Closing.tsx'
import { Duel } from './Duel.tsx'
import { Explainer } from './Explainer.tsx'
import { Hero } from './Hero.tsx'
import { HowItWorks } from './HowItWorks.tsx'
import { Strip } from './Strip.tsx'
import { useReveal, useStickyCta } from './useLandingMotion.ts'
import './Home.scss'

export default function Home() {
  const { session, start, resumePath } = useSession()
  const navigate = useNavigate()
  const location = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const heroCta = useRef<HTMLButtonElement>(null)
  const closing = useRef<HTMLDivElement>(null)
  usePage('home', '2º turno 2026: compare as ideias de Lula e Flávio Bolsonaro', location.hash ? undefined : heading)
  useReveal(mainRef)
  const sticky = useStickyCta(heroCta, closing)

  // Section links (#como-funciona, #perguntas…) scroll here, on the first click from this or another page.
  useEffect(() => {
    const id = location.hash.slice(1)
    if (!id) return
    const frame = requestAnimationFrame(() => scrollToSection(id))
    return () => cancelAnimationFrame(frame)
  }, [location.hash, location.key])

  const saved = !!session && session.index > 0
  const begin = () => {
    start()
    navigate('/teste')
  }
  const cta = () => (saved && session ? navigate(resumePath(session)) : begin())
  const heroLabel = saved ? (session.index === TOTAL ? 'Ver meu resultado' : 'Continuar meu teste') : 'Descobrir minha afinidade'
  const label = saved ? 'Continuar meu teste' : 'Começar meu teste'

  return (
    <main id="main" ref={mainRef}>
      <Hero ctaLabel={heroLabel} saved={saved} onCta={cta} onRestart={begin} headingRef={heading} ctaRef={heroCta} />
      <Duel />
      <Explainer />
      <HowItWorks />
      <Strip />
      <Trust />
      <Faq />
      <FinalCta label={label} onCta={cta} closingRef={closing} />
      <StickyCta label={label} onCta={cta} visible={sticky} />
    </main>
  )
}
