import { useMemo, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { FlowSteps } from '../../components/FlowSteps.tsx'
import { Icon } from '../../components/Icon.tsx'
import { VotingMachine } from '../../components/machine/VotingMachine.tsx'
import { SourceItem } from '../../components/SourceItem.tsx'
import { PORTRAITS } from '../../data/portraits.ts'
import { getProposal, THEME_ICONS } from '../../lib/catalog.ts'
import { AREAS, calculate, CANDIDATES, TOTAL } from '../../lib/engine.ts'
import type { AreaId, Result as ResultData, Session } from '../../lib/types.ts'
import { prefersReducedMotion, usePage } from '../../hooks/usePage.ts'
import { useSession } from '../../state/session.tsx'
import { useToast } from '../../state/toast.tsx'
import './Result.css'

function ResultScreen({ r }: { r: ResultData }) {
  if (r.status !== 'winner' || !r.winner)
    return (
      <>
        <span className="lcd-label">APURAÇÃO CONCLUÍDA</span>
        <div className="screen-neutral">
          <strong>{r.status === 'tie' ? 'EMPATE' : 'SEM DADOS'}</strong>
          <p>{r.status === 'tie' ? 'A mesma afinidade com os dois candidatos.' : 'Responda a algumas propostas para calcular.'}</p>
        </div>
        <div className="lcd-end">FIM</div>
      </>
    )
  const c = CANDIDATES[r.winner]
  return (
    <>
      <span className="lcd-label">MAIOR AFINIDADE COM SUAS RESPOSTAS</span>
      <div className={`lcd-candidate lcd-candidate-${r.winner}`}>
        <div>
          <span>Presidência · 2026</span>
          <div className="lcd-number">
            <b>{c.number[0]}</b>
            <b>{c.number[1]}</b>
          </div>
          <strong>{c.name}</strong>
          <span>{c.party}</span>
        </div>
        <img src={PORTRAITS[r.winner]} alt={`Retrato de ${c.name}`} />
      </div>
      <div className="lcd-end">
        <strong>{r.percentages[r.winner]}% de afinidade</strong>
        <span>FIM</span>
      </div>
    </>
  )
}

function ScoreRows({ r }: { r: ResultData }) {
  return (
    <>
      {(['B', 'A'] as const).map((id) => {
        const c = CANDIDATES[id]
        return (
          <div key={id} className={`score-row score-candidate-${id}${r.winner === id ? ' score-winning' : ''}`}>
            <img src={PORTRAITS[id]} alt="" width={48} height={48} />
            <div className="score-info">
              <div>
                <span>
                  {c.name}
                  <small>{c.party}</small>
                </span>
                <strong>
                  {r.status === 'empty' ? (
                    '—'
                  ) : (
                    <>
                      {r.percentages[id]}
                      <small>%</small>
                    </>
                  )}
                </strong>
              </div>
              <div className="score-track">
                <span className={`candidate-${id}`} style={{ width: `${r.percentages[id]}%` }}></span>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

function ThemeTable({ r }: { r: ResultData }) {
  return (
    <div className="theme-table">
      {(Object.entries(AREAS) as [AreaId, string][]).map(([id, label]) => {
        const area = r.areas[id]
        const pct = (c: 'A' | 'B') => (area?.weight ? Math.round((area.scores[c] / area.weight) * 100) : null)
        return (
          <div key={id} className="theme-row">
            <span>
              <Icon name={THEME_ICONS[id]} size={18} /> {label}
            </span>
            <div className="theme-bars">
              {(['B', 'A'] as const).map((c) => {
                const p = pct(c)
                return (
                  <div key={c}>
                    <div className="theme-track">
                      <span className={`candidate-${c}`} style={{ width: `${p ?? 0}%` }}></span>
                    </div>
                    <small aria-label={`${CANDIDATES[c].name}: ${p === null ? 'sem opinião' : `${p} por cento`}`}>{p === null ? '—' : `${p}%`}</small>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function shareText(r: ResultData) {
  if (r.status === 'winner' && r.winner) return `No voteAI, tive ${r.percentages[r.winner]}% de afinidade com ${CANDIDATES[r.winner].name}. Primeiro as ideias. Depois os nomes.`
  if (r.status === 'tie') return 'Minhas respostas empataram no voteAI. Primeiro as ideias. Depois os nomes.'
  return 'Conheça propostas às cegas no voteAI. Primeiro as ideias. Depois os nomes.'
}

function ResultView({ session }: { session: Session }) {
  const { start, soundBlocked, playConfirmation, toggleSound, sound } = useSession()
  const toast = useToast()
  const navigate = useNavigate()
  const heading = useRef<HTMLHeadingElement>(null)
  const reviewRef = useRef<HTMLElement>(null)
  const [review, setReview] = useState(false)
  const [fallback, setFallback] = useState<string | null>(null)
  usePage('result', 'Seu resultado', heading)
  const proposals = useMemo(() => session.order.map(getProposal), [session.order])
  const r = useMemo(() => calculate(proposals, session.answers), [proposals, session.answers])

  const openReview = () => {
    setReview(true)
    requestAnimationFrame(() => {
      const section = reviewRef.current
      if (!section) return
      section.scrollIntoView({ behavior: prefersReducedMotion() ? 'instant' : 'smooth' })
      section.setAttribute('tabindex', '-1')
      section.focus({ preventScroll: true })
    })
  }

  const share = async () => {
    const text = shareText(r)
    const url = `${location.origin}${import.meta.env.BASE_URL}`
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Minha afinidade no voteAI', text, url })
        return
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${text}\n${url}`)
        toast('Resumo e link copiados. Suas respostas individuais não são compartilhadas.')
        return
      }
    } catch (e) {
      if ((e as Error).name === 'AbortError') return
    }
    setFallback(`${text}\n${url}`)
  }

  const restart = () => {
    start()
    navigate('/teste')
  }

  return (
    <main id="main" className="result-page page">
      <FlowSteps active={3} />
      <div className="result-hero">
        <div className="result-device">
          <VotingMachine
            screen={<ResultScreen r={r} />}
            revealed
            numberKeyLabel="resultado revelado"
            onNumber={() => toast('Aqui, você vota em ideias. A urna compara as respostas automaticamente.')}
            onBlank={() => toast('O voteAI compara ideias. Para registrar um voto em branco, use a urna oficial no dia da eleição.')}
            onCorrect={openReview}
            onConfirm={() => toast('Seu resultado já foi revelado. Você pode revisar as respostas.')}
          />
          <p className="device-caption">As suas ideias, traduzidas em afinidade.</p>
        </div>
        <div className="result-summary">
          <span className="result-badge">
            <Icon name={r.status === 'empty' ? 'question' : 'check'} size={16} /> {r.status === 'empty' ? 'Ainda não há respostas suficientes' : 'Apuração concluída'}
          </span>
          <h1 ref={heading}>
            {r.status === 'winner' && r.winner ? (
              <>
                Nas ideias, você se aproxima mais de <em className={`candidate-name-${r.winner}`}>{CANDIDATES[r.winner].name}.</em>
              </>
            ) : r.status === 'tie' ? (
              <>
                Suas ideias encontraram <em>um empate.</em>
              </>
            ) : (
              <>
                Para descobrir, precisamos <em>da sua opinião.</em>
              </>
            )}
          </h1>
          <p>
            {r.status === 'empty'
              ? 'Você marcou Não sei em todas as propostas. Tudo bem: refaça o teste e responda às ideias sobre as quais tem uma opinião.'
              : r.status === 'tie'
                ? 'Suas respostas deram a mesma pontuação aos dois candidatos. Veja os temas e as fontes para entender o resultado.'
                : 'Este é um retrato das suas respostas a este conjunto de propostas. A escolha do voto continua com você.'}
          </p>
          <div className="score-comparison">
            <ScoreRows r={r} />
          </div>
          <div className="result-buttons">
            <button type="button" className="button button-primary" onClick={openReview}>
              <Icon name="eye" /> Ver minhas respostas
            </button>
            <button type="button" className="button button-outline" onClick={share}>
              <Icon name="share" /> Compartilhar
            </button>
          </div>
          <button type="button" className="text-button" onClick={restart}>
            <Icon name="reset" size={16} /> Fazer um novo teste
          </button>
          <p className="result-footnote">
            {r.answered} opiniões · {r.skipped} “Não sei” · Importante vale ×2
            <br /> Os percentuais são independentes e podem não somar 100%.
          </p>
          <button
            type="button"
            className="text-button repeat-sound"
            hidden={!soundBlocked}
            onClick={() => {
              if (!sound) toggleSound()
              void playConfirmation()
            }}
          >
            <Icon name="volume" size={16} /> Ouvir confirmação
          </button>
          {fallback && (
            <div id="share-fallback">
              <label>
                Copie seu resumo
                <textarea readOnly value={fallback} ref={(el) => el?.select()} />
              </label>
            </div>
          )}
        </div>
      </div>
      <section className="theme-results">
        <div className="section-title-row">
          <h2>E em cada tema?</h2>
          <span className="chart-legend">
            <b className="dot-B"></b>Lula <b className="dot-A"></b>Flávio Bolsonaro
          </span>
        </div>
        <ThemeTable r={r} />
      </section>
      <section className="review-section" id="review-section" ref={reviewRef} hidden={!review}>
        <div className="section-title-row">
          <h2>Agora você sabe de quem é.</h2>
          <span>Suas respostas e as fontes</span>
        </div>
        <p className="review-intro">
          Confira as posições dos candidatos e as referências dos documentos. “Sem posição” significa que não foi encontrada uma posição no recorte do plano.
        </p>
        {proposals.map((p) => (
          <SourceItem key={p.id} proposal={p} answer={session.answers[p.id]} />
        ))}
      </section>
    </main>
  )
}

export default function Result() {
  const { session } = useSession()
  if (!session || session.index < TOTAL) return <Navigate to={session ? '/teste' : '/'} replace />
  if (!session.revealed) return <Navigate to="/urna" replace />
  return <ResultView session={session} />
}
