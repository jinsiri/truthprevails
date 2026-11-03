import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { Quest } from '@/features/game/types';
import { INITIAL_QUESTS } from '@/features/game/quests';

interface QuestState {
  quests: Quest[];
  incrementProgress: (id: number) => void;
  collected: string[];
  collectItem: (itemId: string, questId: number) => void;
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

      collected: [],

      collectItem: (itemId, questId) => {
        if (get().collected.includes(itemId)) return;
        set((state) => ({ collected: [...state.collected, itemId] }));
        get().incrementProgress(questId);
      },

      checkAllCompleted: () => {
        const { quests } = get();
        return quests.every((q) => q.current >= q.total);
      },
    }),
    {
      name: 'quest-storage',
      storage: createJSONStorage(() => localStorage),
      // 퀘스트가 추가돼도 기존 진행도는 유지하고 새 퀘스트만 붙인다
      merge: (persisted, current) => {
        const saved = (persisted ?? {}) as Partial<QuestState>;
        return {
          ...current,
          collected: saved.collected ?? [],
          quests: INITIAL_QUESTS.map((quest) => ({ ...quest, current: saved.quests?.find((q) => q.id === quest.id)?.current ?? 0 })),
        };
      },
    },
  ),
);

export default useQuestStore;
