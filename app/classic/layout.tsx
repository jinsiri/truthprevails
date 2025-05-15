'use client';

import { usePathname } from 'next/navigation';
import { GlobalNavigation } from '@/components/classic/GlobalNavigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function ClassicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        style={{ willChange: 'opacity' }}
      >
        <main className={'classic w-full font-sans'}>
          <GlobalNavigation />
          {children}
        </main>
      </motion.div>
    </AnimatePresence>
  );
}
