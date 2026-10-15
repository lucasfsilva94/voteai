import type { ReactNode } from 'react'
import './VotingMachine.css'

type Props = {
  /** What the LCD shows (simulation steps, counting or the final result). */
  screen: ReactNode
  revealed?: boolean
  counting?: boolean
  /** Key currently pressed by the simulation: '0'–'9' or 'confirm'. */
  pressedKey?: string | null
  confirmReady?: boolean
  numberKeyLabel: string
  onNumber: () => void
  onBlank: () => void
  onCorrect: () => void
  onConfirm: () => void
}

const NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

// The Brazilian voting machine of the reveal: LCD on one side, keypad on the other.
export function VotingMachine({ screen, revealed, counting, pressedKey, confirmReady, numberKeyLabel, onNumber, onBlank, onCorrect, onConfirm }: Props) {
  const pressed = (key: string) => (pressedKey === key ? ' is-pressed' : '')
  return (
    <div className={`machine${revealed ? ' machine-revealed' : ''}${counting ? ' machine-counting' : ''}`} aria-label="Urna brasileira de simulação">
      <div className="machine-top">
        <span>voteAI</span>
        <span>SIMULAÇÃO DE AFINIDADE</span>
        <span className="machine-led"></span>
      </div>
      <div className="machine-body">
        <div className="screen-bezel">
          <div className="machine-screen" id="machine-screen" role="status" aria-live="polite">
            {screen}
          </div>
        </div>
        <div className="keypad">
          <div className="keypad-title">SEU VOTO É SEU</div>
          <div className="number-keys">
            {NUMBERS.map((n) => (
              <button key={n} type="button" className={pressed(n).trim() || undefined} data-key={n} aria-label={`Tecla ${n} da urna, ${numberKeyLabel}`} onClick={onNumber}>
                {n}
              </button>
            ))}
            <button type="button" className={`zero-key${pressed('0')}`} data-key="0" aria-label="Tecla zero da urna" onClick={onNumber}>
              0
            </button>
          </div>
          <div className="function-keys">
            <button type="button" className="key-white" onClick={onBlank}>
              BRANCO
            </button>
            <button type="button" className="key-orange" onClick={onCorrect}>
              CORRIGE
            </button>
            <button type="button" className={`key-green${confirmReady ? ' confirm-ready' : ''}${pressed('confirm')}`} onClick={onConfirm}>
              CONFIRMA
            </button>
          </div>
        </div>
      </div>
      <div className="machine-bottom">
        <span>PROPOSTAS PRIMEIRO. NOMES DEPOIS.</span>
        <div className="speaker" aria-hidden="true"></div>
      </div>
    </div>
  )
}
