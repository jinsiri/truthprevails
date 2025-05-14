'use client';

import { useEffect, useState } from 'react';
import { IconMoonStars, IconSun } from '@tabler/icons-react';

export default function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const darkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setIsDark(darkMode);
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    document.documentElement.dataset.theme = newTheme;
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className='text-background hover:bg-elevated inline-flex cursor-pointer items-center justify-center rounded-full bg-amber-50 p-2 transition'
      aria-label='Toggle dark mode'
    >
      {isDark ? <IconSun stroke={2} /> : <IconMoonStars stroke={2} />}
    </button>
  );
}
