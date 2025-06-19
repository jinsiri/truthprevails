'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Heart() {
  const width = 36;
  const height = 28;
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark' || currentTheme === 'light') {
      setTheme(currentTheme);
    } else {
      setTheme('light');
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme');
          if (newTheme === 'dark' || newTheme === 'light') {
            setTheme(newTheme);
          }
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  if (!theme) return null;

  return (
    <div className={'absolute top-8 left-[2%] flex gap-3'}>
      <Image src={`/images/heart_full.webp`} alt='heart' width={width} height={height} />
      <Image src={`/images/heart_full.webp`} alt='heart' width={width} height={height} />
      <Image src={`/images/heart_full.webp`} alt='heart' width={width} height={height} />
      {theme === 'dark' ? (
        <>
          <Image src={`/images/heart_half.webp`} alt='heart' width={width} height={height} />
          <Image src={`/images/heart_zero.webp`} alt='heart' width={width} height={height} />
        </>
      ) : (
        <>
          <Image src={`/images/heart_full.webp`} alt='heart' width={width} height={height} />
          <Image src={`/images/heart_full.webp`} alt='heart' width={width} height={height} />
        </>
      )}
    </div>
  );
}
