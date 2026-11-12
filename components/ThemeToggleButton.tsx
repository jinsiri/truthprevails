'use client';

import { MouseEvent, useEffect, useState } from 'react';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import clsx from 'clsx';

export default function ThemeToggleButton({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(darkMode);

    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', darkMode);
  }, []);

  const toggleTheme = (e: MouseEvent<HTMLButtonElement>) => {
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);

    document.documentElement.dataset.theme = newTheme;
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    e.currentTarget.blur();

    setIsDark(!isDark);
  };

  return (
    <button
      onClick={(e) => toggleTheme(e)}
      className={clsx(
        'z-50 inline-flex cursor-pointer items-center justify-center p-2 transition',
        className ?? 'text-background hover:bg-elevated fixed top-[24] right-4 rounded-full bg-amber-200 md:right-6 lg:top-[14] dark:bg-amber-500',
      )}
      aria-label='Toggle dark mode'
    >
      {isDark ? <IconSun stroke={2} /> : <IconMoonStars stroke={2} />}
    </button>
  );
}
