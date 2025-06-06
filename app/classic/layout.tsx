import DesktopNav from '@/components/classic/gnb/DesktopNav';
import MobileNav from '@/components/classic/gnb/MobileNav';
import ThemeToggleButton from '@/components/ThemeToggleButton';

export default function ClassicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={'classic w-full font-sans'}>
      <DesktopNav />
      <MobileNav />
      <ThemeToggleButton />
      {children}
    </main>
  );
}
