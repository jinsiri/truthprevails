'use client';

import { SparkleIcon, Sprout, X } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import useQuestStore from '@/store/useQuestStore';

interface StatBarProps {
  label: string;
  level: number;
  colorClass: string;
  description?: string;
}

const StatBar = ({ label, level, colorClass, description }: StatBarProps) => {
  return (
    <div className='group relative mb-5'>
      <div className='mb-1 flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <span className='text-sm font-bold tracking-tight text-amber-900'>{label}</span>

          {description && (
            <div className='relative'>
              <span className='flex h-3.5 w-3.5 cursor-help items-center justify-center rounded-full border border-amber-400 bg-amber-200 text-[10px] font-bold text-amber-800 transition-colors hover:bg-amber-300'>
                ?
              </span>

              <div className='pointer-events-none absolute top-[100%] left-1/2 z-50 w-48 -translate-x-1/2 translate-y-[4px] rounded border border-stone-600 bg-stone-800 p-2 text-[12px] leading-relaxed break-keep text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100'>
                {/*<div className='absolute top-1/2 -left-1 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-l border-stone-600 bg-stone-800'></div>*/}
                {description}
              </div>
            </div>
          )}
        </div>
        <span className='font-mono text-[10px] text-amber-700'>LV.{level}</span>
      </div>

      <div className='h-4 w-full border-2 border-stone-800 bg-stone-200 p-[1px]'>
        <div className={`h-full ${colorClass} transition-all duration-1000 ease-out`} style={{ width: `${level}%` }}></div>
      </div>
    </div>
  );
};

export function MasteredSkills() {
  const { activeView, openView, closeView } = useUIStore();

  return (
    <section className={'relative'}>
      {activeView === 'skillWindow' && (
        <div className='absolute top-0 right-0 z-51 w-64 rounded-sm border-4 border-amber-900 bg-orange-50 p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] dark:border-amber-100 dark:bg-orange-950'>
          <button className={'absolute top-0 right-0 inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center'} onClick={closeView}>
            <X />
          </button>

          <h3 className='mb-6 flex items-center gap-2 border-b-2 border-amber-200 pb-2 text-lg font-black text-amber-950 uppercase'>
            <span className='text-amber-600'>★</span> Mastered Skills
          </h3>

          <StatBar label='React' level={90} colorClass='bg-cyan-400' />
          <StatBar label='TypeScript' level={80} colorClass='bg-blue-600' />
          <StatBar label='Tailwind' level={95} colorClass='bg-teal-300' />

          <p className='mt-4 text-right text-[12px] leading-tight break-keep text-stone-500'>* 경험치는 실제 프로젝트 기여도 기반입니다.</p>
        </div>
      )}
      <button
        onClick={() => openView('skillWindow')}
        className='hover:bg-elevated inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-sm border-2 border-black bg-blue-600 p-2 text-white transition dark:bg-blue-200 dark:text-black'
        aria-label='Toggle dark mode'
      >
        <SparkleIcon />
      </button>
    </section>
  );
}

export function CharacterStatus() {
  const { activeView, openView, closeView } = useUIStore();
  const incrementProgress = useQuestStore((state) => state.incrementProgress);

  return (
    <section className={'relative'}>
      {activeView === 'statWindow' && (
        <div className='absolute top-0 right-0 z-51 w-64 rounded-sm border-4 border-amber-900 bg-orange-50 p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] dark:border-amber-100 dark:bg-orange-950'>
          <button className={'absolute top-0 right-0 inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center'} onClick={closeView}>
            <X />
          </button>

          <h3 className='mb-6 flex items-center gap-2 border-b-2 border-amber-200 pb-2 text-lg text-amber-950 uppercase'>
            <span className='text-amber-600'>★</span> Character Status
          </h3>

          <StatBar label='STR (Execution)' level={90} colorClass='bg-yellow-500' description={'기획을 코드로 꽂아넣는 실행력'} />
          <StatBar label='INT (Logic)' level={85} colorClass='bg-yellow-700' description={'효율적인 데이터 구조와 로직 설계'} />
          <StatBar label='DEX (Detail)' level={95} colorClass='bg-orange-500' description={'1px도 놓치지 않는 UI 디테일'} />
          <StatBar label='CHA (Teamwork)' level={95} colorClass='bg-red-500' description={'협업과 소통, 긍정적인 에너지'} />
          <StatBar label='LUK (Growth)' level={95} colorClass='bg-orange-700' description={'새로운 기술을 빨아들이는 학습 운'} />
        </div>
      )}
      <button
        onClick={() => {
          openView('statWindow');
          incrementProgress(1);
        }}
        className='hover:bg-elevated inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-sm border-2 border-black bg-green-600 p-2 text-white transition dark:bg-green-200 dark:text-black'
        aria-label='Toggle dark mode'
      >
        <Sprout />
      </button>
    </section>
  );
}
