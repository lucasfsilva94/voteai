import { useEffect, useRef, type RefObject } from 'react'

type Side = 'agree' | 'disagree'
type Handlers = {
  /** Called while dragging; `side` is set past 40px. */
  onLean: (side: Side | null, dx: number) => void
  /** Released past 80px. */
  onCommit: (side: Side) => void
}

// Touch: the note follows the finger sideways; past 80px it is answered, otherwise it settles back on the pad.
// Vertical moves are left to scrolling (the proposal text has touch-action: pan-y).
export function useSwipe(cardRef: RefObject<HTMLElement | null>, enabled: boolean, key: string, handlers: Handlers) {
  const latest = useRef(handlers)
  latest.current = handlers
  const enabledRef = useRef(enabled)
  enabledRef.current = enabled

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    let touch: { x: number; y: number; id: number } | null = null
    let dragging = false
    const settle = () => {
      card.classList.remove('is-dragging')
      latest.current.onLean(null, 0)
      card.style.transition = 'transform .28s cubic-bezier(.16,1,.3,1)'
      card.style.transform = ''
      window.setTimeout(() => {
        card.style.transition = ''
      }, 300)
    }
    const down = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' || !enabledRef.current) return
      touch = { x: e.clientX, y: e.clientY, id: e.pointerId }
      dragging = false
    }
    const move = (e: PointerEvent) => {
      if (!touch || e.pointerId !== touch.id) return
      const dx = e.clientX - touch.x
      const dy = e.clientY - touch.y
      if (!dragging) {
        if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.3) return
        dragging = true
        card.setPointerCapture?.(e.pointerId)
        card.classList.add('is-dragging')
      }
      card.style.transform = `translateX(${dx}px) rotate(${dx / 22}deg)`
      latest.current.onLean(dx > 40 ? 'agree' : dx < -40 ? 'disagree' : null, dx)
    }
    const up = (e: PointerEvent) => {
      if (!touch) return
      const dx = e.clientX - touch.x
      touch = null
      if (dragging && Math.abs(dx) > 80) {
        card.classList.remove('is-dragging')
        latest.current.onCommit(dx > 0 ? 'agree' : 'disagree')
      } else if (dragging) settle()
      dragging = false
    }
    const cancel = () => {
      touch = null
      if (dragging) settle()
      dragging = false
    }
    card.addEventListener('pointerdown', down)
    card.addEventListener('pointermove', move)
    card.addEventListener('pointerup', up)
    card.addEventListener('pointercancel', cancel)
    return () => {
      card.removeEventListener('pointerdown', down)
      card.removeEventListener('pointermove', move)
      card.removeEventListener('pointerup', up)
      card.removeEventListener('pointercancel', cancel)
    }
  }, [cardRef, key])
}
