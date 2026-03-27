'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const HEART_IMAGES = {
  full: '/images/game/heart_full.webp',
  half: '/images/game/heart_half.webp',
  zero: '/images/game/heart_zero.webp',
} as const;

export default function Heart() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const getTheme = () => (document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
    setTheme(getTheme());

    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  const hearts =
    theme === 'dark'
      ? [HEART_IMAGES.full, HEART_IMAGES.full, HEART_IMAGES.full, HEART_IMAGES.half, HEART_IMAGES.zero]
      : [HEART_IMAGES.full, HEART_IMAGES.full, HEART_IMAGES.full, HEART_IMAGES.full, HEART_IMAGES.full];

  return (
    <div className='fixed top-[28] left-4 z-50 w-1/2 max-w-[230px] md:left-6 lg:top-[20]'>
      <ul className='grid h-[34px] w-full auto-cols-fr grid-flow-col gap-2'>
        {hearts.map((src, index) => (
          <li key={index} className='relative aspect-[96/89] h-full'>
            <Image src={src} alt={`heart-${index}`} fill sizes='50px' className='object-contain' />
          </li>
        ))}
      </ul>

      {theme === 'dark' && <p className='mt-2 flex items-center rounded-sm bg-black/60 px-2 text-sm break-keep text-white'>* 밤에는 능률이 다소 떨어집니다.</p>}
    </div>
  );
}
