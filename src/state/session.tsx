import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { PROPOSALS } from '../data/catalog.ts'
import { createOrder, loadSession, saveSession, SESSION_KEY } from '../lib/engine.ts'
import { confirmationSound } from '../lib/media.ts'
import type { Session } from '../lib/types.ts'
import { useToast } from './toast.tsx'

type SessionApi = {
  session: Session | null
  /** Replaces the session and saves it on this device. */
  update: (next: Session) => void
  /** Starts a new test; `firstId` puts a proposal first (the landing demo). */
  start: (firstId?: string | null) => Session
  clear: () => void
  sound: boolean
  toggleSound: () => void
  soundBlocked: boolean
  /** Plays the urn's confirmation; if the browser blocks it, offers a manual replay. */
  playConfirmation: () => Promise<void>
  /** Path of the step a saved session should resume at. */
  resumePath: (s: Session) => string
}

const SessionContext = createContext<SessionApi | null>(null)

const storage = (() => {
  try {
    return window.localStorage
  } catch {
    return null
  }
})()

export function SessionProvider({ children }: { children: ReactNode }) {
  const toast = useToast()
  const [session, setSession] = useState<Session | null>(() => loadSession(storage, PROPOSALS))
  const [sound, setSound] = useState(true)
  const [soundBlocked, setSoundBlocked] = useState(false)

  const update = useCallback(
    (next: Session) => {
      setSession(next)
      if (!saveSession(storage, next)) toast('O armazenamento está bloqueado. Seu teste continua nesta aba.')
    },
    [toast],
  )

  const start = useCallback(
    (firstId: string | null = null) => {
      confirmationSound.stop()
      confirmationSound.unlock()
      const next: Session = { version: 1, order: createOrder(PROPOSALS, Math.random, firstId), answers: {}, index: 0, revealed: false }
      update(next)
      return next
    },
    [update],
  )

  const clear = useCallback(() => {
    try {
      storage?.removeItem(SESSION_KEY)
    } catch {
      /* nothing stored */
    }
    setSession(null)
    toast('Respostas apagadas deste aparelho.')
  }, [toast])

  const toggleSound = useCallback(() => {
    setSound((on) => {
      const next = !on
      confirmationSound.setEnabled(next)
      if (next) confirmationSound.unlock()
      return next
    })
  }, [])

  const playConfirmation = useCallback(async () => {
    const played = await confirmationSound.play()
    setSoundBlocked(!played)
    if (!played) toast('O navegador bloqueou o som. Toque em Ouvir confirmação para reproduzir.')
  }, [toast])

  const resumePath = useCallback((s: Session) => (s.index === 25 ? (s.revealed ? '/resultado' : '/urna') : '/teste'), [])

  const api = useMemo(
    () => ({ session, update, start, clear, sound, toggleSound, soundBlocked, playConfirmation, resumePath }),
    [session, update, start, clear, sound, toggleSound, soundBlocked, playConfirmation, resumePath],
  )
  return <SessionContext.Provider value={api}>{children}</SessionContext.Provider>
}

export function useSession(): SessionApi {
  const api = useContext(SessionContext)
  if (!api) throw new Error('useSession precisa do SessionProvider')
  return api
}
