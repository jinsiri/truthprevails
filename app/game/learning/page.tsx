'use client';

import ThemedImage from '@/components/ThemedImage';
import Image from 'next/image';
import { Footprints } from 'lucide-react';
import SpeechBubble from '@/components/game/SpeechBubble';
import { useEffect, useRef, useState } from 'react';
import { useKeyboardList } from '@/hooks/useKeyboardList';
import { EDUCATION } from '@/constants/dataset';
import clsx from 'clsx';
import useQuestStore from '@/store/useQuestStore';
import CharacterAnimation from '@/components/game/CharacterAnimation';
import { IMAGE_ROOT } from '@/constants/imageSrc';

export default function GameLearning() {
  const countRef = useRef(false);
  const containerRef = useRef<HTMLOListElement>(null);
  const [hide, setHide] = useState(false);
  const [skillSet, setSkillSet] = useState(['지식']);
  const [textClass, setTextClass] = useState('');
  const incrementProgress = useQuestStore((state) => state.incrementProgress);
  const selectEducation = (mode: (typeof EDUCATION)[number]) => {
    setHide(true);
    setSkillSet(mode.skillSet);
    setTextClass(mode.textClass);
  };
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
    <main className='relative min-h-screen w-full overflow-hidden'>
      <ThemedImage
        className={'absolute right-0 bottom-0 -z-10 object-cover'}
        lightSrc={`${IMAGE_ROOT}/images/game/school_day.png`}
        darkSrc={`${IMAGE_ROOT}/images/game/school_night.png`}
        alt={'educated list'}
        priority
        fill={true}
      />

      <section className='relative z-10 min-h-screen w-full p-8'>
        {hide ? (
          <CharacterAnimation skillSet={skillSet} textClass={textClass} />
        ) : (
          <div className='group absolute -bottom-15 left-0 hidden md:block lg:left-20 xl:left-30'>
            <Image width={300} height={800} src={'/images/game/jinsil_standing.png'} alt={'jinsil'} />
            <SpeechBubble text={'자세히 보고 싶은 과정을 선택하세요!'} />
          </div>
        )}

        <div className={'absolute top-[26%] left-[50%] w-[90vw] max-w-[650px] -translate-x-1/2 text-white'}>
          <h2 className={'mb-5 flex items-center text-xl sm:text-2xl md:text-3xl'}>
            <Footprints className={'mr-4'} size={38} /> LEVEL UP: 교육 여정
          </h2>
          <ol ref={containerRef} onKeyDown={handleKeyDown} tabIndex={0} className={'mode-btns sm:text-md text-sm outline-none md:text-lg lg:text-xl'}>
            {EDUCATION.map((mode, index) => (
              <li key={`EDU_${index}`} className={'mb-2'}>
                <button
                  data-keyboard-v={index}
                  onFocus={() => setVIdx(index)}
                  className={clsx(
                    'grid w-full cursor-pointer grid-cols-1 gap-1 rounded-md border-2 p-4 text-left transition-all hover:bg-green-800 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-x-4',
                    vIdx === index && 'bg-green-800',
                  )}
                  onClick={() => selectEducation(mode)}
                >
                  <span>{index + 1}. {mode.title}</span>
                  <small className={'text-left text-xs leading-relaxed text-gray-300 sm:max-w-[250px] sm:text-right sm:text-sm'}>
                    ({mode.date} / {mode.gameDescription ?? mode.description})
                  </small>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
