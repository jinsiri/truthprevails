'use client';

import GameDialog from '@/components/game/GameDialog';
import { useUIStore } from '@/store/useUIStore';
import useQuestStore from '@/store/useQuestStore';
import { MASTERED_SKILLS } from '@/features/game/character';
import { StatBar } from './StatBar';
import { SparkleIcon, X } from 'lucide-react';

export function MasteredSkills() {
  const { activeView, openView, closeView } = useUIStore();
  const incrementProgress = useQuestStore((state) => state.incrementProgress);

  return (
    <section className={'relative'}>
      {activeView === 'skillWindow' && (
        <GameDialog
          label='주력 스킬'
          onClose={closeView}
          className='absolute top-0 right-0 z-51 max-h-[70vh] w-64 overflow-y-auto rounded-sm border-4 border-amber-900 bg-orange-50 p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] dark:border-amber-100 dark:bg-orange-950'
        >
          <button
            className={'absolute top-0 right-0 inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center'}
            aria-label='닫기'
            onClick={closeView}
          >
            <X />
          </button>
          <h3 className='mb-6 flex items-center gap-2 border-b-2 border-amber-200 pb-2 text-lg font-black text-amber-950 uppercase'>
            <span className='text-amber-600'>★</span> Mastered Skills
          </h3>
          {MASTERED_SKILLS.map((stat) => (
            <StatBar key={stat.label} {...stat} />
          ))}
          <p className='mt-4 text-right text-[12px] leading-tight break-keep text-stone-500'>* 경험치는 실제 프로젝트 기여도 기반입니다.</p>
        </GameDialog>
      )}
      <button
        onClick={(event) => {
          event.currentTarget.focus();
          openView('skillWindow');
          incrementProgress(2);
        }}
        className='hover:bg-elevated inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-sm border-2 border-black bg-blue-600 p-2 text-white transition dark:bg-blue-200 dark:text-black'
        aria-label='주력 스킬 열기'
      >
        <SparkleIcon />
      </button>
    </section>
  );
}
