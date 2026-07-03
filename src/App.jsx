import { useEffect } from 'react'
import Nav from './ui/Nav'
import { Hero, Storia, Menu, Forno, Vini, Prenota } from './ui/Sections'

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
  // preload hero layers early
  useEffect(() => {
    for (const f of ['hero-sky.jpg', 'hero-volcano.png', 'hero-arch.png']) {
      const img = new Image()
      img.src = `/layers/${f}`
    }
  }, [])

  return (
    <>
      <a className='skip-link' href='#main'>Aller au contenu</a>
      <Nav />
      <main id='main' className='content'>
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
    </>
  )
}
