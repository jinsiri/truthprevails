import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IMAGE_ROOT } from '@/constants/imageSrc';

const IMAGES = [`${IMAGE_ROOT}/images/game/study_01.webp`, `${IMAGE_ROOT}/images/game/study_02.webp`, `${IMAGE_ROOT}/images/game/study_03.webp`];

interface CharacterAnimationProps {
  active?: boolean;
  onReady?: () => void;
  aside?: ReactNode;
  floatingText?: string;
  textClass?: string;
}

export default function CharacterAnimation({ active = true, onReady, aside, floatingText, textClass = 'text-yellow-300' }: CharacterAnimationProps) {
  const [index, setIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const ready = loadedImages.length === IMAGES.length;
  const playing = active && ready;

  useEffect(() => {
    if (ready) onReady?.();
  }, [ready, onReady]);

  useEffect(() => {
    if (!playing) return;

    const intervalTime = 500;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [playing]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: playing ? 1 : 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      aria-hidden={!playing}
      className='group pointer-events-none absolute -bottom-15 left-1/2 z-10 flex -translate-x-1/2 items-end'
    >
      {aside}
      <div className='pointer-events-none relative h-[340px] w-[240px] md:h-[425px] md:w-[300px]'>
        {playing && floatingText && (
          <div className='absolute -top-10 left-1/2 flex w-full -translate-x-1/2 flex-col items-center max-md:hidden'>
            {[0, 1].map((i) => (
              <motion.span
                key={`${floatingText}_${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 1, 0], y: [10 + i * 25, -10 + i * 25, -20 + i * 25] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, times: [0, 0.1, 0.8, 1] }}
                className={`absolute text-lg font-bold whitespace-nowrap drop-shadow-[0_2px_0_rgba(0,0,0,1)] ${textClass}`}
              >
                {floatingText}
              </motion.span>
            ))}
          </div>
        )}
        {IMAGES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=''
            width={300}
            height={425}
            loading='eager'
            onLoad={() => setLoadedImages((loaded) => (loaded.includes(src) ? loaded : [...loaded, src]))}
            className={`absolute inset-0 ${i === index ? 'opacity-100' : 'opacity-0'} object-contain`}
          />
        ))}
      </div>
    </motion.div>
  );
}
