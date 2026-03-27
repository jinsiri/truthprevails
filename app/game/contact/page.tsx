'use client';

import ThemedImage from '@/components/ThemedImage';
import Image from 'next/image';
import { useUIStore } from '@/store/useUIStore';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useKeyboardList } from '@/hooks/useKeyboardList';
import Link from 'next/link';
import SpeechBubble from '@/components/game/SpeechBubble';

interface Mode {
  title: string;
  address: string;
}

const MODES: Mode[] = [
  {
    title: 'GITHUB',
    address: 'https://github.com/jinsiri',
  },
  {
    title: 'TECH BLOG',
    address: 'https://today-i-played.tistory.com/',
  },
];
export default function GameContact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeView, openView } = useUIStore();
  const { vIdx, handleKeyDown, setVIdx } = useKeyboardList({
    vItems: MODES,
    onSelectV: (mode) => window.open(mode.address, '_blank', 'noopener,noreferrer'),
  });
  const [activeJin, setActiveJin] = useState(false);

  useEffect(() => {
    containerRef.current?.focus();
  }, [activeView]);

  return (
    <main className='relative min-h-screen w-full overflow-hidden'>
      <ThemedImage
        className={'absolute right-0 bottom-0 -z-10 object-cover'}
        lightSrc={`/images/game/info_day_v2.jpg`}
        darkSrc={`/images/game/info_night_v2.jpg`}
        alt={'인포센터 배경'}
        priority
        fill={true}
      />

      <section className='relative z-10 min-h-screen w-full p-8'>
        <button className='group absolute top-[45%] right-[30%] cursor-pointer p-6 focus:outline-none' onClick={() => setActiveJin(!activeJin)}>
          <span
            className={`absolute inset-0 top-1/2 left-1/2 hidden -translate-1/2 overflow-hidden rounded-full bg-gradient-to-r from-yellow-300/60 via-orange-400/40 to-white/40 opacity-0 blur-md transition-all duration-500 group-focus:scale-200 group-focus:opacity-100 md:block dark:from-blue-500/50 dark:via-purple-500/50 dark:to-pink-500/50`}
          ></span>
          {activeJin ? (
            <div className={'relative'}>
              <Image width={200} height={600} src={'/images/game/jinsil_standing.png'} alt={'진실 앞모습'} />
              <SpeechBubble text={'반갑습니다! 아래 방명록을 눌러 깃허브/기술로그에 방문해주세요!'} />
            </div>
          ) : (
            <Image className={'relative'} width={200} height={600} src={'/images/game/jinsil_back.webp'} alt={'진실 뒷모습'} />
          )}
        </button>

        <div
          className={clsx(
            'absolute transition-all duration-700 ease-in-out',
            'aspect-[750/408]',
            'xl:right-[18%] xl:-bottom-20 xl:w-[700px] xl:translate-x-0 xl:scale-100',
            'right-1/2 -bottom-15 w-[650px] translate-x-1/2',
          )}
        >
          <Image fill src={'/images/game/info_table.png'} alt={'탁자'} />
          <button
            className='group animate-stardust-float absolute top-0 left-1/2 aspect-[750/408] -translate-x-1/2 scale-60 cursor-pointer transition-all focus:outline-none'
            onClick={() => openView('contact')}
          >
            <span
              className={`absolute inset-0 top-1/2 left-1/2 hidden -translate-1/2 overflow-hidden rounded-full bg-gradient-to-r from-yellow-300/60 via-orange-400/40 to-white/40 opacity-0 blur-md transition-all duration-500 group-focus:scale-200 group-focus:opacity-100 md:block dark:from-blue-500/50 dark:via-purple-500/50 dark:to-pink-500/50`}
            ></span>
            <Image className={'relative'} src={'/images/game/book.png'} width={300} height={300} alt={'방명록'} />
            <Image
              src='/images/game/stardust.png'
              width={300}
              height={300}
              className='animate-stardust-fade absolute -inset-10 object-contain transition-all'
              alt='반짝이 가루'
            />
          </button>
        </div>

        <div
          className={clsx(
            'absolute top-1/2 left-1/2 h-[70vh] w-[90%] max-w-[100vh] -translate-1/2 border-4 border-[#3e2723] bg-[#5d4037] p-2 font-mono shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]',
            activeView === 'contact' ? 'visible' : 'hidden',
          )}
        >
          <div className='relative flex h-full min-h-[400px] flex-col overflow-y-auto border-2 border-[#d7ccc8] bg-[#fff9eb] md:flex-row'>
            <div className='absolute top-0 bottom-0 left-1/2 hidden w-px bg-[#d7ccc8] shadow-[0_0_10px_rgba(0,0,0,0.1)] md:block'></div>

            <div
              className='mode-btns type-b flex flex-1 flex-col items-center justify-center space-y-4 p-8 outline-none'
              ref={containerRef}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              <h3 className='mb-4 border-b-2 border-dashed border-[#d7ccc8] pb-2 text-center text-xl font-bold text-[#5d4037] md:text-3xl'>VISITOR LOG</h3>
              {MODES.map((mode, index) => (
                <Link
                  key={mode.address}
                  onMouseEnter={() => setVIdx(index)}
                  className={clsx(
                    'w-full bg-[#8d6e63] px-4 py-3 text-center text-white shadow-[4px_4px_0px_0px_#5d4037] transition-all hover:translate-y-1 hover:shadow-none active:bg-[#5d4037]',
                    vIdx === index && 'active translate-y-1 shadow-none active:bg-[#5d4037]',
                  )}
                  href={mode.address}
                  target='_blank'
                >
                  {mode.title}
                </Link>
              ))}
            </div>

            <div className='flex flex-1 flex-col items-center justify-center bg-[#fdf5e6] p-8'>
              <div className='mb-4 text-center text-sm text-[#8d6e63] italic md:text-lg'>Scan to Contact Me!</div>

              <div className='flex h-40 w-40 items-center justify-center border-4 border-[#8d6e63] bg-white p-2 shadow-[4px_4px_0px_0px_rgba(141,110,99,0.3)]'>
                <div className='flex h-full w-full items-center justify-center bg-[#3e2723] text-center text-[10px]'>
                  <Image src={`/images/classic/contact_qr.png`} alt={'developer.js.corn@gmail.com'} width={250} height={250} />
                </div>
              </div>

              <p className='mt-6 text-center text-xs leading-relaxed text-[#a1887f] md:text-lg'>
                Leave a mark in <br /> &quot;TRUTH WORLD&quot;
              </p>
            </div>
          </div>

          <div className='absolute -top-6 right-12 h-12 w-[3%] border-2 border-red-900 bg-red-700 shadow-md'></div>
        </div>
      </section>
    </main>
  );
}
