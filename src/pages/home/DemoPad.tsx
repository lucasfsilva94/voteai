import { useEffect, useRef, useState, type RefObject } from 'react'
import { useNavigate } from 'react-router'
import { AnswerButtons } from '../../components/AnswerButtons.tsx'
import { Icon } from '../../components/Icon.tsx'
import { NoteStack, Stamp } from '../../components/note/Note.tsx'
import { DEMO_NOTES } from '../../data/content.ts'
import { getProposal, THEME_ICONS } from '../../lib/catalog.ts'
import { AREAS } from '../../lib/engine.ts'
import type { Answer } from '../../lib/types.ts'
import { prefersReducedMotion } from '../../hooks/usePage.ts'
import { useSession } from '../../state/session.tsx'

const LOOP_MS = 4600

/**
 * The demo note answers itself every few seconds: stamp, peel, next note. Hovering, focusing or touching the
 * stage pauses the loop, and so does leaving the viewport or the tab. Off with reduced motion.
 */
function useDemoLoop(stageRef: RefObject<HTMLDivElement | null>, cardRef: RefObject<HTMLElement | null>) {
  const [index, setIndex] = useState(0)
  const [stamped, setStamped] = useState(false)

  useEffect(() => {
    const stage = stageRef.current
    const card = cardRef.current
    if (!stage || !card?.animate || prefersReducedMotion()) return
    let paused = false
    let visible = true
    let current = 0
    const pause = () => (paused = true)
    const resume = () => (paused = false)
    stage.addEventListener('pointerenter', pause)
    stage.addEventListener('pointerleave', resume)
    stage.addEventListener('focusin', pause)
    stage.addEventListener('focusout', resume)
    stage.addEventListener('touchstart', pause, { passive: true })
    const seen = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    seen.observe(stage)

    const step = () => {
      if (paused || !visible || document.hidden) return
      setStamped(true)
      const x = { agree: 1, disagree: -1, important: 0, skip: 0 }[DEMO_NOTES[current].answer]
      const to = x ? `translate(${x * 80}%,-6%) rotate(${x * 14}deg)` : 'translate(0,-40%) rotate(-5deg)'
      const leave = card.animate(
        [
          { transform: 'rotate(-.6deg)', opacity: 1 },
          { transform: 'perspective(900px) translateY(-6px) rotateX(10deg) rotate(-.6deg)', opacity: 1, offset: 0.5 },
          { transform: to, opacity: 0 },
        ],
        { duration: 1000, easing: 'cubic-bezier(.2,0,.3,1)' },
      )
      leave.onfinish = () => {
        if (!card.isConnected) return
        current = (current + 1) % DEMO_NOTES.length
        setIndex(current)
        setStamped(false)
        card.animate(
          [
            { transform: 'translate(9px,7px) rotate(1.8deg)', backgroundColor: '#f1f3ea' },
            { transform: 'rotate(-.6deg)', backgroundColor: '#fffef9' },
          ],
          { duration: 480, easing: 'cubic-bezier(.16,1,.3,1)' },
        )
      }
    }
    const loop = window.setInterval(step, LOOP_MS)
    return () => {
      window.clearInterval(loop)
      seen.disconnect()
      stage.removeEventListener('pointerenter', pause)
      stage.removeEventListener('pointerleave', resume)
      stage.removeEventListener('focusin', pause)
      stage.removeEventListener('focusout', resume)
      stage.removeEventListener('touchstart', pause)
    }
  }, [stageRef, cardRef])

  return { index, stamped }
}

// A note from the real catalogue to try on the landing. Answering it starts the test with this proposal first.
export function DemoPad() {
  const { start } = useSession()
  const navigate = useNavigate()
  const stageRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLElement>(null)
  const { index, stamped } = useDemoLoop(stageRef, cardRef)
  const demo = DEMO_NOTES[index]
  const proposal = getProposal(demo.id)

  const answer = (value: Answer) => {
    start(demo.id)
    navigate('/teste', { state: { autoAnswer: value } })
  }

  return (
    <div className="proposal-stage" ref={stageRef} aria-label="Demonstração: responda à proposta para começar o teste">
      <NoteStack left={7} tilt={-0.6} className="demo-stack">
        <article className="paper preview-paper note" ref={cardRef}>
          <div className="paper-top">
            <span className="topic">
              <Icon name={THEME_ICONS[proposal.area]} size={17} /> {AREAS[proposal.area]}
            </span>
            <span className="anonymous">
              <Icon name="lock" size={14} /> Autoria oculta
            </span>
          </div>
          <p className="preview-proposal">{proposal.texto}</p>
          <p className="proposal-context">{proposal.contexto}</p>
          {stamped && <Stamp answer={demo.answer} />}
        </article>
      </NoteStack>
      <AnswerButtons demo onAnswer={answer} />
      <p className="stage-caption">Pode experimentar: o nome só aparece no final.</p>
    </div>
  )
}
