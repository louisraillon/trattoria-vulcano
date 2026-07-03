import { create } from 'zustand'

export const useStore = create((set) => ({
  // dish id hovered in the menu list — lifts the matching dish cutout
  hoveredDish: null,
  setHoveredDish: (hoveredDish) => set({ hoveredDish }),
}))
