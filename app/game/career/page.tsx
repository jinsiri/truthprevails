'use client';

import ThemedImage from '@/components/ThemedImage';
import SpeechBubble from '@/components/game/SpeechBubble';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useKeyboardList } from '@/hooks/useKeyboardList';

interface Mode {
  companyNm: string;
}

const MODES: Mode[] = [{ companyNm: '시스원' }, { companyNm: '프리랜서' }, { companyNm: '미르나인' }];

export default function GameCareer() {
  const containerRef = useRef<HTMLUListElement>(null);
  const { selectedIndex, handleKeyDown, setSelectedIndex } = useKeyboardList({
    items: MODES,
    onSelect: () => {},
  });

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <main className='relative min-h-screen w-full overflow-hidden'>
      <ThemedImage
        className={'absolute right-0 bottom-0 -z-10 object-cover'}
        lightSrc={`/images/game/company_day_v3.png`}
        darkSrc={`/images/game/company_night_v3.png`}
        alt={'educated list'}
        priority
        fill={true}
      />

      <section className='relative z-10 min-h-screen w-full p-8'>
        <div className='group absolute right-1/4 -bottom-15 z-10'>
          <ThemedImage
            lightSrc={`/images/game/company_jinsil_day.png`}
            darkSrc={`/images/game/company_jinsil_night.png`}
            width={300}
            height={800}
            alt={'jinsil'}
          />
          <SpeechBubble text={'이런 일을 했습니다!'} />
        </div>

        <div className={'absolute bottom-30 left-1/4 w-[46%]'}>
          <div className='block h-[380px] w-full rounded-lg border-8 border-gray-400 bg-white p-4 md:p-8'>
            <h2 className={'mb-4 text-2xl md:mb-6 md:text-4xl'}>경력사항</h2>
            <ul
              ref={containerRef}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              className={'mode-btns flex max-w-[70%] cursor-pointer flex-col gap-x-6 gap-y-2 text-xl outline-none md:text-2xl'}
            >
              {MODES.map((mode, index) => (
                <li
                  key={mode.companyNm}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={clsx('flex items-center justify-between px-4 py-2 hover:text-blue-900', selectedIndex === index && 'active bg-gray-200')}
                >
                  {mode.companyNm}
                  {selectedIndex === index && <span>Enter</span>}
                </li>
              ))}
            </ul>
          </div>
          <canvas className={'absolute left-[5%] block h-full w-[30px] border-l-6 border-gray-800 bg-gradient-to-r from-gray-800 to-gray-400'} />
          <canvas className={'absolute right-[5%] block h-full w-[30px] border-l-6 border-gray-800 bg-gradient-to-r from-gray-800 to-gray-400'} />
        </div>
      </section>
    </main>
  );
}
