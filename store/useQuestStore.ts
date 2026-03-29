import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Quest {
  id: number;
  title: string;
  current: number;
  total: number;
}

interface QuestState {
  quests: Quest[];
  incrementProgress: (id: number) => void;
  checkAllCompleted: () => boolean;
}

const useQuestStore = create<QuestState>()(
  persist(
    (set, get) => ({
      quests: [
        { id: 1, title: "개발자 '진실'의 스탯 확인", current: 0, total: 1 },
        { id: 2, title: '주력 스킬 확인', current: 0, total: 1 },
        { id: 3, title: '인벤토리 아이템 조사', current: 0, total: 1 },
        { id: 4, title: '진실의 성장 기록 읽기', current: 0, total: 3 },
      ],

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
