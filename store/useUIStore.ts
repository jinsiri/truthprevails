import { create } from 'zustand';

type ViewType = 'about' | 'career' | 'careerDetail' | 'skills' | 'contact' | 'statWindow' | 'skillWindow' | 'questWindow' | 'inventoryWindow' | null;

interface UIState {
  activeView: ViewType;
  openView: (view: ViewType) => void;
  closeView: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeView: null,
  openView: (view) => set({ activeView: view }),
  closeView: () => set({ activeView: null }),
}));
