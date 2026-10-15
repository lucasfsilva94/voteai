import { useEffect, useRef, type RefObject } from 'react'
import { useNavigationType } from 'react-router'

export type View = 'home' | 'quiz' | 'urn' | 'result' | 'sources'

/**
 * Per-page setup: document title, the `data-view` attribute the stylesheets key on (phone layouts of the
 * quiz and the urn), and focus on the page heading after in-app navigation, so screen readers announce it.
 */
export function usePage(view: View, title: string, heading?: RefObject<HTMLElement | null>) {
  const navigationType = useNavigationType()
  const arrivedByLink = useRef(navigationType !== 'POP')
  useEffect(() => {
    document.title = `voteAI — ${title}`
    document.body.dataset.view = view
  }, [view, title])
  useEffect(() => {
    const el = heading?.current
    if (!arrivedByLink.current || !el) return
    el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }, [heading])
}

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Scrolls to a landing section and moves focus there (keyboard and screen-reader users land on it too). */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}
