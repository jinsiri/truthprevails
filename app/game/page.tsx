export const dynamic = 'force-dynamic';

import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import GameMainClient from './GameMainClient';

export default async function GameMain() {
  const headersList = await headers();
  const ua = userAgent({ headers: headersList });

  const isMobile = ua.device.type === 'mobile';

  return <GameMainClient isMobile={isMobile} />;
}
