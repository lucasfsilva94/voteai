import type { IconName } from '../lib/catalog.ts'
import type { Answer } from '../lib/types.ts'
import { Icon } from './Icon.tsx'
import './AnswerButtons.css'

const BUTTONS: { answer: Answer; label: string; aria: string; icon: IconName; key: string; extra?: string }[] = [
  { answer: 'disagree', label: 'Discordo', aria: 'Discordo', icon: 'cross', key: '←' },
  { answer: 'agree', label: 'Concordo', aria: 'Concordo', icon: 'check', key: '→' },
  { answer: 'important', label: 'Importante', aria: 'Importante, concordo com peso dobrado', icon: 'star', key: '↑', extra: '×2' },
  { answer: 'skip', label: 'Não sei', aria: 'Não sei', icon: 'question', key: '↓' },
]

type Props = {
  onAnswer: (answer: Answer) => void
  /** Smaller buttons without keyboard hints (landing demo). */
  demo?: boolean
  disabled?: boolean
  /** Button highlighted while the note is dragged towards it. */
  leaning?: Answer | null
}

export function AnswerButtons({ onAnswer, demo = false, disabled = false, leaning = null }: Props) {
  return (
    <div className={`choices${demo ? ' choices-demo' : ''}`} role="group" aria-label="Responder à proposta">
      {BUTTONS.map((b) => (
        <button
          key={b.answer}
          type="button"
          className={`choice choice-${b.answer}${leaning === b.answer ? ' is-leaning' : ''}`}
          aria-label={b.aria}
          disabled={disabled}
          onClick={() => onAnswer(b.answer)}
        >
          <Icon name={b.icon} />
          <span>{b.label}</span>
          {b.extra && <small>{b.extra}</small>}
          {!demo && <kbd aria-hidden="true">{b.key}</kbd>}
        </button>
      ))}
    </div>
  )
}
