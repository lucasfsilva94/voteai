import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
// Global styles first, so each component's stylesheet comes after them in the cascade.
import './styles/tokens.css'
import './styles/base.css'
import { App } from './App.tsx'

const BASE = import.meta.env.BASE_URL

// Links shared before the routes lost their "#" (…/voteai/#teste) still land on the right page.
const LEGACY_HASHES: Record<string, string> = { '#inicio': '', '#teste': 'teste', '#urna': 'urna', '#resultado': 'resultado', '#fontes': 'fontes' }
const legacy = LEGACY_HASHES[location.hash]
if (legacy !== undefined) history.replaceState(null, '', BASE + legacy)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={BASE}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
