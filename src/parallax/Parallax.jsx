import { createContext, useContext, useEffect, useRef, useState } from 'react'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const SceneContext = createContext(null)

/*
 * ParallaxScene: full-bleed layered backdrop for a section.
 * Children <Layer depth={n}> translate against scroll at speed proportional
 * to depth (0 = pinned, 1 = fastest) + subtle pointer offset.
 * One rAF per scene, killed when off-screen (IntersectionObserver).
 */
export function ParallaxScene({ children, className = '' }) {
  const ref = useRef(null)
  const layers = useRef(new Set())

  useEffect(() => {
    if (prefersReducedMotion) return
    const el = ref.current
    let raf = null
    let visible = false
    let pointerX = 0
    let pointerY = 0

    const tick = () => {
      const rect = el.getBoundingClientRect()
      // -1 (below viewport) .. 0 (centered) .. 1 (above viewport)
      const progress = -((rect.top + rect.height / 2 - innerHeight / 2) / (innerHeight + rect.height)) * 2
      layers.current.forEach(({ node, depth }) => {
        const ty = progress * depth * 90
        const tx = pointerX * depth * 22
        const tyP = pointerY * depth * 14
        node.style.transform = `translate3d(${tx}px, ${ty + tyP}px, 0)`
      })
      raf = visible ? requestAnimationFrame(tick) : null
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(tick)
    })
    io.observe(el)

    const onPointer = (e) => {
      pointerX = (e.clientX / innerWidth) * 2 - 1
      pointerY = (e.clientY / innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    return () => {
      io.disconnect()
      window.removeEventListener('pointermove', onPointer)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <SceneContext.Provider value={layers}>
      <div ref={ref} className={`px-scene ${className}`} aria-hidden='true'>
        {children}
      </div>
    </SceneContext.Provider>
  )
}

/*
 * Layer: an image plane inside a ParallaxScene.
 * Falls back to a labeled gradient placeholder until the asset exists
 * in public/layers/ — drop the file, refresh, done.
 */
export function Layer({ src, depth = 0.2, className = '', style = {}, alt = '' }) {
  const layers = useContext(SceneContext)
  const nodeRef = useRef(null)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    const entry = { node: nodeRef.current, depth }
    layers.current.add(entry)
    return () => layers.current.delete(entry)
  }, [depth, layers])

  const name = src.split('/').pop()

  return (
    <div ref={nodeRef} className={`px-layer ${className}`} style={style}>
      {missing ? (
        <div className='px-placeholder'>
          <span>{name}</span>
        </div>
      ) : (
        <img src={src} alt={alt} loading='lazy' draggable='false' onError={() => setMissing(true)} />
      )}
    </div>
  )
}
