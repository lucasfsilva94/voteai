import type { CSSProperties, ReactNode } from 'react'
import { ANSWERS } from '../../lib/engine.ts'
import type { Answer } from '../../lib/types.ts'
import './Note.css'

/**
 * A pad of sticky notes: up to three notes peek out behind the top one, and the pad edge (one hairline per
 * remaining note, via `--pad`) thins as answers are given.
 */
export function NoteStack({ left, tilt, className = '', children }: { left: number; tilt: number; className?: string; children: ReactNode }) {
  const style = { '--pad': Math.max(left - 1, 0), '--tilt': `${tilt}deg` } as CSSProperties
  return (
    <div className={`note-stack ${className}`.trim()} style={style}>
      {[3, 2, 1]
        .filter((n) => left > n)
        .map((n) => (
          <span key={n} className={`note-back note-back-${n}`} aria-hidden="true"></span>
        ))}
      {children}
    </div>
  )
}

/** The answer stamped on the note, in the colour of its button. While dragging it fades in (`preview`). */
export function Stamp({ answer, preview = false, opacity }: { answer: Answer; preview?: boolean; opacity?: number }) {
  return (
    <span className={`note-stamp note-stamp-${answer}${preview ? ' is-preview' : ''}`} style={preview ? { opacity } : undefined} aria-hidden="true">
      {ANSWERS[answer].label}
      {answer === 'important' ? ' ×2' : ''}
    </span>
  )
}

export type StampState = { answer: Answer; preview: boolean; opacity?: number } | null
