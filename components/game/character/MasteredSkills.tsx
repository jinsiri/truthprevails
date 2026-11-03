'use client';

import GameDialog from '@/components/game/GameDialog';
import { useUIStore } from '@/store/useUIStore';
import useQuestStore from '@/store/useQuestStore';
import { MASTERED_SKILLS } from '@/features/game/character';
import type { SkillTier } from '@/features/game/types';
import { SparkleIcon, X } from 'lucide-react';

const TIER_STYLE: Record<SkillTier, string> = {
  MAIN: 'border-amber-800 bg-amber-300 text-amber-950',
  SUB: 'border-blue-800 bg-blue-200 text-blue-950',
};

export function MasteredSkills() {
  const { activeView, openView, closeView } = useUIStore();
  const incrementProgress = useQuestStore((state) => state.incrementProgress);

  return (
    <section className={'relative'}>
      {activeView === 'skillWindow' && (
        <GameDialog
          label='주력 스킬'
          onClose={closeView}
          className='absolute top-0 right-0 z-51 max-h-[70vh] w-72 overflow-y-auto rounded-sm border-4 border-amber-900 bg-orange-50 p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] dark:border-amber-100 dark:bg-orange-950'
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
          <ul className='space-y-2'>
            {MASTERED_SKILLS.map((skill) => (
              <li key={skill.label} className='flex items-start gap-2 border-2 border-amber-900 bg-amber-50 p-2'>
                <span className={`shrink-0 border-2 px-1.5 text-[11px] leading-5 font-bold ${TIER_STYLE[skill.tier]}`}>{skill.tier}</span>
                <div className='min-w-0'>
                  <p className='text-sm leading-5 font-bold tracking-tight text-amber-900'>{skill.label}</p>
                  <p className='mt-0.5 text-[12px] leading-snug break-keep text-amber-800'>획득: {skill.source}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className='mt-4 text-right text-[12px] leading-tight break-keep text-stone-500 dark:text-stone-300'>* MAIN 실무 주력 · SUB 프로젝트 사용</p>
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
