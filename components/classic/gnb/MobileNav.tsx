'use client';

import { motion, useCycle } from 'framer-motion';
import { MenuToggle } from './Toggle';
import { Navigation } from './Nav';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 25px 25px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(25px at 25px 25px)',
    transition: { duration: 0 },
  },
};

export default function MobileNav() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) toggleOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isOpen]);

  return (
    <motion.nav
      className={`fixed z-100 overflow-hidden lg:hidden ${isOpen ? 'top-0 bottom-0 left-0 w-[300px]' : 'top-[18px] left-[15px] h-[50px] w-[50px] rounded-full'}`}
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom='100%'
    >
      <motion.div className='absolute top-0 bottom-0 left-0 w-[300px] bg-black' variants={sidebar} />
      <Navigation />
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  );
}
