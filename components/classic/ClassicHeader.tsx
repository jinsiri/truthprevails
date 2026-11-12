'use client';

import { MouseEvent, useEffect, useState } from 'react';
import clsx from 'clsx';
import { navItems } from '@/constants/navItems';

const SPY_OFFSET = 80;

export default function ClassicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const passed = navItems.filter(({ id }) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= SPY_OFFSET;
      });
      setActiveId(passed.at(-1)?.id ?? null);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', id === 'top' ? location.pathname : `#${id}`);
  };

  return (
    <header className='sticky top-0 z-40 border-b border-(--ink) bg-(--paper)'>
      <div className='mx-auto flex h-14 max-w-[1120px] items-center justify-between pr-16 pl-5 md:pl-8 lg:pr-20'>
        <a href='#top' onClick={(event) => scrollToSection(event, 'top')} className='font-editorial text-lg font-black tracking-tight md:text-xl'>
          JINSIL KWON<span className='text-(--accent)'>.</span>
        </a>

        <nav className='hidden md:block'>
          <ul className='flex gap-7 text-[13px] tracking-[0.08em]'>
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(event) => scrollToSection(event, id)}
                  className={clsx('pb-0.5 uppercase', activeId === id ? 'border-b-2 border-(--accent) font-bold' : 'text-(--muted) hover:text-(--ink)')}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type='button'
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className='cursor-pointer text-xs font-bold tracking-[0.16em] md:hidden'
        >
          {isMenuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {isMenuOpen && (
        <>
          <div aria-hidden onClick={() => setIsMenuOpen(false)} className='fixed inset-x-0 top-14 bottom-0 bg-black/30 md:hidden' />
          <nav className='absolute inset-x-0 top-full border-b border-(--ink) bg-(--paper) shadow-lg md:hidden'>
            <ul>
              {navItems.map(({ id, label }, index) => (
                <li key={id} className='border-b border-(--ink)/20 last:border-b-0'>
                  <a
                    href={`#${id}`}
                    onClick={(event) => scrollToSection(event, id)}
                    className={clsx('flex items-baseline gap-4 px-5 py-4', activeId === id && 'font-bold')}
                  >
                    <span className='font-editorial text-sm text-(--accent)'>{String(index + 1).padStart(2, '0')}</span>
                    <span className='text-lg uppercase'>{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}
