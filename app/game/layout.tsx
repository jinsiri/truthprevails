import ThemeToggleButton from '@/components/ThemeToggleButton';
import GlobalKeyHandler from '@/components/game/GlobalKeyHandler';

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
      <div className='text-md fixed right-4 bottom-4 z-50 rounded-lg border-4 border-black bg-gray-100 px-4 py-1 font-semibold text-gray-950'>
        [ESC] 뒤로가기
      </div>
    </main>
  );
}
