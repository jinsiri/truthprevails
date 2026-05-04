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

export default function GameLearning() {
  const countRef = useRef(false);
  const containerRef = useRef<HTMLOListElement>(null);
  const [hide, setHide] = useState(false);
  const [skillSet, setSkillSet] = useState(['지식']);
  const [textColor, setTextColor] = useState('yellow');
  const incrementProgress = useQuestStore((state) => state.incrementProgress);
  const { vIdx, handleKeyDown, setVIdx } = useKeyboardList({
    vItems: EDUCATION,
    onSelectV: (mode) => {
      setHide(true);
      setSkillSet(mode.skillSet);
    },
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
        lightSrc={`/images/game/school_day.png`}
        darkSrc={`/images/game/school_night.png`}
        alt={'educated list'}
        priority
        fill={true}
      />

      <section className='relative z-10 min-h-screen w-full p-8'>
        {hide ? (
          <CharacterAnimation skillSet={skillSet} textColor={textColor} />
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
              <li key={`EDU_${index}`} onMouseEnter={() => setVIdx(index)} onClick={() => setHide(true)} className={'mb-2'}>
                <button
                  className={clsx(
                    'flex w-full cursor-pointer items-center justify-between rounded-md border-2 p-4 transition-all hover:bg-green-800',
                    vIdx === index && 'bg-green-800',
                  )}
                  onClick={() => {
                    setSkillSet(mode.skillSet);
                    setTextColor(mode.color);
                  }}
                >
                  {index + 1}. {mode.title}
                  <small className={'text-gray-400'}>
                    ({mode.date} / {mode.description})
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
