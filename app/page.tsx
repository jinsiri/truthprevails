'use client';

import Link from 'next/link';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useKeyboardList } from '@/hooks/useKeyboardList';
import { useEffect, useRef } from 'react';

type Mode = 'game' | 'classic';
const MODES: Mode[] = ['game', 'classic'];

export default function Home() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedIndex, handleKeyDown, setSelectedIndex } = useKeyboardList({
    items: MODES,
    onSelect: (mode) => router.push(`/${mode}`),
  });

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <main className={'main-home relative flex min-h-screen flex-col items-center justify-center bg-amber-50 px-4 pt-10 pb-2.5'}>
      <div className={'absolute top-0 right-0 bottom-0 left-0 bg-black/40'}></div>
      <div className={'relative mb-10 space-y-2 p-4 text-center text-white md:w-auto md:space-y-0 md:space-x-2 md:px-10 md:py-[3.75rem]'}>
        <h2 className={'mb-2 font-sans text-4xl break-keep md:mb-4 md:text-5xl lg:text-[4.75rem]'}>진실의 세계: 환영합니다!</h2>
        <p className={'mb-10 inline-block border-t-2 pt-2 font-sans text-xl md:pt-4 md:text-2xl lg:text-4xl'}>Welcome to the World of Truth!</p>
        <div ref={containerRef} onKeyDown={handleKeyDown} tabIndex={0} className={'mode-btns m-auto max-w-[500px] outline-none'}>
          {MODES.map((mode, index) => (
            <Link
              key={mode}
              onMouseEnter={() => setSelectedIndex(index)}
              className={clsx(
                'mt-2 flex items-center justify-between pr-2 pl-8 text-xl hover:bg-white/20 md:text-2xl',
                selectedIndex === index && 'active bg-white/20',
              )}
              href={`/${mode}`}
            >
              {mode}
              {selectedIndex === index && <span>Enter</span>}
            </Link>
          ))}
        </div>
      </div>
      <footer className={'fixed bottom-0 z-50 py-3 text-sm text-black'}>© 2026. Jinsil Kwon all rights reserved.</footer>
      <ThemeToggleButton />
    </main>
  );
}
