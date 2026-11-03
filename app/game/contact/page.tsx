'use client';

import GameDialog from '@/components/game/GameDialog';
import ThemedImage from '@/components/ThemedImage';
import Image from 'next/image';
import FadeInImage from '@/components/FadeInImage';
import { useUIStore } from '@/store/useUIStore';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useKeyboardList } from '@/hooks/useKeyboardList';
import Link from 'next/link';
import SpeechBubble from '@/components/game/SpeechBubble';
import useQuestStore from '@/store/useQuestStore';
import { X } from 'lucide-react';
import { IMAGE_ROOT } from '@/constants/imageSrc';
import { useIsMobile } from '@/hooks/useIsMobile';

import { CONTACT, CONTACT_LINKS } from '@/features/portfolio/contact';

export default function GameContact() {
  const countRef = useRef(false);
  const focusingRef = useRef<HTMLButtonElement>(null);
  const { activeView, openView, closeView } = useUIStore();
  const incrementProgress = useQuestStore((state) => state.incrementProgress);
  const { vIdx, handleKeyDown, setVIdx } = useKeyboardList({
    vItems: CONTACT_LINKS,
    onSelectV: (mode) => window.open(mode.address, '_blank', 'noopener,noreferrer'),
  });
  const [activeJin, setActiveJin] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    focusingRef.current?.focus();
  }, []);

  useEffect(() => {
    if (countRef.current) return;
    incrementProgress(4);
    countRef.current = true;
  }, [incrementProgress]);

  return (
    <main className='relative min-h-dvh w-full overflow-hidden'>
      <ThemedImage
        className={'absolute right-0 bottom-0 -z-10 object-cover'}
        lightSrc={`${IMAGE_ROOT}/images/game/info_day_v2.jpg`}
        darkSrc={`${IMAGE_ROOT}/images/game/info_night_v2.jpg`}
        alt={'인포센터 배경'}
        priority
        sizes='100vw'
        fill={true}
      />

      <section className='relative z-10 h-dvh w-full overflow-hidden p-8'>
        <button
          ref={focusingRef}
          className='group absolute top-[45%] right-[30%] cursor-pointer p-6 focus:outline-none'
          onClick={() => setActiveJin(!activeJin)}
        >
          <span
            className={`absolute inset-0 top-1/2 left-1/2 hidden -translate-1/2 overflow-hidden rounded-full bg-gradient-to-r from-yellow-300/60 via-orange-400/40 to-white/40 opacity-0 blur-md transition-all duration-500 group-focus:scale-200 group-focus:opacity-100 md:block dark:from-blue-500/50 dark:via-purple-500/50 dark:to-pink-500/50`}
          ></span>
          {activeJin ? (
            <div className={'relative'}>
              <FadeInImage width={200} height={600} src={`${IMAGE_ROOT}/images/game/jinsil_standing.png`} alt={'진실 앞모습'} />
              <SpeechBubble text={`반갑습니다! ${isMobile ? '' : '탭키 또는 마우스로 '}아래 책을 눌러 깃허브/기술 블로그에 방문해주세요!`} />
            </div>
          ) : (
            <>
              <FadeInImage className={'relative'} width={200} height={600} src={`${IMAGE_ROOT}/images/game/jinsil_back.webp`} alt={'진실 뒷모습'} />
              <div className='absolute -top-4 left-1/2 flex -translate-x-1/2 flex-col items-center'>
                <div className='animate-bounce rounded border-2 border-black bg-white px-2 py-1 text-xs font-bold whitespace-nowrap'>
                  <span className='text-black'>{isMobile ? '[터치]' : '[Enter or 클릭]'}</span>
                </div>
              </div>
            </>
          )}
        </button>

        <div
          className={clsx(
            'fixed transition-all duration-700 ease-in-out',
            'aspect-[750/408]',
            'xl:right-[18%] xl:-bottom-20 xl:w-[700px] xl:translate-x-0 xl:scale-100',
            'right-1/2 -bottom-15 w-[650px] translate-x-1/2',
          )}
        >
          <FadeInImage fill sizes='700px' src={`${IMAGE_ROOT}/images/game/info_table.png`} priority alt={'탁자'} />
          <button
            className='group animate-stardust-float absolute top-0 left-1/2 aspect-[750/408] -translate-x-1/2 scale-60 cursor-pointer transition-all focus:outline-none'
            onClick={(event) => {
              event.currentTarget.focus();
              openView('contact');
            }}
          >
            <span
              className={`absolute inset-0 top-1/2 left-1/2 hidden -translate-1/2 overflow-hidden rounded-full bg-gradient-to-r from-yellow-300/60 via-orange-400/40 to-white/40 opacity-0 blur-md transition-all duration-500 group-focus:scale-200 group-focus:opacity-100 md:block dark:from-blue-500/50 dark:via-purple-500/50 dark:to-pink-500/50`}
            ></span>
            <FadeInImage className={'relative'} src={`${IMAGE_ROOT}/images/game/book.png`} width={300} height={300} alt={'연락 수첩'} />
            <Image
              src={`${IMAGE_ROOT}/images/game/stardust.png`}
              width={300}
              height={300}
              className='animate-stardust-fade absolute -inset-10 object-contain transition-all'
              alt='반짝이 가루'
            />
          </button>
        </div>

        {activeView === 'contact' && (
          <GameDialog
            label='연락 수첩'
            onClose={closeView}
            className={clsx(
              // 모바일: 우측 고정 버튼(~255px) 아래 ~ 뒤로가기 버튼 위 영역에 배치
              'absolute top-[17rem] bottom-24 left-1/2 w-[90%] max-w-[100vh] -translate-x-1/2 md:top-1/2 md:bottom-auto md:h-[70vh] md:-translate-y-1/2',
              'border-4 border-[#3e2723] bg-[#5d4037] p-2 font-mono shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]',
            )}
          >
            <div className='relative flex h-full flex-col overflow-y-auto border-2 border-[#d7ccc8] bg-[#fff9eb] md:min-h-[400px] md:flex-row'>
              <div className='absolute top-0 bottom-0 left-1/2 hidden w-px bg-[#d7ccc8] shadow-[0_0_10px_rgba(0,0,0,0.1)] md:block'></div>

              <button
                className={'absolute top-0 right-0 z-10 inline-flex h-12 w-12 cursor-pointer items-center justify-center text-[#5d4037] hover:text-[#3e2723]'}
                aria-label='닫기'
                onClick={closeView}
              >
                <X />
              </button>

              <div className='mode-btns type-b flex flex-1 flex-col items-center justify-center space-y-4 p-8 outline-none' onKeyDown={handleKeyDown}>
                <h3 className='mb-4 border-b-2 border-dashed border-[#d7ccc8] pb-2 text-center text-xl font-bold text-[#5d4037] md:text-3xl'>CONTACT BOOK</h3>
                {CONTACT_LINKS.map((mode, index) => (
                  <Link
                    key={mode.address}
                    data-dialog-initial-focus={mode.address === `mailto:${CONTACT.email}` ? '' : undefined}
                    data-keyboard-v={index}
                    onFocus={() => setVIdx(index)}
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

              <div className='hidden flex-1 flex-col items-center justify-center bg-[#fdf5e6] p-8 md:flex'>
                <div className='mb-4 text-center text-sm text-[#8d6e63] italic md:text-lg'>Scan to Contact Me!</div>

                <div className='flex h-40 w-40 items-center justify-center border-4 border-[#8d6e63] bg-white p-2 shadow-[4px_4px_0px_0px_rgba(141,110,99,0.3)]'>
                  <div className='flex h-full w-full items-center justify-center bg-[#3e2723] text-center text-[10px]'>
                    <FadeInImage src={`${IMAGE_ROOT}/images/classic/contact_qr.png`} alt={CONTACT.email} width={250} height={250} />
                  </div>
                </div>

                <p className='mt-6 text-center text-xs leading-relaxed text-[#a1887f] md:text-lg'>
                  Leave a mark in <br /> &quot;TRUTH WORLD&quot;
                </p>
              </div>
            </div>

            <div className='absolute -top-6 left-12 h-12 w-[3%] border-2 border-blue-900 bg-blue-700 shadow-md'></div>
          </GameDialog>
        )}
      </section>
    </main>
  );
}
