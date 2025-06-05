'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
};

type MenuItemProps = {
  text: string;
  href: string;
};

export const MenuItem = ({ text, href }: MenuItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <motion.li className={`mb-[20px] flex cursor-pointer items-center`} variants={variants} whileTap={{ scale: 0.95 }}>
      <div className='text-placeholder'>
        <Link href={href} className={`text-2xl text-white ${isActive ? 'underline decoration-amber-500 underline-offset-4' : ''}`}>
          {text}
        </Link>
      </div>
    </motion.li>
  );
};
