import { Link, useLocation, useNavigate } from 'react-router'
import { Brand } from '../brand/Brand.tsx'
import './Layout.scss'

export function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const inTest = pathname === '/teste' || pathname === '/urna'
  return (
    <header className="site-header page">
      <Brand />
      <nav aria-label="Navegação principal">
        {inTest ? (
          <button type="button" className="text-button" onClick={() => navigate('/')}>
            Salvar e sair
          </button>
        ) : (
          <>
            <Link to={{ pathname: '/', hash: '#como-funciona' }}>Como funciona</Link>
            <Link className="nav-faq" to={{ pathname: '/', hash: '#perguntas' }}>Perguntas</Link>
            <Link to="/fontes">Fontes e critérios</Link>
          </>
        )}
      </nav>
      <span className="election-label">
        <span></span> 2º turno <b>25/10</b>
      </span>
    </header>
  )
}
