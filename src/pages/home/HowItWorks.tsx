import { Icon } from '../../components/Icon.tsx'

export function HowItWorks() {
  return (
    <section className="how-section page" id="como-funciona">
      <h2 className="motion-reveal">Três passos, do jeito que você já conhece.</h2>
      <ol className="how-steps">
        <li className="motion-reveal">
          <div className="step-art art-note" aria-hidden="true">
            <div className="mini-note mini-note-back"></div>
            <div className="mini-note">
              <span className="topic">
                <Icon name="saude" size={13} /> Saúde e educação
              </span>
              <span className="anonymous">
                <Icon name="lock" size={11} /> Autoria oculta
              </span>
              <strong>Ter mais escolas públicas em tempo integral.</strong>
            </div>
          </div>
          <h3>Leia a proposta, sem o nome.</h3>
          <p>São 25 propostas reais, uma de cada vez, em linguagem simples e de sete temas diferentes.</p>
        </li>
        <li className="motion-reveal">
          <div className="step-art art-answers" aria-hidden="true">
            <span className="mini-choice mini-disagree">
              <Icon name="cross" size={14} /> Discordo
            </span>
            <span className="mini-choice mini-agree">
              <Icon name="check" size={14} /> Concordo
            </span>
            <span className="mini-choice mini-important">
              <Icon name="star" size={14} /> Importante
            </span>
            <span className="mini-choice mini-skip">? Não sei</span>
            <span className="mini-stamp">Importante ×2</span>
          </div>
          <h3>Responda do seu jeito.</h3>
          <p>Concorde, discorde ou pule. Se uma ideia pesa muito para você, marque Importante: ela vale o dobro.</p>
        </li>
        <li className="motion-reveal">
          <div className="step-art art-urn" aria-hidden="true">
            <div className="mini-lcd">
              <span>SEU VOTO PARA</span>
              <strong>Presidente</strong>
              <div className="mini-digits">
                <b></b>
                <b></b>
              </div>
            </div>
          </div>
          <h3>A urna revela o resultado.</h3>
          <p>Ela digita o número de quem mais combina com você e mostra o resultado por tema, com as fontes de cada proposta.</p>
        </li>
      </ol>
    </section>
  )
}
