import Link from 'next/link';
import ClassicHeader from '@/components/classic/ClassicHeader';
import ThemeToggleButton from '@/components/ThemeToggleButton';

const FONT_STYLESHEET = 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&family=Noto+Serif+KR:wght@400;700;900&display=swap';

export default function ClassicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='classic flex min-h-dvh flex-col'>
      <link rel='stylesheet' href={FONT_STYLESHEET} precedence='default' />
      <ClassicHeader />
      <ThemeToggleButton className='top-2 right-4 border border-(--ink) bg-(--paper) text-(--ink) hover:text-(--accent) md:right-6' />
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
