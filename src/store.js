import { create } from 'zustand'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const useStore = create((set) => ({
  // 0..1 page scroll progress, written by the scroll listener, read by the camera rig
  scroll: 0,
  setScroll: (scroll) => set({ scroll }),

  // dish id hovered either in the 3D scene or in the DOM menu list
  hoveredDish: null,
  setHoveredDish: (hoveredDish) => set({ hoveredDish }),

  // cursor-follow tooltip for 3D dish hover
  tip: null, // { label, x, y }
  setTip: (tip) => set({ tip }),

  // volcano easter egg
  erupting: false,
  setErupting: (erupting) => set({ erupting }),

  // user opted out of the 3D experience (or reduced motion)
  flat: prefersReducedMotion,
  toggleFlat: () => set((s) => ({ flat: !s.flat })),

  reducedMotion: prefersReducedMotion,
}))
