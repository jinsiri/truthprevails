'use client';

import ThemedImage from '@/components/ThemedImage';
import Image from 'next/image';
import SpeechBubble from '@/components/game/SpeechBubble';

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
        <div className='group absolute -bottom-15 left-40'>
          <Image width={300} height={800} src={'/images/game/jinsil_standing.png'} alt={''} />
          <SpeechBubble text={'QR 코드를 스캔하시면 연락처를 확인하실 수 있습니다.'} />
        </div>
      </section>
    </main>
  );
}
