'use client';

import Link from 'next/link';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import ThemedImage from '@/components/ThemedImage';
import { ArrowRight } from 'lucide-react';

import { MODES } from '@/features/site/modes';
import { CONTACT_LINKS } from '@/features/portfolio/contact';

export default function Home() {
  const router = useRouter();
  const tabListRef = useRef<HTMLDivElement>(null);
  const [vIdx, setVIdx] = useState(0);

  useEffect(() => {
    tabListRef.current?.focus();
  }, []);

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(event.key)) {
      event.preventDefault();
      const step = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;
      setVIdx((prev) => (prev + step + MODES.length) % MODES.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      router.push(MODES[vIdx].address);
    }
  };

  return (
    <main className={'main-home relative flex min-h-screen flex-col items-center justify-center px-4 pt-10 pb-10'}>
      <div className={'absolute inset-0 bg-black/45 backdrop-blur-sm'}></div>
      <div
        className={
          'wide:max-w-5xl wide:grid-cols-[minmax(260px,0.85fr)_minmax(360px,1.15fr)] wide:gap-12 wide:items-start relative grid w-full max-w-[560px] grid-cols-1 items-center gap-8 rounded-3xl border border-white/20 bg-black/25 p-6 text-white shadow-2xl backdrop-blur-sm md:max-w-[680px] md:p-10 lg:max-w-[760px]'
        }
      >
        <div className={'wide:flex wide:flex-col wide:self-stretch wide:text-left text-center'}>
          <p className={'mb-3 font-sans text-sm tracking-[0.28em] text-white/75 uppercase'}>PORTFOLIO / 2026</p>
          <h2 className={'mb-3 font-sans text-xl leading-tight break-keep md:text-2xl lg:text-3xl'}>
            WELCOME TO
            <br /> THE TRUTH WORLD
          </h2>
          <p className={'border-t border-white/20 pt-3 font-sans text-lg text-white/85 md:text-xl'}>반갑습니다. 어디로 안내해드릴까요?</p>
          <p className='wide:block mt-1 hidden text-sm leading-relaxed break-keep text-white/60'>
            이력을 두 가지 방식으로 둘러볼 수 있어요.
            <br />
            오른쪽 탭에서 모드를 골라 미리 보고 입장해 보세요.
          </p>
          <nav aria-label='바로가기' className='wide:block mt-auto hidden border-t border-white/20 pt-4'>
            <p className='mb-2 font-sans text-xs tracking-[0.28em] text-white/50 uppercase'>Quick Links</p>
            <ul className='flex flex-wrap gap-2'>
              {CONTACT_LINKS.map(({ title, address }) => (
                <li key={address}>
                  <a
                    href={address}
                    target={address.startsWith('mailto:') ? undefined : '_blank'}
                    rel='noreferrer'
                    className='inline-flex items-center gap-1 rounded-full border border-white/30 px-3 py-1 font-sans text-xs tracking-wider text-white/80 transition-colors hover:bg-white/15 hover:text-white'
                  >
                    {title}
                    <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={'w-full'}>
          <div ref={tabListRef} role='tablist' aria-label='모드 선택' tabIndex={0} onKeyDown={handleTabKeyDown} className='flex outline-none'>
            {MODES.map((mode, index) => (
              <button
                type='button'
                role='tab'
                key={mode.address}
                tabIndex={-1}
                aria-selected={vIdx === index}
                onClick={() => setVIdx(index)}
                className={clsx(
                  'cursor-pointer rounded-t-xl border px-5 text-base backdrop-blur-sm transition-colors md:px-6 md:text-lg',
                  vIdx === index
                    ? 'border-white/40 border-b-transparent bg-black/35 py-2.5 text-white'
                    : 'mt-1.5 border-white/15 border-b-white/40 bg-black/15 py-2 text-white/55',
                )}
              >
                {mode.korNm}
              </button>
            ))}
            <span aria-hidden className='wide:flex hidden flex-1 items-end justify-end border-b border-white/40 pb-1.5 text-xs text-white/45'>
              ← → 전환 · Enter 입장
            </span>
            <span aria-hidden className='wide:hidden flex-1 border-b border-white/40' />
          </div>
          <div
            aria-live='polite'
            className={'overflow-hidden rounded-2xl rounded-t-none border border-t-0 border-white/40 bg-black/35 shadow-2xl backdrop-blur-sm'}
          >
            <div className='px-4 pt-4 md:px-5 md:pt-5'>
              <div className='overflow-hidden rounded-lg border border-white/15 shadow-xl shadow-black/50'>
                <div className='flex items-center gap-3 bg-neutral-800 px-3 py-2'>
                  <span aria-hidden className='flex gap-1.5'>
                    <span className='h-2.5 w-2.5 rounded-full bg-[#ff5f57]' />
                    <span className='h-2.5 w-2.5 rounded-full bg-[#febc2e]' />
                    <span className='h-2.5 w-2.5 rounded-full bg-[#28c840]' />
                  </span>
                  <span className='flex-1 truncate rounded-md bg-neutral-900 px-2 py-0.5 text-center font-sans text-[11px] text-white/60 md:px-3'>
                    truthprevails.me{MODES[vIdx].address}
                  </span>
                  <span aria-hidden className='w-[42px] max-md:hidden' />
                </div>
                <div className='relative aspect-[3024/1644] overflow-hidden bg-black/20'>
                  <ThemedImage
                    key={MODES[vIdx].address}
                    lightSrc={MODES[vIdx].previewImage.day}
                    darkSrc={MODES[vIdx].previewImage.night}
                    alt={`${MODES[vIdx].korNm} 진입 화면 미리보기`}
                    fill
                    sizes='(min-width: 1024px) and (orientation: landscape) 55vw, (min-width: 768px) 760px, 100vw'
                    className='object-cover object-top transition-opacity duration-300'
                    pixelated={false}
                  />
                </div>
              </div>
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
                  <ArrowRight size={16} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <footer className={'relative mt-6 text-sm text-white/50'}>© 2026. Jinsil Kwon all rights reserved.</footer>
      <ThemeToggleButton />
    </main>
  );
}
