import { useCallback, useEffect, useRef, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { AnswerButtons } from '../../components/AnswerButtons.tsx'
import { FlowSteps } from '../../components/FlowSteps.tsx'
import { Icon } from '../../components/Icon.tsx'
import { NoteStack, Stamp, type StampState } from '../../components/note/Note.tsx'
import { getProposal, THEME_ICONS } from '../../lib/catalog.ts'
import { AREAS, TOTAL } from '../../lib/engine.ts'
import { confirmationSound } from '../../lib/media.ts'
import type { Answer } from '../../lib/types.ts'
import { prefersReducedMotion, usePage } from '../../hooks/usePage.ts'
import { useSession } from '../../state/session.tsx'
import { useProposalFit } from './useProposalFit.ts'
import { useSwipe } from './useSwipe.ts'
import './Quiz.scss'

const TILTS = [-0.7, 0.5, -0.3, 0.8, -0.5, 0.35]
const KEYS: Record<string, Answer> = { ArrowLeft: 'disagree', ArrowRight: 'agree', ArrowUp: 'important', ArrowDown: 'skip' }

// Where the answered note flies: agree right, disagree left, important up, skip down.
function exitKeyframes(card: HTMLElement, answer: Answer): Keyframe[] {
  const [x, y] = { agree: [1, 0], disagree: [-1, 0], important: [0, -1], skip: [0, 1] }[answer]
  const from = getComputedStyle(card).transform
  // Taller notes peel at a smaller angle so the lifted edge never sweeps over the answer buttons.
  const peel = Math.max(6, Math.min(16, 4400 / card.offsetHeight))
  const lift = `perspective(900px) translateY(-8px) rotateX(${peel.toFixed(1)}deg) rotate(${(x || -y) * 3}deg)`
  const to = x ? `translate(${x * 125}%,-8%) rotate(${x * 18}deg)` : y < 0 ? 'translate(0,-60%) rotate(-5deg) scale(1.03)' : 'translate(0,26%) rotate(4deg) scale(.92)'
  return [
    { transform: from === 'none' ? 'none' : from, opacity: 1 },
    { transform: lift, opacity: 1, offset: 0.42, easing: 'cubic-bezier(.45,0,1,.6)' },
    { transform: to, opacity: 0 },
  ]
}

export default function Quiz() {
  const { session, update, sound, toggleSound } = useSession()
  const navigate = useNavigate()
  const location = useLocation()
  const cardRef = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const busy = useRef(false)
  const timer = useRef<number | undefined>(undefined)
  const [entry, setEntry] = useState<'rise' | 'return'>('rise')
  const [stamp, setStamp] = useState<StampState>(null)
  const [locked, setLocked] = useState(false)
  const [leaning, setLeaning] = useState<Answer | null>(null)
  usePage('quiz', 'Sua opinião conta')

  const index = session?.index ?? 0
  const proposal = session && index < TOTAL ? getProposal(session.order[index]) : null
  const key = proposal?.id ?? 'done'

  // Stamp the answer on the note, peel it from its free bottom edge (it is glued at the top), then send it
  // the way of the answer. Reduced motion keeps the stamp as feedback, without the travel.
  const answer = useCallback(
    (value: Answer) => {
      if (!session || busy.current || session.index >= TOTAL) return
      confirmationSound.unlock()
      busy.current = true
      setLocked(true)
      setLeaning(null)
      setStamp({ answer: value, preview: false })
      const reduced = prefersReducedMotion()
      const card = cardRef.current
      if (!reduced && card?.animate) {
        card.classList.add('is-leaving')
        card.animate(exitKeyframes(card, value), { duration: 520, easing: 'cubic-bezier(.2,0,.3,1)', fill: 'forwards' })
      }
      timer.current = window.setTimeout(
        () => {
          const next = { ...session, answers: { ...session.answers, [session.order[session.index]]: value }, index: session.index + 1, revealed: false }
          update(next)
          busy.current = false
          setLocked(false)
          setStamp(null)
          setEntry('rise')
          if (next.index === TOTAL) navigate('/urna', { replace: true })
        },
        reduced ? 380 : 500,
      )
    },
    [session, update, navigate],
  )

  const back = () => {
    if (!session || busy.current || session.index === 0) return
    setEntry('return')
    update({ ...session, index: session.index - 1, revealed: false })
  }

  useEffect(
    () => () => {
      window.clearTimeout(timer.current)
      busy.current = false
    },
    [],
  )

  // The landing demo starts the test with an answer already chosen.
  const autoAnswer = (location.state as { autoAnswer?: Answer } | null)?.autoAnswer
  useEffect(() => {
    if (!autoAnswer) return
    navigate('.', { replace: true, state: null })
    answer(autoAnswer)
  }, [autoAnswer]) // eslint-disable-line react-hooks/exhaustive-deps

  // Arrow keys answer, except while reading inside the proposal text or typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (e.altKey || e.metaKey || e.ctrlKey || target.matches('input,select,textarea') || target.closest('.proposal-copy')) return
      const value = KEYS[e.key]
      if (value) {
        e.preventDefault()
        answer(value)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [answer])

  // Focus follows the current note, so screen readers read each new proposal.
  useEffect(() => {
    cardRef.current?.focus({ preventScroll: true })
  }, [key])

  useProposalFit(copyRef, key)
  useSwipe(cardRef, !locked, key, {
    onLean: (side, dx) => {
      setLeaning(side)
      setStamp(side ? { answer: side, preview: true, opacity: Math.min(1, (Math.abs(dx) - 40) / 40) } : null)
    },
    onCommit: (side) => answer(side),
  })

  if (!session) return <Navigate to="/" replace />
  if (!proposal) return <Navigate to={session.revealed ? '/resultado' : '/urna'} replace />

  return (
    <main id="main" className="quiz-page page">
      <FlowSteps active={1} />
      <div className="quiz-heading">
        <h1>Uma ideia. O que você pensa?</h1>
        <p>O nome de quem propôs só aparece no final.</p>
      </div>
      <div className="quiz-wrap">
        <div className="progress-meta">
          <button type="button" className="text-button" onClick={back} disabled={index === 0}>
            <Icon name="back" size={16} /> Voltar
          </button>
          <button type="button" className="text-button quiz-sound" onClick={toggleSound} aria-pressed={sound} aria-label={`Som ${sound ? 'ativado' : 'desativado'}`}>
            <Icon name={sound ? 'volume' : 'mute'} size={15} />
          </button>
          <span>
            Proposta <strong>{index + 1}</strong> de {TOTAL}
          </span>
        </div>
        <div className="progress" role="progressbar" aria-label="Propostas respondidas" aria-valuemin={0} aria-valuemax={TOTAL} aria-valuenow={index}>
          <span style={{ transform: `scaleX(${index / TOTAL})` }}></span>
        </div>
        <NoteStack left={TOTAL - index} tilt={TILTS[index % TILTS.length]}>
          <article key={key} ref={cardRef} className={`paper quiz-paper note note-${entry}`} tabIndex={-1} id="proposal-card">
            <div className="paper-top">
              <span className="topic">
                <Icon name={THEME_ICONS[proposal.area]} size={18} /> {AREAS[proposal.area]}
              </span>
              <span className="anonymous">
                <Icon name="lock" size={14} /> Autoria oculta
              </span>
            </div>
            <div className="proposal-copy" ref={copyRef} tabIndex={0} role="region" aria-label="Texto e contexto da proposta">
              <h2>{proposal.texto}</h2>
              <p className="proposal-context">{proposal.contexto}</p>
            </div>
            <div className="paper-bottom">
              <span>O que vale é a sua opinião.</span>
              <Icon name="ballot" size={20} />
            </div>
            {stamp && <Stamp key={stamp.answer} {...stamp} />}
          </article>
        </NoteStack>
        <AnswerButtons onAnswer={answer} disabled={locked} leaning={leaning} />
        <p className="choice-help">
          <strong>Importante</strong> significa “concordo e isso pesa mais para mim”. Vale o dobro.
        </p>
        <p className="keyboard-help">Use as setas do teclado ou arraste para os lados para concordar ou discordar.</p>
      </div>
    </main>
  )
}
