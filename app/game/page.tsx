'use client';

import { useSearchParams } from 'next/navigation';
import GameMainClient from './GameMainClient';

export default function GamePage() {
  const searchParams = useSearchParams();
  const viewport = searchParams.get('viewport') ?? 'desktop';

  return <GameMainClient isMobile={viewport !== 'desktop'} />;
}
