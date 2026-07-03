import { lazy, Suspense, useEffect, useState } from 'react'
import Experience from './scene/Experience'

// dev tuning stage for GLB placement: open /?tune
const TuneScene = lazy(() => import('./scene/TuneScene'))
const isTune = new URLSearchParams(window.location.search).has('tune')
import Nav from './ui/Nav'
import DishTip from './ui/DishTip'
import { Hero, Storia, Menu, Forno, Vini, Prenota } from './ui/Sections'
import { useStore } from './store'

function Marquee() {
  const items = 'TRATTORIA VULCANO · CUCINA SICILIANA · PIZZA AL FUOCO · PASTA FRESCA · '
  return (
    <div className='marquee' aria-hidden='true'>
      <div className='marquee-track'>
        <span>{items.repeat(3)}</span>
        <span>{items.repeat(3)}</span>
      </div>
    </div>
  )
}

export default function App() {
  const flat = useStore((s) => s.flat)
  const toggleFlat = useStore((s) => s.toggleFlat)
  const [ready, setReady] = useState(false)

  // page scroll → normalized progress for the camera rig
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      useStore.getState().setScroll(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  if (isTune) {
    return (
      <div style={{ position: 'fixed', inset: 0 }}>
        <Suspense fallback={null}>
          <TuneScene />
        </Suspense>
      </div>
    )
  }

  return (
    <>
      <a className='skip-link' href='#main'>Aller au contenu</a>
      <Nav />

      {!flat && (
        <div className='canvas-wrap' aria-hidden='true'>
          <Experience onReady={() => setReady(true)} />
        </div>
      )}

      {!flat && !ready && (
        <div className='loader' role='status'>
          <div className='flame' aria-hidden='true' />
          <p>Accensione del forno…</p>
        </div>
      )}

      <main id='main' className={`content${flat ? ' flat' : ''}`}>
        <Hero />
        <Marquee />
        <Storia />
        <Menu />
        <Forno />
        <Vini />
        <Prenota />
      </main>

      <footer className='footer'>
        <span>© 2026 Trattoria Vulcano — sito fittizio, progetto portfolio</span>
        <span>Design & code : Louis Raillon</span>
      </footer>

      <DishTip />

      <button className='toggle-3d' onClick={toggleFlat}>
        {flat ? 'Activer la 3D' : 'Désactiver la 3D'}
      </button>
    </>
  )
}
