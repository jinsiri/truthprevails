import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { Quest } from '@/features/game/types';
import { INITIAL_QUESTS } from '@/features/game/quests';

interface QuestState {
  quests: Quest[];
  incrementProgress: (id: number) => void;
  checkAllCompleted: () => boolean;
}

const useQuestStore = create<QuestState>()(
  persist(
    (set, get) => ({
      quests: INITIAL_QUESTS.map((quest) => ({ ...quest })),

      incrementProgress: (id) =>
        set((state) => ({
          quests: state.quests.map((q) => (q.id === id && q.current < q.total ? { ...q, current: q.current + 1 } : q)),
        })),

      checkAllCompleted: () => {
        const { quests } = get();
        return quests.every((q) => q.current >= q.total);
      },
    }),
    {
      name: 'quest-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useQuestStore;
