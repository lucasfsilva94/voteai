import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'

const ToastContext = createContext<(text: string) => void>(() => {})

// One status message at a time, announced politely and hidden after 5.5 s.
export function ToastProvider({ children }: { children: ReactNode }) {
  const [text, setText] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const show = useCallback((message: string) => {
    setText(message)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setText(null), 5500)
  }, [])
  useEffect(() => () => window.clearTimeout(timer.current), [])
  return (
    <ToastContext.Provider value={show}>
      {children}
      <div id="toast" className="toast" role="status" hidden={!text}>
        {text}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
