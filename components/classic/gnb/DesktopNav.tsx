'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/constants/navItems';

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className={'fixed top-5 left-1/2 z-50 hidden w-full -translate-x-1/2 justify-between px-8 font-sans text-xl lg:flex'}>
      <ul className={'flex gap-8'}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link href={item.href} className={`transition-color duration-300 ${isActive ? 'text-amber-900' : 'text-gray-900 hover:text-amber-900'}`}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
