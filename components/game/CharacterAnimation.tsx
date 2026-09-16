import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const IMAGES = ['/images/game/study_01.webp', '/images/game/study_02.webp', '/images/game/study_03.webp'];

export default function CharacterAnimation({
  skillSet,
  textClass = 'text-yellow-300',
  active = true,
  onReady,
}: {
  skillSet: string[];
  textClass?: string;
  active?: boolean;
  onReady?: () => void;
}) {
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
      className='group absolute -bottom-15 left-1/2 z-10 -translate-x-1/2'
    >
      <div className='pointer-events-none relative h-[425px] w-[300px]'>
        <div className='absolute -top-10 left-1/2 flex w-full -translate-x-1/2 flex-col items-center'>
          {playing &&
            skillSet.map((skill, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [10 + i * 25, -10 + i * 25, -20 + i * 25],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  times: [0, 0.1, 0.8, 1],
                }}
                className={`absolute text-lg font-bold whitespace-nowrap drop-shadow-[0_2px_0_rgba(0,0,0,1)] ${textClass}`}
              >
                {`+10% ${skill}`}
              </motion.span>
            ))}
        </div>

        {IMAGES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt='jinsil'
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
