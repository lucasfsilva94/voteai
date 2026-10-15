import type { IconName } from '../lib/catalog.ts'

const PATHS: Record<IconName, string> = {
  check: 'm5 12 4 4L19 6',
  cross: 'm6 6 12 12M18 6 6 18',
  arrow: 'M4 12h15m-6-6 6 6-6 6',
  back: 'M20 12H5m6-6-6 6 6 6',
  star: 'm12 3 2.8 5.8 6.4.9-4.6 4.5 1.1 6.4-5.7-3-5.7 3 1.1-6.4-4.6-4.5 6.4-.9Z',
  question: 'M9.2 8a3 3 0 0 1 5.6 1.5c0 2-2.8 2-2.8 4M12 17h.01',
  lock: 'M7 11V7a5 5 0 0 1 10 0v4M6 11h12v10H6Zm6 4v2',
  leaf: 'M20 4C9 3 3 8 6 16c6 5 15 0 14-12ZM4 21l11-11',
  economia: 'M4 20h16M6 16V9m6 7V4m6 12v-5',
  seguranca: 'm12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z',
  saude: 'M9 3h6v6h6v6h-6v6H9v-6H3V9h6Z',
  social: 'm3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7',
  costumes: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8M17 5a4 4 0 0 1 0 6m2 4a4 4 0 0 1 3 4v2',
  instituicoes: 'm3 8 9-5 9 5H3ZM5 11v7m7-7v7m7-7v7M3 21h18',
  clock: 'M12 7v5l3 2M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20',
  mute: 'm3 9 5 0 5-5v16l-5-5H3ZM17 9l5 6m0-6-5 6',
  volume: 'm3 9 5 0 5-5v16l-5-5H3ZM16 8c3 2 3 6 0 8m3-11c5 4 5 10 0 14',
  share: 'M12 16V3m-5 5 5-5 5 5M5 13v8h14v-8',
  external: 'M14 3h7v7m0-7L10 14M10 3H3v18h18v-7',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
  ballot: 'M4 9v12h16V9M3 9h18M9 10l-3-5 10-4 3 6-10 4',
  play: 'm8 4 12 8-12 8Z',
  pause: 'M8 4v16M16 4v16',
  reset: 'M4 9a8 8 0 1 1 0 7M4 3v6h6',
}

// Line icons drawn inline, one stroke weight; always decorative (the control carries the text or label).
export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.65} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name]} />
    </svg>
  )
}
