export default function Nav() {
  return (
    <header className='nav'>
      <a href='#top' className='nav-logo' aria-label="Trattoria Vulcano — retour en haut">
        <svg width='22' height='22' viewBox='0 0 32 32' aria-hidden='true'>
          <path d='M16 4 L28 28 L4 28 Z' fill='#FF4D00' />
          <circle cx='16' cy='9' r='3' fill='#F4EBDC' />
        </svg>
        VULCANO
      </a>
      <nav aria-label='Navigation principale'>
        <ul className='nav-links'>
          <li><a href='#storia'>Storia</a></li>
          <li><a href='#menu'>Menu</a></li>
          <li><a href='#forno'>Il Forno</a></li>
          <li><a href='#vini'>Vini</a></li>
          <li><a href='#prenota'>Prenota</a></li>
        </ul>
      </nav>
    </header>
  )
}
