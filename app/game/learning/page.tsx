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
import { motion } from 'framer-motion';

const IMAGES = ['/images/game/study_01.webp', '/images/game/study_02.webp', '/images/game/study_03.webp'];

export function CharacterAnimation({ skillSet, textColor }: { skillSet: string[]; textColor?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalTime = 500;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className='group absolute -bottom-15 left-1/2 z-10 hidden -translate-x-1/2 md:block'
    >
      <div className='relative h-[425px] w-[300px]'>
        <div className='absolute -top-24 left-1/2 flex w-full -translate-x-1/2 flex-col items-center'>
          {skillSet.map((skill, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [10 + i * 25, -10 + i * 25, -20 + i * 25],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                times: [0, 0.1, 0.8, 1],
              }}
              className={clsx(textColor || 'text-yellow-300', 'absolute text-lg font-bold whitespace-nowrap drop-shadow-[0_2px_0_rgba(0,0,0,1)]')}
            >
              {`+10% ${skill}`}
            </motion.span>
          ))}
        </div>

        {IMAGES.map((src, i) => (
          <Image key={src} src={src} alt='jinsil' width={300} height={425} priority className={`${i === index ? 'block' : 'hidden'} object-contain`} />
        ))}
      </div>
    </motion.div>
  );
}

export default function GameLearning() {
  const countRef = useRef(false);
  const containerRef = useRef<HTMLOListElement>(null);
  const [hide, setHide] = useState(false);
  const [skillSet, setSkillSet] = useState(['지식']);
  const incrementProgress = useQuestStore((state) => state.incrementProgress);
  const { vIdx, handleKeyDown, setVIdx } = useKeyboardList({
    vItems: EDUCATION,
    onSelectV: () => {
      // setActive(true);
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
          <CharacterAnimation skillSet={skillSet} />
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
                  onClick={() => setSkillSet(mode.skillSet)}
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
