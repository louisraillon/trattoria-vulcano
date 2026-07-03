import * as THREE from 'three'
import { useMemo } from 'react'

// CC0 texture from ambientCG, tiled + srgb-corrected.
// Non-suspending: drei useTexture suspension hangs the frame loop in this
// environment, so load async and let three swap the map in when ready.
export function useTiledTexture(url, repeatX = 1, repeatY = 1) {
  return useMemo(() => {
    const t = new THREE.TextureLoader().load(url)
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(repeatX, repeatY)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 8
    return t
  }, [url, repeatX, repeatY])
}

function makeCanvas(size) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  return canvas
}

// black & cream checkerboard floor, classic graphic trattoria tiles
export function checkerTexture(repeat = 8) {
  const canvas = makeCanvas(256)
  const ctx = canvas.getContext('2d')
  const cell = 128
  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < 2; x++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? '#e9dfcc' : '#171310'
      ctx.fillRect(x * cell, y * cell, cell, cell)
    }
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(repeat, repeat)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

// red & white gingham tablecloth
export function ginghamTexture(repeat = 6) {
  const canvas = makeCanvas(256)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#f4ebdc'
  ctx.fillRect(0, 0, 256, 256)
  ctx.fillStyle = 'rgba(200, 40, 20, 0.55)'
  ctx.fillRect(0, 64, 256, 64)
  ctx.fillRect(64, 0, 64, 256)
  ctx.fillStyle = 'rgba(160, 25, 10, 0.85)'
  ctx.fillRect(64, 64, 64, 64)
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(repeat, repeat)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

// soft radial glow sprite for embers / fire
export function glowTexture() {
  const canvas = makeCanvas(128)
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.35, 'rgba(255,180,80,0.8)')
  g.addColorStop(1, 'rgba(255,80,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}
