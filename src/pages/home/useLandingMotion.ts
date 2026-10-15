import { useEffect, useState, type RefObject } from 'react'
import { prefersReducedMotion } from '../../hooks/usePage.ts'

/** Sections rise into place the first time they come into view (`.motion-reveal`). Off with reduced motion. */
export function useReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
      },
      { threshold: 0.15 },
    )
    root.querySelectorAll('.motion-reveal').forEach((el) => {
      el.classList.add('will-reveal')
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [rootRef])
}

/** The sticky call to action shows once the hero's button has scrolled away, and hides again at the closing one. */
export function useStickyCta(heroCta: RefObject<HTMLElement | null>, closing: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const hero = heroCta.current
    const end = closing.current
    if (!hero || !end) return
    let heroOut = false
    let closingIn = false
    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) heroOut = !e.isIntersecting && e.boundingClientRect.top < 0
        else closingIn = e.isIntersecting
      }
      setVisible(heroOut && !closingIn)
    })
    observer.observe(hero)
    observer.observe(end)
    return () => observer.disconnect()
  }, [heroCta, closing])
  return visible
}

/**
 * The explainer plays muted while at least 45% of it is on screen and the tab is visible, and pauses otherwise.
 * With reduced motion it waits for the play button. A pause by the visitor sticks until they press play again.
 */
export function useExplainerVideo(videoRef: RefObject<HTMLVideoElement | null>) {
  const [paused, setPaused] = useState(true)
  const [toggle, setToggle] = useState<() => void>(() => () => {})

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    let manualPause = false
    let manualPlay = false
    const update = () => setPaused(video.paused)
    const sync = () => {
      if (visible && !document.hidden && !manualPause && (!reduced.matches || manualPlay)) video.play().catch(update)
      else video.pause()
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.intersectionRatio >= 0.45
        sync()
      },
      { threshold: [0, 0.45] },
    )
    observer.observe(video)
    const preference = () => {
      manualPlay = false
      sync()
    }
    video.addEventListener('play', update)
    video.addEventListener('pause', update)
    reduced.addEventListener('change', preference)
    document.addEventListener('visibilitychange', sync)
    setToggle(() => () => {
      if (video.paused) {
        manualPause = false
        manualPlay = true
        video.play().catch(update)
      } else {
        manualPause = true
        video.pause()
      }
    })
    update()
    return () => {
      observer.disconnect()
      video.pause()
      video.removeEventListener('play', update)
      video.removeEventListener('pause', update)
      reduced.removeEventListener('change', preference)
      document.removeEventListener('visibilitychange', sync)
    }
  }, [videoRef])

  return { paused, toggle }
}
