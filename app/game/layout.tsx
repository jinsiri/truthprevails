import ThemeToggleButton from '@/components/ThemeToggleButton';
import GlobalKeyHandler from '@/components/game/GlobalKeyHandler';
import BackButton from '@/components/game/BackButton';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/game/LoadingSpinner';
import { CharacterStatus, MasteredSkills } from '@/components/game/GameWindowComp';
import { UserQuestLog } from '@/components/game/QuestLog';
import Inventory from '@/components/game/Inventory';
import Heart from '@/components/game/Heart';
import { ButtonGroup } from '@/components/game/ButtonGroup';

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='game w-full'>
      <GlobalKeyHandler />
      <Heart />
      <ThemeToggleButton />
      <ButtonGroup positionClass={'top-18 right-4 md:right-6'}>
        <CharacterStatus />
        <MasteredSkills />
        <Inventory />
        <UserQuestLog />
      </ButtonGroup>
      {children}
      <Suspense fallback={<LoadingSpinner />}>
        <BackButton />
      </Suspense>

      {/*{isGuideOn && (*/}
      {/*<div className='pointer-events-none fixed inset-0 z-[100] bg-black/60' style={{ clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)' }}></div>*/}
      {/*)}*/}
    </main>
  );
}
