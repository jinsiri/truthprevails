import ThemeToggleButton from '@/components/ThemeToggleButton';

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={'game w-full'}>
      <ThemeToggleButton />
      {children}
    </main>
  );
}
