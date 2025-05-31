'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from './Items';
import { navItems } from '@/constants/navItems';

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = () => (
  <motion.ul className={'absolute top-[100px] w-[230px] p-[25px]'} variants={variants}>
    {navItems.map((item, index) => (
      <MenuItem key={index} text={item.label} href={item.href} />
    ))}
  </motion.ul>
);
