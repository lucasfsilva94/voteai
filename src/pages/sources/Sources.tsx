import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import { Icon } from '../../components/Icon.tsx'
import { SourceItem } from '../../components/SourceItem.tsx'
import { normalize, PROPOSALS } from '../../lib/catalog.ts'
import { AREAS } from '../../lib/engine.ts'
import type { AreaId } from '../../lib/types.ts'
import { usePage } from '../../hooks/usePage.ts'
import { useSession } from '../../state/session.tsx'
import './Sources.css'

const external = { target: '_blank', rel: 'noopener noreferrer' } as const

function Catalog() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<AreaId | 'all'>('all')
  const list = useMemo(() => {
    const q = normalize(search)
    return PROPOSALS.filter((p) => (filter === 'all' || p.area === filter) && normalize(`${p.texto} ${p.contexto}`).includes(q))
  }, [search, filter])

  return (
    <section className="catalog-section">
      <div className="section-title-row">
        <h2>50 propostas. Fontes abertas.</h2>
        <span>Planos de governo com documento e página</span>
      </div>
      <div className="catalog-controls">
        <label className="search-box">
          <Icon name="eye" size={18} />
          <input type="search" id="source-search" placeholder="Buscar nas propostas…" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Buscar nas propostas" />
        </label>
        <label className="area-filter">
          <span>Tema</span>
          <select id="source-filter" value={filter} onChange={(e) => setFilter(e.target.value as AreaId | 'all')}>
            <option value="all">Todos os temas</option>
            {(Object.entries(AREAS) as [AreaId, string][]).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p id="source-count" className="source-count">
        {list.length} {list.length === 1 ? 'proposta encontrada' : 'propostas encontradas'}
      </p>
      <div id="source-list">
        {list.length ? (
          list.map((p) => <SourceItem key={p.id} proposal={p} />)
        ) : (
          <div className="empty-search">
            <h3>Nenhuma proposta encontrada.</h3>
            <p>Tente outra palavra ou escolha todos os temas.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default function Sources() {
  const { clear } = useSession()
  const heading = useRef<HTMLHeadingElement>(null)
  usePage('sources', 'Fontes e critérios', heading)

  return (
    <main id="main" className="sources-page page">
      <Link className="text-button" to="/">
        <Icon name="back" size={17} /> Voltar ao início
      </Link>
      <div className="sources-heading">
        <h1 ref={heading}>
          Você pode conferir
          <br /> <em>cada ideia.</em>
        </h1>
        <p>
          Um resultado só faz sentido quando você sabe de onde ele veio.
          <br /> Aqui estão o método, as propostas e as fontes.
        </p>
      </div>
      <section className="method-section">
        <h2>Como calculamos a afinidade</h2>
        <div className="method-columns">
          <div>
            <h3>Uma comparação às cegas</h3>
            <p>
              O catálogo reúne 50 propostas de Lula e Flávio Bolsonaro, com referências aos planos de governo. Sorteamos 25: 11 exclusivas de cada candidato e 3
              compartilhadas, distribuídas pelos sete temas.
            </p>
            <p>
              O nome e a fonte ficam ocultos durante o teste. Cada ideia tem referências de documento e página. Este recorte não representa uma auditoria
              independente completa dos planos.
            </p>
          </div>
          <div>
            <h3>As quatro respostas</h3>
            <ul className="method-answers">
              <li>
                <strong>Concordo</strong>
                <span>1 ponto para quem apoia.</span>
              </li>
              <li>
                <strong>Discordo</strong>
                <span>1 ponto para o lado oposto.</span>
              </li>
              <li>
                <strong>Importante</strong>
                <span>Concordância com peso 2.</span>
              </li>
              <li>
                <strong>Não sei</strong>
                <span>Avança sem somar pontos.</span>
              </li>
            </ul>
          </div>
          <div>
            <h3>O resultado, sem atalhos</h3>
            <p>
              Cada percentual é a pontuação do candidato dividida pelo total de pesos das respostas válidas. Ambos podem pontuar na mesma proposta. Por isso os
              percentuais não precisam somar 100%.
            </p>
            <p>
              Discordar de uma proposta exclusiva pontua para o outro candidato por uma regra de comparação. Isso não transforma “sem posição” em oposição
              documentada. Empates são exibidos sem desempate artificial.
            </p>
          </div>
        </div>
      </section>
      <Catalog />
      <section className="credits-section">
        <h2>Privacidade e créditos</h2>
        <p>
          Não pedimos cadastro e não enviamos suas respostas. A sessão é guardada no armazenamento local deste navegador. Você pode apagá-la a qualquer
          momento. Compartilhar envia somente um resumo, mediante sua ação.
        </p>
        <button type="button" className="button button-outline" onClick={clear}>
          Apagar minhas respostas deste aparelho
        </button>
        <p>
          Textos adaptados para o voteAI. Catálogo e referências recuperados em 14/10/2026; consulte os documentos originais em cada proposta. Teste
          independente de afinidade, sem vínculo com candidatos ou Justiça Eleitoral.
        </p>
        <p>
          Retrato de Lula: Palácio do Planalto,{' '}
          <a href="https://commons.wikimedia.org/wiki/File:Foto_oficial_de_Luiz_In%C3%A1cio_Lula_da_Silva_(ombros).jpg" {...external}>
            CC BY 2.0
          </a>
          . Retrato de Flávio Bolsonaro:{' '}
          <a href="https://commons.wikimedia.org/wiki/File:Foto_oficial_do_senador_Fl%C3%A1vio_Bolsonaro_(v._AgSen).jpg" {...external}>
            Agência Senado, Atribuição
          </a>
          . Mesmos recorte e tratamento. Fontes Rubik, Fredoka, IBM Plex Mono, DotGothic16 e DM Sans (logo): Google Fonts, SIL OFL. Som de confirmação:{' '}
          <a href="https://www.myinstants.com/pt/instant/urna-eletronica-confirma/" {...external}>
            gravação da urna eletrônica
          </a>
          , indicada para este projeto.
        </p>
      </section>
    </main>
  )
}
