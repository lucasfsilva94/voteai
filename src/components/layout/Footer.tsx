import { Link } from 'react-router'
import { Brand } from '../brand/Brand.tsx'
import { Icon } from '../Icon.tsx'
import './Layout.scss'

export function Footer() {
  return (
    <footer className="site-footer page">
      <Brand small />
      <p>
        Uma decisão sua. Um teste independente.
        <br /> Sem vínculo com partidos ou com a Justiça Eleitoral.
      </p>
      <Link to="/fontes">
        Metodologia e privacidade <Icon name="arrow" size={16} />
      </Link>
    </footer>
  )
}
