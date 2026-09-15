'use client';

import Link from 'next/link';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useKeyboardList } from '@/hooks/useKeyboardList';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import ThemedImage from '@/components/ThemedImage';
import { RightArrow } from 'next/dist/client/components/react-dev-overlay/ui/icons/right-arrow';
import { IMAGE_ROOT } from '@/constants/imageSrc';

interface Mode {
  korNm: string;
  address: string;
  enNm: string;
  description: string;
  detail: string;
  image: string;
  previewImage: { day: string; night: string };
}

const MODES: Mode[] = [
  {
    korNm: '클래식 모드',
    address: '/classic',
    enNm: 'CLASSIC',
    description: '정보 위주로 빠르게 알아보기',
    detail: '소개 · 경력 · 스킬 · 학습 기록',
    image: '/images/classic/about.webp',
    previewImage: {
      day: `${IMAGE_ROOT}/images/preview_classic_day.png`,
      night: `${IMAGE_ROOT}/images/preview_classic_night.png?v=2`,
    },
  },
  {
    korNm: '게임 모드',
    address: '/game',
    enNm: 'GAME',
    description: '직접 탐험하며 인터랙티브 모험해보기',
    detail: '탐험 · 퀘스트 · 스킬 · 방명록',
    image: '/images/game/school.webp',
    previewImage: {
      day: `${IMAGE_ROOT}/images/preview_game_day.png`,
      night: `${IMAGE_ROOT}/images/preview_game_night.png`,
    },
  },
];

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { vIdx, handleKeyDown, setVIdx } = useKeyboardList({
    vItems: MODES,
    onSelectV: (mode) => router.push(mode.address),
  });

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <main className={'main-home relative flex min-h-screen flex-col items-center justify-center px-4 pt-10 pb-10'}>
      <div className={'absolute inset-0 bg-black/45 backdrop-blur-sm'}></div>
      <div
        className={
          'relative grid w-full max-w-5xl items-center gap-8 rounded-3xl border border-white/20 bg-black/25 p-6 text-white shadow-2xl backdrop-blur-sm md:grid-cols-[minmax(260px,0.85fr)_minmax(360px,1.15fr)] md:gap-12 md:p-10'
        }
      >
        <div className={'text-center md:text-left'}>
          <p className={'mb-3 font-sans text-sm tracking-[0.28em] text-white/75 uppercase'}>PORTFOLIO / 2026</p>
          <h2 className={'mb-3 font-sans text-xl leading-tight break-keep md:text-2xl lg:text-3xl'}>
            WELCOME TO
            <br /> THE TRUTH WORLD
          </h2>
          <p className={'mb-8 border-t border-white/20 pt-3 font-sans text-lg text-white/85 md:text-xl'}>반갑습니다. 어디로 안내해드릴까요?</p>
          <div
            ref={containerRef}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            className={'mode-btns mx-auto max-w-[500px] space-y-2 outline-none md:mx-0'}
            aria-label='모드 선택'
          >
            {MODES.map((mode, index) => (
              <Link
                key={mode.address}
                data-keyboard-v={index}
                onFocus={() => setVIdx(index)}
                onMouseEnter={() => setVIdx(index)}
                className={clsx(
                  'group flex items-center gap-4 rounded-xl border border-white/25 bg-black/20 p-3 pr-4 text-left transition duration-300 hover:bg-white/20 md:p-4',
                  vIdx === index && 'border-white/80 bg-white/20 shadow-lg shadow-black/20',
                )}
                href={mode.address}
              >
                <span className={'relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-white/30 bg-black/20'}>
                  <Image src={mode.image} alt='' fill sizes='80px' className='object-cover transition duration-500' />
                </span>
                <span className='min-w-0 flex-1'>
                  <span className='block text-lg md:text-xl'>{mode.korNm}</span>
                  <span className='block text-xs tracking-wider text-white/60 uppercase'>{mode.enNm}</span>
                </span>
                <span className={clsx('text-xs transition-opacity', vIdx === index ? 'opacity-100' : 'opacity-0')}>Enter</span>
              </Link>
            ))}
          </div>
        </div>

        <div className={'w-full'} aria-live='polite'>
          <div className={'overflow-hidden rounded-2xl border border-white/40 bg-black/35 shadow-2xl backdrop-blur-sm'}>
            <div className='relative aspect-[3024/1644] overflow-hidden bg-black/20'>
              <ThemedImage
                lightSrc={MODES[vIdx].previewImage.day}
                darkSrc={MODES[vIdx].previewImage.night}
                alt={`${MODES[vIdx].korNm} 진입 화면 미리보기`}
                fill
                sizes='(max-width: 768px) 100vw, 55vw'
                className='object-cover object-top transition-opacity duration-300'
                pixelated={false}
              />
            </div>
            <div className='grid gap-1 p-5 md:p-6'>
              <p className='text-base text-white/90 md:text-lg'>{MODES[vIdx].description}</p>
              <p className='text-sm text-white/55'>{MODES[vIdx].detail}</p>
              <Link
                href={MODES[vIdx].address}
                className='mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/50 px-4 py-2 text-sm transition-colors hover:bg-white/20'
              >
                이 모드로 들어가기{' '}
                <span aria-hidden>
                  <RightArrow />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <footer className={'fixed bottom-0 z-50 py-3 text-sm text-white/50'}>© 2026. Jinsil Kwon all rights reserved.</footer>
      <ThemeToggleButton />
    </main>
  );
}
