'use client';

import ThemedImage from '@/components/ThemedImage';

export default function GameCareer() {
  return (
    <main className='relative min-h-screen w-full overflow-hidden'>
      <ThemedImage
        className={'absolute right-0 bottom-0 -z-10 object-cover'}
        lightSrc={`/images/game/company_day_v3.png`}
        darkSrc={`/images/game/company_night_v3.png`}
        alt={'educated list'}
        priority
        fill={true}
      />

      <section className='relative z-10 min-h-screen w-full p-8'>
        <ThemedImage
          className={'absolute right-1/3 -bottom-15'}
          lightSrc={`/images/game/company_jinsil_day.png`}
          darkSrc={`/images/game/company_jinsil_night.png`}
          width={300}
          height={800}
          alt={'jinsil'}
        />
      </section>
    </main>
  );
}
