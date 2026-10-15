import { useRef } from 'react'
import explainerUrl from '../../assets/media/voteai-explainer.mp4'
import { Icon } from '../../components/Icon.tsx'
import { useExplainerVideo } from './useLandingMotion.ts'

// The poster stays in public/ at a fixed URL because the og:image tag in index.html points at it too.
const POSTER = `${import.meta.env.BASE_URL}assets/voteai-explainer-poster.png`

export function Explainer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { paused, toggle } = useExplainerVideo(videoRef)
  return (
    <section className="explainer-section page" id="video-explicativo">
      <div className="section-title-row motion-reveal">
        <h2>Como funciona, em 20 segundos.</h2>
        <p>Sem som. Os textos aparecem na tela.</p>
      </div>
      <div className="explainer-frame motion-reveal">
        <video
          id="explainer-video"
          ref={videoRef}
          muted
          playsInline
          loop
          preload="metadata"
          poster={POSTER}
          aria-label="Vídeo explicativo: no 2º turno, leia 25 propostas sem os nomes, responda e veja na urna com quem você mais concorda"
        >
          <source src={explainerUrl} type="video/mp4" />
        </video>
        <button
          type="button"
          className={`video-overlay${paused ? ' is-paused' : ''}`}
          onClick={toggle}
          aria-label={paused ? 'Reproduzir vídeo explicativo' : 'Pausar vídeo explicativo'}
        >
          <Icon name={paused ? 'play' : 'pause'} size={20} />
        </button>
      </div>
    </section>
  )
}
