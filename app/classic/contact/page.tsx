'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ThemedImage from '@/components/ThemedImage';

export default function ClassicContact() {
  return (
    <section className={'relative min-h-screen bg-purple-200 px-6 pb-[50vw] md:pb-0 lg:px-0 xl:h-screen xl:overflow-hidden'}>
      <h2 className={'text-center text-2xl font-black uppercase md:text-5xl lg:text-7xl'}>Contact</h2>
      <div
        className={'my-10 items-center px-6 text-base font-medium md:my-20 md:px-10 md:text-2xl lg:flex lg:h-3/4 lg:text-3xl xl:my-0 xl:px-[25%] xl:text-4xl'}
      >
        <ul className={'w-full space-y-2 rounded-xl border-4 bg-gray-50/50 p-4 md:space-y-6 md:p-10'}>
          <li className={'items-center gap-1 md:flex md:gap-2'}>
            <h3 className={'w-40 text-purple-700'}>E-MAIL</h3>
            <a href={'mailto:developer.js.corn@gmail.com'}>developer.js.corn@gmail.com</a>
          </li>
          <li className={'items-center gap-1 md:flex md:gap-2'}>
            <h3 className={'w-40 text-purple-700 uppercase'}>Github</h3>
            <a href={'https://github.com/jinsiri'} target='_blank'>
              https://github.com/jinsiri
            </a>
          </li>
        </ul>
      </div>
      <motion.div
        className={'absolute bottom-0 left-0 max-w-1/2 md:static lg:-bottom-20 lg:-left-40 lg:max-w-1/3 xl:absolute xl:-bottom-40'}
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ThemedImage lightSrc={`/images/search.png`} darkSrc={'/images/search_w.webp'} alt={'How to contact jinsil'} width={650} height={650} priority />
      </motion.div>

      <motion.div
        className={
          'top-40 right-0 hidden h-3/4 flex-col items-center rounded-tl-xl bg-purple-100 px-10 py-14 text-center md:flex xl:absolute xl:w-[20%] xl:max-w-1/3'
        }
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image src={`/images/contact_qr.png`} alt={'developer.js.corn@gmail.com'} width={250} height={250} className={'border-20 border-amber-400'} />

        <p className={'mt-6 text-base font-medium break-keep xl:text-xl'}>
          카메라를 열어 <strong className={'text-purple-700'}>QR 코드를 스캔</strong>하시면 연락처를 추가하실 수 있습니다
        </p>
      </motion.div>
    </section>
  );
}
