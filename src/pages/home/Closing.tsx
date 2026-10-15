import type { Ref } from 'react'
import { Countdown } from '../../components/Countdown.tsx'
import { Icon } from '../../components/Icon.tsx'
import { FAQ } from '../../data/content.ts'

export function Trust() {
  return (
    <section className="trust page" id="por-que-confiar">
      <h2 className="motion-reveal">Feito para você decidir com calma.</h2>
      <ul className="trust-list">
        <li className="motion-reveal">
          <strong>Fontes abertas.</strong> Cada proposta tem documento e página do plano de governo. Você confere tudo antes e depois.
        </li>
        <li className="motion-reveal">
          <strong>Mesmo espaço para os dois.</strong> 11 propostas exclusivas de cada candidato e 3 que os dois apoiam, em todos os testes.
        </li>
        <li className="motion-reveal">
          <strong>Nada sai do seu aparelho.</strong> Sem cadastro, sem coleta de respostas, sem anúncios. O cálculo acontece no seu navegador.
        </li>
        <li className="motion-reveal">
          <strong>Não substitui o seu voto.</strong> O resultado é um retrato das suas respostas. A decisão continua sendo só sua.
        </li>
      </ul>
    </section>
  )
}

export function Faq() {
  return (
    <section className="faq page" id="perguntas">
      <h2 className="motion-reveal">Perguntas frequentes</h2>
      <div className="faq-list motion-reveal">
        {FAQ.map(([q, a]) => (
          <details key={q} className="faq-item">
            <summary>
              <span>{q}</span>
              <span className="details-plus" aria-hidden="true">
                +
              </span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function FinalCta({ label, onCta, closingRef }: { label: string; onCta: () => void; closingRef: Ref<HTMLDivElement> }) {
  return (
    <section className="final-cta page">
      <div className="closing-cta motion-reveal" ref={closingRef}>
        <div>
          <h2>Conheça as ideias antes de votar.</h2>
          <Countdown className="countdown-final" />
        </div>
        <button type="button" className="button button-primary" onClick={onCta}>
          {label} <Icon name="arrow" />
        </button>
      </div>
    </section>
  )
}

export function StickyCta({ label, onCta, visible }: { label: string; onCta: () => void; visible: boolean }) {
  return (
    <div className="sticky-cta" hidden={!visible}>
      <button type="button" className="button button-primary" onClick={onCta}>
        {label} <Icon name="arrow" />
      </button>
    </div>
  )
}
