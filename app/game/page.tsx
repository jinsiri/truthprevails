'use client';

import GameMainClient from './GameMainClient';
import { Suspense } from 'react';

export default function GamePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GameMainClient />
    </Suspense>
  );
}
