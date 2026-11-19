'use client';

import ThemedImage from '@/components/ThemedImage';
import Image from 'next/image';
import { Footprints } from 'lucide-react';
import SpeechBubble from '@/components/game/SpeechBubble';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useKeyboardList } from '@/hooks/useKeyboardList';
import { EDUCATION } from '@/features/portfolio/education';
import type { EducationEntry } from '@/features/portfolio/types';
import clsx from 'clsx';
import useQuestStore from '@/store/useQuestStore';
import CharacterAnimation from '@/components/game/CharacterAnimation';
import JobPanel from '@/components/game/JobPanel';
import { IMAGE_ROOT } from '@/constants/imageSrc';

export default function GameLearning() {
  const countRef = useRef(false);
  const containerRef = useRef<HTMLOListElement>(null);
  const [selected, setSelected] = useState<EducationEntry | null>(null);
  const [characterReady, setCharacterReady] = useState(false);
  const handleCharacterReady = useCallback(() => setCharacterReady(true), []);
  const incrementProgress = useQuestStore((state) => state.incrementProgress);
  const hide = selected !== null;
  const inheritedSkills = selected?.previousJob ? EDUCATION.find((entry) => entry.job === selected.previousJob)?.skillSet : undefined;
  const selectEducation = (mode: EducationEntry) => setSelected(mode);
  const { vIdx, handleKeyDown, setVIdx } = useKeyboardList({
    vItems: EDUCATION,
    onSelectV: selectEducation,
  });

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (countRef.current) return;
    incrementProgress(4);
    countRef.current = true;
  }, [incrementProgress]);

  return (
    <main className='relative min-h-dvh w-full overflow-hidden'>
      <ThemedImage
        fadeIn={false}
        className={'absolute right-0 bottom-0 -z-10 object-cover'}
        lightSrc={`${IMAGE_ROOT}/images/game/school_day.png`}
        darkSrc={`${IMAGE_ROOT}/images/game/school_night.png`}
        alt=''
        priority
        sizes='100vw'
        fill={true}
      />

      <section className='relative z-10 min-h-dvh w-full p-8'>
        <CharacterAnimation
          active={hide}
          floatingText={selected?.studyText}
          textClass={selected?.textClass}
          onReady={handleCharacterReady}
          aside={
            selected &&
            characterReady && (
              <JobPanel key={selected.title} entry={selected} inheritedSkills={inheritedSkills} className='relative -mr-4 mb-64 shrink-0 max-md:hidden' />
            )
          }
        />
        {!(hide && characterReady) && (
          <>
            <div className='group tablet:w-[400px] pointer-events-none absolute -bottom-15 left-0 z-10 hidden w-[220px] md:block lg:left-20 xl:left-30 xl:w-[300px]'>
              <Image width={300} height={800} src={`${IMAGE_ROOT}/images/game/jinsil_standing.png`} alt='' className='h-auto w-full' />
              <SpeechBubble text={'자세히 보고 싶은 과정을 선택하세요!'} />
            </div>
            <div className='pointer-events-none absolute -bottom-16 left-2 z-10 w-36 md:hidden'>
              <Image width={144} height={224} src={`${IMAGE_ROOT}/images/game/jinsil_standing.png`} alt='' />
              <SpeechBubble placement='right' text={'자세히 보고 싶은 과정을 선택하세요!'} />
            </div>
          </>
        )}

        <div className={'tablet:max-w-[820px] absolute top-[26%] left-[50%] z-20 w-[90vw] max-w-[650px] -translate-x-1/2 text-white'}>
          <h2 className={'tablet:mb-8 tablet:text-4xl mb-5 flex items-center text-xl sm:text-2xl md:text-3xl'}>
            <Footprints className={'mr-4'} size={38} /> LEVEL UP: 교육 여정
          </h2>
          <ol
            ref={containerRef}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            className={'mode-btns sm:text-md tablet:text-2xl text-sm outline-none md:text-lg lg:text-xl'}
          >
            {EDUCATION.map((mode, index) => (
              <li key={`EDU_${index}`} className={'mb-2'}>
                <button
                  data-keyboard-v={index}
                  onFocus={() => setVIdx(index)}
                  className={clsx(
                    'tablet:p-6 grid w-full cursor-pointer grid-cols-1 gap-1 rounded-md border-2 p-4 text-left transition-all hover:bg-green-800 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-x-4',
                    vIdx === index && 'bg-green-800',
                  )}
                  onClick={() => {
                    setVIdx(index);
                    selectEducation(mode);
                  }}
                >
                  <span>
                    {index + 1}. {mode.title}
                  </span>
                  <small
                    className={
                      'tablet:max-w-[320px] tablet:text-base text-left text-xs leading-relaxed text-white/90 sm:max-w-[250px] sm:text-right sm:text-sm'
                    }
                  >
                    ({mode.date} / {mode.gameDescription ?? mode.description})
                  </small>
                </button>
              </li>
            ))}
          </ol>
          {selected && characterReady && (
            <JobPanel key={selected.title} entry={selected} inheritedSkills={inheritedSkills} className='relative mx-auto mt-5 w-fit md:hidden' />
          )}
        </div>
      </section>
    </main>
  );
}
