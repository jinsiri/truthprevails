import { create } from 'zustand';

import type { InventoryItemData, ViewType } from '@/features/game/types';

interface UIState {
  /** Item */
  hoveredItem: InventoryItemData | null;
  setHoveredItem: (item: InventoryItemData | null) => void;
  isFigmaMode: boolean;
  toggleFigmaMode: () => void;

  /** View */
  activeView: ViewType;
  openView: (view: ViewType) => void;
  closeView: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  hoveredItem: null,
  setHoveredItem: (item) => set({ hoveredItem: item }),
  isFigmaMode: false,
  toggleFigmaMode: () => set((state) => ({ isFigmaMode: !state.isFigmaMode })),

  activeView: null,
  openView: (view) => set({ activeView: view }),
  closeView: () => set({ activeView: null }),
}));
