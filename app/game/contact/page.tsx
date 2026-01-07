'use client';

import ThemedImage from '@/components/ThemedImage';
import Image from 'next/image';

export default function GameContact() {
  return (
    <main className='relative min-h-screen w-full overflow-hidden'>
      <ThemedImage
        className={'absolute right-0 bottom-0 -z-10 object-cover'}
        lightSrc={`/images/game/info_day.png`}
        darkSrc={`/images/game/info_night.png`}
        alt={'educated list'}
        priority
        fill={true}
      />

      <section className='relative z-10 min-h-screen w-full p-8'>
        <Image className={'absolute -bottom-15 left-40'} width={300} height={800} src={'/images/game/jinsil_standing.png'} alt={''} />
      </section>
    </main>
  );
}
