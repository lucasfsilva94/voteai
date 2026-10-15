import { useCallback, useMemo, useRef } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { FlowSteps } from '../../components/FlowSteps.tsx'
import { Icon } from '../../components/Icon.tsx'
import { VotingMachine } from '../../components/machine/VotingMachine.tsx'
import { PORTRAITS } from '../../data/portraits.ts'
import { getProposal } from '../../lib/catalog.ts'
import { calculate, CANDIDATES, TOTAL } from '../../lib/engine.ts'
import type { Session } from '../../lib/types.ts'
import { usePage } from '../../hooks/usePage.ts'
import { useSession } from '../../state/session.tsx'
import { useToast } from '../../state/toast.tsx'
import { useUrnSimulation, type UrnState } from './useUrnSimulation.ts'
import './Urn.scss'

// Laid out like the real urn: office on top, number on the left, name and party under it, portrait on the right.
function SimulationScreen({ state, winner }: { state: UrnState; winner: 'A' | 'B' | null }) {
  if (state.step === 'counting')
    return (
      <>
        <span className="lcd-label">APURANDO SUAS RESPOSTAS</span>
        <div className="screen-counting">
          <strong>Um instante.</strong>
          <p>Comparando propostas e prioridades…</p>
          <div className="lcd-loader">
            <span></span>
          </div>
        </div>
        <span className="lcd-label">25 PROPOSTAS · CÁLCULO LOCAL</span>
      </>
    )
  if (state.step === 'done')
    return (
      <>
        <span className="lcd-label">VOTO SIMULADO CONFIRMADO</span>
        <div className="sim-fim">
          <strong>FIM</strong>
        </div>
        <div className="lcd-end">
          <span className="sim-hint">Calculando sua afinidade…</span>
        </div>
      </>
    )
  const candidate = state.step === 'candidate' && winner ? CANDIDATES[winner] : null
  return (
    <>
      <span className="lcd-label">SEU VOTO PARA</span>
      <div className="sim">
        <div className="sim-main">
          <strong className="sim-role">Presidente</strong>
          <div className="sim-number-row">
            <span className="sim-field">Número:</span>
            <div className="lcd-number sim-number" aria-hidden="true">
              {state.digits.map((d, i) => (
                <b key={i} className={[d ? 'is-filled' : '', state.caret === i ? 'is-next' : ''].join(' ').trim() || undefined}>
                  {d}
                </b>
              ))}
            </div>
          </div>
          {candidate && (
            <div className="sim-candidate">
              <span>
                <span className="sim-field">Nome:</span> <strong>{candidate.name}</strong>
              </span>
              <span>
                <span className="sim-field">Partido:</span> {candidate.party}
              </span>
            </div>
          )}
        </div>
        <div className="sim-photo" aria-hidden="true">
          {candidate && winner && <img src={PORTRAITS[winner]} alt={`Retrato de ${candidate.name}`} />}
        </div>
      </div>
      <div className="lcd-end">
        <span className="sim-hint">{state.hint}</span>
      </div>
    </>
  )
}

function UrnSimulation({ session }: { session: Session }) {
  const { update, sound, toggleSound, playConfirmation } = useSession()
  const toast = useToast()
  const navigate = useNavigate()
  const heading = useRef<HTMLHeadingElement>(null)
  const confirmed = useRef(false)
  const finished = useRef(false)
  usePage('urn', 'Revele sua afinidade', heading)
  const result = useMemo(() => calculate(session.order.map(getProposal), session.answers), [session.order, session.answers])

  const finish = useCallback(
    (withSound = true) => {
      if (finished.current) return
      finished.current = true
      update({ ...session, revealed: true })
      navigate('/resultado', { replace: true })
      if (withSound && !confirmed.current) void playConfirmation()
    },
    [session, update, navigate, playConfirmation],
  )
  const state = useUrnSimulation(
    result,
    () => {
      confirmed.current = true
      void playConfirmation()
    },
    // Plays the confirmation unless the simulation already pressed CONFIRMA (tie, no data, reduced motion).
    () => finish(),
  )

  const correct = () => {
    update({ ...session, index: TOTAL - 1, revealed: false })
    navigate('/teste', { replace: true })
  }

  return (
    <main id="main" className="urn-page page">
      <FlowSteps active={2} />
      <div className="urn-heading">
        <h1 ref={heading}>
          As ideias já têm seu voto.
          <br /> <em>Agora, os nomes.</em>
        </h1>
        <p>Suas 25 respostas estão prontas. Deixe a urna fazer as contas.</p>
      </div>
      <VotingMachine
        screen={<SimulationScreen state={state} winner={result.winner} />}
        counting
        pressedKey={state.pressedKey}
        confirmReady={state.confirmReady}
        numberKeyLabel="apurando suas respostas"
        onNumber={() => toast('Aqui, você vota em ideias. A urna compara as respostas automaticamente.')}
        onBlank={() => toast('O voteAI compara ideias. Para registrar um voto em branco, use a urna oficial no dia da eleição.')}
        onCorrect={correct}
        onConfirm={() => {}}
      />
      <div className="urn-actions">
        <button type="button" className="text-button" onClick={() => finish()}>
          Pular animação <Icon name="arrow" size={17} />
        </button>
        <button type="button" className="text-button" onClick={toggleSound} aria-pressed={sound}>
          <Icon name={sound ? 'volume' : 'mute'} size={17} /> Som {sound ? 'ativado' : 'desativado'}
        </button>
      </div>
      <p className="urn-disclaimer">Esta urna é uma simulação. Seu resultado não registra um voto.</p>
    </main>
  )
}

export default function Urn() {
  const { session } = useSession()
  if (!session || session.index < TOTAL) return <Navigate to={session ? '/teste' : '/'} replace />
  if (session.revealed) return <Navigate to="/resultado" replace />
  return <UrnSimulation session={session} />
}
