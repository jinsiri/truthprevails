import { GlobalNavigation } from '@/components/classic/GlobalNavigation';

export default function ClassicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={'classic w-full font-sans'}>
      <GlobalNavigation />
      {children}
    </main>
  );
}
