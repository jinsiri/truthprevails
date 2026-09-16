'use client';

import GameDialog from '@/components/game/GameDialog';
import { useUIStore } from '@/store/useUIStore';
import useQuestStore from '@/store/useQuestStore';
import { CHARACTER_STATS } from '@/features/game/character';
import { StatBar } from './StatBar';
import { Sprout, X } from 'lucide-react';

export function CharacterStatus() {
  const { activeView, openView, closeView } = useUIStore();
  const incrementProgress = useQuestStore((state) => state.incrementProgress);

  return (
    <section className={'relative'}>
      {activeView === 'statWindow' && (
        <GameDialog
          label='캐릭터 스탯'
          onClose={closeView}
          className='absolute top-0 right-0 z-51 w-64 rounded-sm border-4 border-amber-900 bg-orange-50 p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] dark:border-amber-100 dark:bg-orange-950'
        >
          <button
            className={'absolute top-0 right-0 inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center'}
            aria-label='닫기'
            onClick={closeView}
          >
            <X />
          </button>

          <h3 className='mb-6 flex items-center gap-2 border-b-2 border-amber-200 pb-2 text-lg text-amber-950 uppercase'>
            <span className='text-amber-600'>★</span> Character Status
          </h3>

          {CHARACTER_STATS.map((stat) => (
            <StatBar key={stat.label} {...stat} />
          ))}
        </GameDialog>
      )}
      <button
        onClick={(event) => {
          event.currentTarget.focus();
          openView('statWindow');
          incrementProgress(1);
        }}
        className='hover:bg-elevated inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-sm border-2 border-black bg-green-600 p-2 text-white transition dark:bg-green-200 dark:text-black'
        aria-label='캐릭터 스탯 열기'
      >
        <Sprout />
      </button>
    </section>
  );
}
