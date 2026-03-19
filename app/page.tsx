'use client';

import Link from 'next/link';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [activeMode, setActiveMode] = useState('game');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowUp' || e.code === 'ArrowDown' || e.code === 'KeyW' || e.code === 'KeyS') {
        setActiveMode((prev) => (prev === 'game' ? 'classic' : 'game'));
      } else if (e.code === 'Enter') {
        router.push(activeMode === 'game' ? '/game' : '/classic');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMode, router]);
  return (
    <main className={'main-home relative flex min-h-screen flex-col items-center justify-center bg-amber-50 px-4 pt-10 pb-2.5'}>
      <div className={'absolute top-0 right-0 bottom-0 left-0 bg-black/40'}></div>
      <div className={'relative mb-10 space-y-2 p-4 text-center text-white md:w-auto md:space-y-0 md:space-x-2 md:px-10 md:py-[3.75rem]'}>
        <h2 className={'mb-2 font-sans text-3xl break-keep md:mb-4 md:text-5xl lg:text-[4.75rem]'}>진실의 세계: 환영합니다!</h2>
        <p className={'mb-10 inline-block border-t-2 pt-4 font-sans text-4xl'}>Welcome to the World of Truth!</p>
        <div className={'mode-btns m-auto max-w-[500px]'}>
          <Link
            className={clsx(
              'mt-2 flex items-center justify-between pr-2 pl-8 text-xl hover:bg-white/20 md:text-2xl',
              activeMode === 'game' && 'active bg-white/20',
            )}
            href='/game'
          >
            게임 모드
            {activeMode === 'game' && <span>Enter</span>}
          </Link>
          <Link
            className={clsx(
              'mt-2 flex items-center justify-between pr-2 pl-8 text-xl hover:bg-white/20 md:text-2xl',
              activeMode !== 'game' && 'active bg-white/20',
            )}
            href='/classic'
          >
            클래식 모드
            {activeMode !== 'game' && <span>Enter</span>}
          </Link>
        </div>
      </div>
      <footer className={'fixed bottom-0 z-50 py-3 text-sm text-black'}>© 2026. Jinsil Kwon all rights reserved.</footer>
      <ThemeToggleButton />
    </main>
  );
}
