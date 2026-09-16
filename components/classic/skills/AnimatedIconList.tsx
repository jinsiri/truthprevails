'use client';

import { motion } from 'framer-motion';
export const AnimatedIconList = ({ icons, startDelay = 0 }: { icons: React.ElementType[]; startDelay?: number }) => (
  <ul className='flex flex-wrap gap-2'>
    {icons.map((Icon, index) => (
      <motion.li
        key={index}
        initial={{ opacity: 0, y: 20, x: -10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{
          delay: startDelay + index * 0.075,
          duration: 0.3,
        }}
      >
        <Icon />
      </motion.li>
    ))}
  </ul>
);
