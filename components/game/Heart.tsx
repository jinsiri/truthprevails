'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Heart() {
  const width = 36;
  const height = 28;
  const fullHeartSrc = '/images/game/heart_full.webp';
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
    <div className={'absolute top-8 left-[2%]'}>
      <ul className={'flex gap-3'}>
        <li>
          <Image src={fullHeartSrc} alt='heart' width={width} height={height} />
        </li>
        <li>
          <Image src={fullHeartSrc} alt='heart' width={width} height={height} />
        </li>
        <li>
          <Image src={fullHeartSrc} alt='heart' width={width} height={height} />
        </li>
        {theme === 'dark' ? (
          <>
            <li>
              <Image src={`/images/game/heart_half.webp`} alt='heart' width={width} height={height} />
            </li>
            <li>
              <Image src={`/images/game/heart_zero.webp`} alt='heart' width={width} height={height} />
            </li>
          </>
        ) : (
          <>
            <li>
              <Image src={fullHeartSrc} alt='heart' width={width} height={height} />
            </li>
            <li>
              <Image src={fullHeartSrc} alt='heart' width={width} height={height} />
            </li>
          </>
        )}
      </ul>
      {theme === 'dark' && <p className={'mt-2 flex items-center'}>&#42; 밤에는 능률이 다소 떨어집니다.</p>}
    </div>
  );
}
