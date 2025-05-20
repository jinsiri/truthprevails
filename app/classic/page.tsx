import Link from 'next/link';
import { IconTransfer } from '@tabler/icons-react';

export default function ClassicMain() {
  return (
    <>
      <section className='home group'>
        <div className='relative flex h-screen w-full items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-[length:200%] bg-[position:left] transition-[background-position] duration-1000 group-hover:bg-[position:right]'>
          <div className={'text-right'}>
            <h1 className={'relative text-[200px] leading-[0.7] font-black'}>
              <span className={'absolute top-10 left-5 h-50 w-50 rounded-full bg-amber-300 opacity-90'}></span>
              <span className={'relative z-2'}>
                JINSIL
                <br />
                KWON
              </span>
            </h1>
            <h2 className={'text-[40px] leading-[0.9] font-thin'}>
              makes <strong className={'font-regular'}>User-driven &amp; Code-crafted</strong> Program
            </h2>
          </div>
        </div>
      </section>

      <Link href={'/'} className={'fixed bottom-8 left-8 flex items-center gap-1 text-xl font-light'}>
        <IconTransfer stroke={2} />
        Change mode
      </Link>
    </>
  );
}
