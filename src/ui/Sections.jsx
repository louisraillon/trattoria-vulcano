import { useStore } from '../store'

const MENU = [
  { id: 'pizza', name: 'Pizza Etna', desc: "'nduja, fior di latte, olives noires, basilic", price: '16 €' },
  { id: 'spaghetti', name: 'Spaghetti al Nero', desc: 'encre de seiche, gambero rosso, ail noir', price: '19 €' },
  { id: 'arancini', name: 'Arancini di Lava', desc: 'cœur coulant, ragù épicé, safran', price: '11 €' },
  { id: 'vino', name: "Rosso dell'Etna", desc: 'nerello mascalese, le verre', price: '9 €' },
  { id: null, name: 'Caponata Siciliana', desc: 'aubergine confite, câpres, pignons', price: '12 €' },
  { id: null, name: 'Cannolo Vulcanico', desc: 'ricotta fumée, pistache de Bronte, cacao', price: '9 €' },
]

function MenuRow({ item }) {
  const hovered = useStore((s) => s.hoveredDish)
  const setHoveredDish = useStore((s) => s.setHoveredDish)
  return (
    <li
      className={`menu-row${hovered === item.id && item.id ? ' active' : ''}`}
      onMouseEnter={() => item.id && setHoveredDish(item.id)}
      onMouseLeave={() => item.id && setHoveredDish(null)}
    >
      <span className='menu-name'>{item.name}</span>
      <span className='menu-desc'>{item.desc}</span>
      <span className='menu-price'>{item.price}</span>
    </li>
  )
}

export function Hero() {
  return (
    <section id='top' className='hero' aria-label='Accueil'>
      <div className='hero-title'>
        <h1 className='display-xl'>
          <span className='line1'>Tratto<span className='accent'>ria</span></span><br />
          <span className='line2 outline'>Vulcano</span>
        </h1>
        <div className='hero-sub'>
          <p className='quote'>Cucina di fuoco.</p>
          <p className='stat-mono'>SICILIA — 37.7510° N, 14.9934° E</p>
        </div>
      </div>
      <p className='scroll-hint' aria-hidden='true'>Scendi ↓</p>
    </section>
  )
}

export function Storia() {
  return (
    <section id='storia' aria-label='Notre histoire'>
      <div className='storia-grid'>
        <div>
          <p className='storia-year'>1962</p>
          <p className='quote'>« La montagne cuisine avec nous depuis trois générations. »</p>
        </div>
        <div className='col-right'>
          <p className='kicker'>La Storia</p>
          <h2 className='display-lg'>Née sous <span className='accent'>l'Etna</span></h2>
          <p className='body-copy'>
            Tout commence dans une cave de Catane, à l'ombre du volcan. <strong>Nonna Concetta</strong> pétrit
            sa première pâte pendant que la montagne gronde. Depuis, rien n'a changé : la farine de blé ancien,
            les tomates poussées sur cendre volcanique, et ce feu — jamais éteint — qui donne à chaque plat
            son goût de lave et de légende.
          </p>
        </div>
      </div>
    </section>
  )
}

export function Menu() {
  return (
    <section id='menu' className='menu-section' aria-label='Le menu'>
      <div className='menu-inner'>
        <p className='kicker'>Il Menu</p>
        <h2 className='display-lg'>Assiettes <span className='outline'>en fusion</span></h2>
        <ul className='menu-list'>
          {MENU.map((item) => <MenuRow key={item.name} item={item} />)}
        </ul>
        <p className='stat-mono' style={{ marginTop: '1.5rem' }}>
          Survolez un plat — il s'anime sur la table.
        </p>
      </div>
    </section>
  )
}

export function Forno() {
  return (
    <section id='forno' aria-label='Le four à bois'>
      <p className='kicker'>Il Forno</p>
      <h2 className='display-lg'>Notre cratère<br /><span className='accent'>domestique</span></h2>
      <p className='body-copy' style={{ marginTop: '1.5rem' }}>
        Un dôme de briques réfractaires, du bois d'olivier, et une seule règle :
        <strong> la pizza ne survit que 60 secondes</strong> dans l'enfer.
      </p>
      <div className='forno-stats'>
        <div className='forno-stat'>
          <p className='big'>485°</p>
          <p className='label'>Température</p>
        </div>
        <div className='forno-stat'>
          <p className='big'>60s</p>
          <p className='label'>Cuisson</p>
        </div>
        <div className='forno-stat'>
          <p className='big'>0</p>
          <p className='label'>Compromis</p>
        </div>
      </div>
    </section>
  )
}

export function Vini() {
  return (
    <section id='vini' className='vini-section' aria-label='La cave à vins'>
      <div>
        <p className='kicker'>I Vini</p>
        <h2 className='display-lg'>Racines <span className='outline'>volcaniques</span></h2>
        <p className='body-copy' style={{ marginTop: '1.5rem' }}>
          Des vignes plantées dans la cendre, à 900 mètres d'altitude.
          Minéralité brute, fruit sombre, finale fumée.
        </p>
        <ul className='vini-list'>
          <li><b>Etna Rosso DOC</b> — nerello mascalese · 2021</li>
          <li><b>Etna Bianco</b> — carricante · 2022</li>
          <li><b>Passito di Pantelleria</b> — zibibbo · 2019</li>
        </ul>
      </div>
    </section>
  )
}

export function Prenota() {
  return (
    <section id='prenota' className='prenota' aria-label='Réserver une table'>
      <p className='kicker' style={{ justifyContent: 'center' }}>Prenota</p>
      <h2 className='display-lg'>Une table près<br />du <span className='accent'>feu ?</span></h2>
      <a className='btn-lava' href='mailto:ciao@trattoria-vulcano.it?subject=Prenotazione'>
        Réserver — Prenota
      </a>
      <div className='prenota-info'>
        <span>Via del Cratere 62, Catania</span>
        <span>Mar – Dim · 19h – 23h30</span>
        <span>+39 095 62 62 62</span>
      </div>
    </section>
  )
}
