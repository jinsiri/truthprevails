import Link from 'next/link';
import { IconTransfer } from '@tabler/icons-react';

export default function ClassicMain() {
  return (
    <>
      <section className='home group overflow-hidden'>
        <div className='relative flex h-screen w-full items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-[length:200%] bg-[position:left] transition-[background-position] duration-1000 group-hover:bg-[position:right]'>
          <div className={'px-6 text-right text-black'}>
            <h1 className={'relative text-[6em] leading-[0.7] font-black md:text-[160px] lg:text-[180px] xl:text-[200px]'}>
              <span className={'absolute top-10 left-5 h-[20vw] max-h-50 w-[20vw] max-w-50 rounded-full bg-amber-500 opacity-90'}></span>
              <span className={'relative z-2'}>
                JINSIL
                <br />
                KWON
              </span>
            </h1>
            <h2 className={'relative z-10 text-[1.2em] leading-[0.9] font-thin md:text-[32px] lg:text-[36px] xl:text-[40px]'}>
              makes <strong className={'font-regular'}>User-driven &amp; Code-crafted</strong> Program
            </h2>
          </div>
        </div>
      </section>

      <Link href={'/game'} className={'fixed bottom-8 left-6 flex items-center gap-1 text-base font-light text-gray-900 md:left-8 md:text-xl'}>
        <IconTransfer stroke={2} />
        Change mode
      </Link>
    </>
  );
}
