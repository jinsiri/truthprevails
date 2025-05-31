import DesktopNav from '@/components/classic/gnb/DesktopNav';
import MobileNav from '@/components/classic/gnb/MobileNav';

export default function ClassicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={'classic w-full font-sans'}>
      <DesktopNav />
      <MobileNav />
      {children}
    </main>
  );
}
