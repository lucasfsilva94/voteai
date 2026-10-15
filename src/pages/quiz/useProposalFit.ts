import { useEffect, type RefObject } from 'react'

// Phone: size the proposal so text and context fill about 80% of the note, between 22px and 46px.
// Desktop keeps the stylesheet size. Re-runs when the note changes size and once the fonts are loaded.
export function useProposalFit(copyRef: RefObject<HTMLElement | null>, key: string) {
  useEffect(() => {
    const copy = copyRef.current
    if (!copy) return
    const h2 = copy.querySelector('h2')
    const context = copy.querySelector<HTMLElement>('.proposal-context')
    if (!h2 || !context) return
    const fit = () => {
      if (!window.matchMedia('(max-width: 650px)').matches) {
        h2.style.fontSize = ''
        return
      }
      const room = copy.clientHeight * 0.8
      const gap = parseFloat(getComputedStyle(context).marginTop) || 0
      let lo = 22
      let hi = 46
      for (let i = 0; i < 8; i++) {
        const mid = (lo + hi) / 2
        h2.style.fontSize = `${mid}px`
        if (h2.offsetHeight + gap + context.offsetHeight <= room) lo = mid
        else hi = mid
      }
      h2.style.fontSize = `${Math.floor(lo)}px`
    }
    fit()
    let alive = true
    document.fonts?.ready.then(() => alive && fit())
    const observer = new ResizeObserver(fit)
    observer.observe(copy)
    return () => {
      alive = false
      observer.disconnect()
    }
  }, [copyRef, key])
}
