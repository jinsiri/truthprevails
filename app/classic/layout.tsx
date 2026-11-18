import Link from 'next/link';
import clsx from 'clsx';
import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google';
import ClassicHeader from '@/components/classic/ClassicHeader';
import ThemeToggleButton from '@/components/ThemeToggleButton';

const notoSans = Noto_Sans_KR({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-sans-kr' });
const notoSerif = Noto_Serif_KR({ weight: ['400', '700', '900'], subsets: ['latin'], variable: '--font-serif-kr' });

export default function ClassicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={clsx('classic flex min-h-dvh flex-col', notoSans.variable, notoSerif.variable)}>
      <ClassicHeader />
      <ThemeToggleButton className='fixed top-2 right-4 rounded-full border border-(--ink) bg-(--paper) text-(--ink) hover:text-(--accent) md:right-6' />
      <main className='mx-auto w-full max-w-[1120px] flex-1 px-5 pb-16 md:px-8 md:pb-20'>{children}</main>
      <footer className='border-t border-(--ink)'>
        <div className='mx-auto flex max-w-[1120px] justify-between px-5 py-4 text-xs tracking-[0.06em] text-(--muted) md:px-8'>
          <span>© 2026 Jinsil Kwon</span>
          <Link href='/game' className='hover:text-(--ink)'>
            Change mode →
          </Link>
        </div>
      </footer>
    </div>
  );
}
