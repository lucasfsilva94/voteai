import { useEffect, useRef, useState } from 'react'
import { RUNOFF } from '../data/content.ts'
import { prefersReducedMotion } from '../hooks/usePage.ts'

/** Whole calendar days until the runoff, on the visitor's clock (negative once it has passed). */
export function runoffDays(now = new Date()) {
  return Math.round((Date.UTC(RUNOFF.year, RUNOFF.month, RUNOFF.day) - Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())) / 864e5)
}

// Countdown to the runoff with digits in the urn display's type. The digits roll up from 00 the first time
// they come into view (not with reduced motion).
export function Countdown({ className }: { className: string }) {
  const days = runoffDays()
  const target = String(Math.min(Math.max(days, 0), 99)).padStart(2, '0')
  const [shown, setShown] = useState(target)
  const digitsRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = digitsRef.current
    if (!el || days <= 0 || prefersReducedMotion()) return
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const t0 = performance.now()
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / 900)
          setShown(String(Math.round(Number(target) * (1 - Math.pow(1 - k, 3)))).padStart(2, '0'))
          if (k < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [days, target])

  if (days < 0) return <p className={`countdown countdown-past ${className}`}>O 2º turno foi em {RUNOFF.label}. As propostas continuam aqui para consulta.</p>
  if (days === 0)
    return (
      <p className={`countdown ${className}`}>
        <span className="countdown-digits" aria-hidden="true">
          <b>H</b>
          <b>J</b>
        </span>
        <span>
          <strong>Hoje é dia de 2º turno.</strong> Conheça as ideias antes de votar.
        </span>
      </p>
    )
  return (
    <p className={`countdown ${className}`}>
      <span className="countdown-digits" aria-hidden="true" ref={digitsRef}>
        <b>{shown[0]}</b>
        <b>{shown[1]}</b>
      </span>
      <span>
        <strong>{days === 1 ? 'Falta 1 dia' : `Faltam ${days} dias`}</strong> para o 2º turno, em {RUNOFF.label}.
      </span>
    </p>
  )
}
