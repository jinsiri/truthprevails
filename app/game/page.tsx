import GameMainClient from './GameMainClient';

export default function GameMain({ searchParams }: { searchParams: { viewport?: string } }) {
  const viewport = searchParams.viewport || 'desktop';
  const isMobile = viewport === 'mobile';

  return <GameMainClient isMobile={isMobile} />;
}
