import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import Image from 'next/image';

const IMAGES = ['/images/game/study_01.webp', '/images/game/study_02.webp', '/images/game/study_03.webp'];

export default function CharacterAnimation({ skillSet, textColor }: { skillSet: string[]; textColor?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalTime = 500;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className='group absolute -bottom-15 left-1/2 z-10 -translate-x-1/2'
    >
      <div className='pointer-events-none relative h-[425px] w-[300px]'>
        <div className='absolute -top-24 left-1/2 flex w-full -translate-x-1/2 flex-col items-center'>
          {skillSet.map((skill, i) => (
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
              className={clsx(textColor || 'text-yellow-300', 'absolute text-lg font-bold whitespace-nowrap drop-shadow-[0_2px_0_rgba(0,0,0,1)]')}
            >
              {`+10% ${skill}`}
            </motion.span>
          ))}
        </div>

        {IMAGES.map((src, i) => (
          <Image key={src} src={src} alt='jinsil' width={300} height={425} priority className={`${i === index ? 'block' : 'hidden'} object-contain`} />
        ))}
      </div>
    </motion.div>
  );
}
