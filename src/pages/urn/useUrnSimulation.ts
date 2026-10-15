import { useEffect, useRef, useState } from 'react'
import { CANDIDATES } from '../../lib/engine.ts'
import { confirmationSound } from '../../lib/media.ts'
import type { Result } from '../../lib/types.ts'
import { prefersReducedMotion } from '../../hooks/usePage.ts'

export type UrnStep = 'waiting' | 'typing' | 'candidate' | 'done' | 'counting'

export type UrnState = {
  step: UrnStep
  digits: [string, string]
  /** Slot with the blinking cursor (0 or 1), or null. */
  caret: number | null
  hint: string
  pressedKey: string | null
  confirmReady: boolean
}

const INITIAL: UrnState = { step: 'waiting', digits: ['', ''], caret: 0, hint: 'A urna vai digitar o número.', pressedKey: null, confirmReady: true }

/**
 * The urn types the winner's two digits one at a time (0.9 s and 1.8 s), shows the candidate (2.5 s), presses
 * CONFIRMA with the real sound (3.7 s) and finishes (5.3 s). A tie or no data shows the counting screen for 2.4 s;
 * reduced motion finishes at once. `onConfirmed` fires when CONFIRMA is pressed, `onFinish` at the end.
 */
export function useUrnSimulation(result: Result, onConfirmed: () => void, onFinish: () => void) {
  const [state, setState] = useState<UrnState>(INITIAL)
  const callbacks = useRef({ onConfirmed, onFinish })
  callbacks.current = { onConfirmed, onFinish }

  useEffect(() => {
    const timers: number[] = []
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms))
    const press = (key: string) => {
      confirmationSound.beep()
      setState((s) => ({ ...s, pressedKey: key }))
      at(170, () => setState((s) => (s.pressedKey === key ? { ...s, pressedKey: null } : s)))
    }
    const reduced = prefersReducedMotion()
    if (result.status !== 'winner' || !result.winner || reduced) {
      if (result.status !== 'winner') setState((s) => ({ ...s, step: 'counting' }))
      at(reduced ? 0 : 2400, () => callbacks.current.onFinish())
      return () => timers.forEach(clearTimeout)
    }
    const digits = [...CANDIDATES[result.winner].number]
    at(900, () => {
      press(digits[0])
      setState((s) => ({ ...s, step: 'typing', digits: [digits[0], ''], caret: 1, hint: 'Digitando o número…' }))
    })
    at(1800, () => {
      press(digits[1])
      setState((s) => ({ ...s, digits: [digits[0], digits[1]], caret: null, hint: 'Número completo.' }))
    })
    at(2500, () => setState((s) => ({ ...s, step: 'candidate', hint: 'Confira e confirme.' })))
    at(3700, () => {
      press('confirm')
      setState((s) => ({ ...s, step: 'done', confirmReady: false }))
      callbacks.current.onConfirmed()
    })
    at(5300, () => callbacks.current.onFinish())
    return () => timers.forEach(clearTimeout)
  }, [result])

  return state
}
