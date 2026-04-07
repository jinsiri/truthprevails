import { create } from 'zustand';

export interface InventoryItemData {
  id?: string;
  name: string;
  icon: string;
  description: string;
  level?: number;
  rarity?: 'Normal' | 'Rare' | 'Epic' | 'Legendary';
  useEffect?: string;
}

type ViewType = 'about' | 'career' | 'careerDetail' | 'skills' | 'contact' | 'statWindow' | 'skillWindow' | 'questWindow' | 'inventoryWindow' | null;

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
