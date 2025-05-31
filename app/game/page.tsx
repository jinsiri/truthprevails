import Link from 'next/link';
import { IconTransfer } from '@tabler/icons-react';

export default function ClassicMain() {
  return (
    <>
      <section className='home group flex h-screen items-center justify-center bg-amber-100'>
        <p className={'text-2xl'}>페이지 준비중입니다! :)</p>
      </section>

      <Link href={'/'} className={'fixed bottom-8 left-6 flex items-center gap-1 text-base font-light md:left-8 md:text-xl'}>
        <IconTransfer stroke={2} />
        Change mode
      </Link>
    </>
  );
}
