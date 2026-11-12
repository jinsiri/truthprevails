'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import clsx from 'clsx';
import { navItems } from '@/constants/navItems';

export default function ClassicHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-40 border-b border-(--ink) bg-(--paper)'>
      <div className='mx-auto flex h-14 max-w-[1120px] items-center justify-between pr-16 pl-5 md:pl-8 lg:pr-20'>
        <Link href='/classic' className='font-editorial text-lg font-black tracking-tight md:text-xl'>
          JINSIL KWON<span className='text-(--accent)'>.</span>
        </Link>

        <nav className='hidden md:block'>
          <ul className='flex gap-7 text-[13px] tracking-[0.08em]'>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx('pb-0.5 uppercase', pathname === item.href ? 'border-b-2 border-(--accent) font-bold' : 'text-(--muted) hover:text-(--ink)')}
                >
                  {item.label}
                </Link>
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
              {navItems.map((item, index) => (
                <li key={item.href} className='border-b border-(--ink)/20 last:border-b-0'>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={clsx('flex items-baseline gap-4 px-5 py-4', pathname === item.href && 'font-bold')}
                  >
                    <span className='font-editorial text-sm text-(--accent)'>{String(index).padStart(2, '0')}</span>
                    <span className='text-lg uppercase'>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}
