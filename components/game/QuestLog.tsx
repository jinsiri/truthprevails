'use client';

import { Scroll, X } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import useQuestStore from '@/store/useQuestStore';

interface QuestProgressItemProps {
  title: string;
  current: number;
  total: number;
  isComplete?: boolean;
}

const QuestProgressItem = ({ title, current, total, isComplete }: QuestProgressItemProps) => {
  return (
    <div className={`mb-2 border-2 p-3 ${isComplete ? 'border-amber-800 bg-amber-100 opacity-70' : 'border-stone-800 bg-white'} transition-all`}>
      <div className='mb-1 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className={`flex h-4 w-4 items-center justify-center border-2 border-stone-800 ${isComplete ? 'bg-emerald-500' : 'bg-stone-200'}`}>
            {isComplete && <span className='text-[10px] text-white'>✔</span>}
          </div>
          <span className={`text-xs font-bold ${isComplete ? 'text-stone-500 line-through' : 'text-stone-900'}`}>{title}</span>
        </div>
        <span className='font-mono text-[10px]'>
          {current}/{total}
        </span>
      </div>

      <div className='h-1 w-full bg-stone-200'>
        <div className='h-full bg-emerald-500 transition-all duration-500' style={{ width: `${(current / total) * 100}%` }}></div>
      </div>
    </div>
  );
};

export function UserQuestLog() {
  const { activeView, openView, closeView } = useUIStore();
  const quests = useQuestStore((state) => state.quests);

  return (
    <section className={'relative'}>
      {activeView === 'questWindow' && (
        <div className='absolute top-0 right-0 z-51 w-80 border-4 border-[#5d4037] bg-[#f4e4bc] p-5 shadow-[6px_6px_0px_rgba(0,0,0,0.2)]'>
          <button className={'absolute top-0 right-0 inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center text-black'} onClick={closeView}>
            <X />
          </button>

          <h3 className='mb-4 flex items-center justify-between border-b-2 border-[#d7ccc8] pb-1 text-sm font-black text-[#3e2723]'>
            <span>📋 현재 수행 중인 퀘스트</span>
          </h3>

          {quests.map((quest) => (
            <QuestProgressItem key={quest.id} title={quest.title} current={quest.current} total={quest.total} isComplete={quest.current >= quest.total} />
          ))}

          <div className='mt-4 border border-[#bcaaa4] bg-[#efebe9] p-2 text-[10px] leading-tight text-[#5d4037]'>
            <strong>💡 Tip:</strong> 모든 단서를 모으면 <span className='font-bold text-emerald-700'>면접 제의</span> 버튼이 활성화됩니다!
          </div>
        </div>
      )}
      <button
        onClick={() => openView('questWindow')}
        className='hover:bg-elevated z-50 inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-sm border-2 border-black bg-purple-600 p-2 text-white transition dark:bg-purple-200 dark:text-black'
        aria-label='Toggle dark mode'
      >
        <Scroll />
      </button>
    </section>
  );
}
