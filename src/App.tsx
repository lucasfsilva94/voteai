import { lazy, Suspense, useLayoutEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import { Footer } from './components/layout/Footer.tsx'
import { Header } from './components/layout/Header.tsx'
import Home from './pages/home/Home.tsx'
import Quiz from './pages/quiz/Quiz.tsx'
import Urn from './pages/urn/Urn.tsx'
import { SessionProvider } from './state/session.tsx'
import { ToastProvider } from './state/toast.tsx'

// Pages reached after the test or from the footer load on demand.
const Result = lazy(() => import('./pages/result/Result.tsx'))
const Sources = lazy(() => import('./pages/sources/Sources.tsx'))

// A new page starts at the top; links to a landing section (#perguntas…) scroll there instead.
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useLayoutEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}

export function App() {
  return (
    <ToastProvider>
      <SessionProvider>
        <ScrollToTop />
        <a className="skip-link" href="#main">
          Pular para o conteúdo
        </a>
        <Header />
        <Suspense fallback={<main id="main" className="page" aria-busy="true"></main>}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="teste" element={<Quiz />} />
            <Route path="urna" element={<Urn />} />
            <Route path="resultado" element={<Result />} />
            <Route path="fontes" element={<Sources />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <Footer />
      </SessionProvider>
    </ToastProvider>
  )
}
