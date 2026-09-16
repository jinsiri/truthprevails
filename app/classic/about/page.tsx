'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { IMAGE_ROOT } from '@/constants/imageSrc';

import { traits } from '@/features/portfolio/profile';

export default function ClassicAbout() {
  return (
    <section className='bg-indigo-300 lg:h-screen dark:bg-[#191b35]'>
      <h2 className='text-4xl font-black uppercase md:text-5xl lg:text-7xl'>_About</h2>
      <div className='mt-10 items-center lg:flex'>
        <motion.div className='flex-shrink-0' initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: 'easeOut' }}>
          <Image src={`${IMAGE_ROOT}/images/classic/about.webp`} alt={"It's me, jinsil!"} width={550} height={550} priority />
        </motion.div>
        <ul className='w-full py-10 pr-6 pl-10 text-base font-medium md:text-xl lg:pl-20 xl:text-2xl'>
          {traits.map((text, index) => (
            <li key={index} className='list-disc gap-2 break-keep'>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
