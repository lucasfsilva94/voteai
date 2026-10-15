import { Icon } from './Icon.tsx'
import './FlowSteps.scss'

// The three steps of the test: opinions, urn, affinity.
export function FlowSteps({ active }: { active: 1 | 2 | 3 }) {
  const state = (step: number) => (active === step ? 'active' : active > step ? 'done' : undefined)
  return (
    <div className="flow-steps" aria-label="Etapas do teste">
      <span className={state(1)}>{active > 1 ? <Icon name="check" size={14} /> : <b>1</b>} Suas opiniões</span>
      <i></i>
      <span className={state(2)}>
        <b>2</b> A urna
      </span>
      <i></i>
      <span className={state(3)}>
        <b>3</b> Sua afinidade
      </span>
    </div>
  )
}
