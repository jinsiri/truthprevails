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
      <div className='md:text-md fixed right-6 bottom-8 z-50 rounded-lg border-4 border-black bg-gray-100 px-4 text-base font-bold text-gray-950 md:right-8 md:py-1'>
        [ESC] 뒤로가기
      </div>
    </main>
  );
}
