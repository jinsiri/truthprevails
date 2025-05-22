'use client';

import Link from 'next/link';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import { usePathname } from 'next/navigation';

export function GlobalNavigation() {
  const pathname = usePathname();
  const navItems = [
    { href: '/classic', label: 'Home' },
    { href: '/classic/about', label: 'About' },
    { href: '/classic/skills', label: 'Skills' },
    { href: '/classic/career', label: 'Career' },
    { href: '/classic/education', label: 'Education' },
    { href: '/classic/contact', label: 'Contact' },
  ];

  return (
    <nav className={'fixed top-5 left-1/2 z-50 flex w-full -translate-x-1/2 justify-between px-8 font-sans text-xl'}>
      <ul className={'flex gap-8'}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link href={item.href} className={`transition-color duration-300 ${isActive ? 'text-amber-900' : 'text-black hover:text-amber-900'}`}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <ThemeToggleButton />
    </nav>
  );
}
