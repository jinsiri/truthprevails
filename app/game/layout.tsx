import ThemeToggleButton from '@/components/ThemeToggleButton';
import GlobalKeyHandler from '@/components/game/GlobalKeyHandler';
import BackButton from '@/components/game/BackButton';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/game/LoadingSpinner';

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='game w-full'>
      <GlobalKeyHandler />
      <ThemeToggleButton />
      {children}
      <Suspense fallback={<LoadingSpinner />}>
        <BackButton />
      </Suspense>
    </main>
  );
}
