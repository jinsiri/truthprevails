'use client';

import ThemedImage from '@/components/ThemedImage';
import Image from 'next/image';
import { Footprints } from 'lucide-react';
import SpeechBubble from '@/components/game/SpeechBubble';

export default function GameLearning() {
  return (
    <main className='relative min-h-screen w-full overflow-hidden'>
      <ThemedImage
        className={'absolute right-0 bottom-0 -z-10 object-cover'}
        lightSrc={`/images/game/school_day.png`}
        darkSrc={`/images/game/school_night.png`}
        alt={'educated list'}
        priority
        fill={true}
      />

      <section className='relative z-10 min-h-screen w-full p-8'>
        <div className='group absolute -bottom-15 left-40'>
          <Image width={300} height={800} src={'/images/game/jinsil_standing.png'} alt={'jinsil'} />
          <SpeechBubble text={'자세히 보고 싶은 과정을 선택하세요!'} />
        </div>

        <div className={'absolute top-[26%] left-[50%] w-[90vw] max-w-[650px] -translate-x-1/2 text-3xl text-white'}>
          <h2 className={'mb-5 flex items-center'}>
            <Footprints className={'mr-4'} size={38} /> LEVEL UP: 교육 여정
          </h2>
          <ol className={'text-xl'}>
            <li className={'mb-2'}>
              <button className={'visit flex w-full cursor-pointer items-center justify-between rounded-md border-2 p-4 transition-all hover:bg-green-800'}>
                &gt; 1. 신명여자고등학교<small className={'text-gray-400'}>(2009.03 ~ 2012.02 / 졸업)</small>
              </button>
            </li>
            <li className={'mb-2'}>
              <button className={'flex w-full cursor-pointer items-center justify-between rounded-md border-2 p-4 transition-all hover:bg-green-800'}>
                &gt; 2. 인천대학교 국어국문학과<small className={'text-gray-400'}>(2012.03 ~ 2018.02 / 졸업)</small>
              </button>
            </li>
            <li className={'mb-2'}>
              <button className={'flex w-full cursor-pointer items-center justify-between rounded-md border-2 p-4 transition-all hover:bg-green-800'}>
                &gt; 3. 방송통신대학교 컴퓨터과학과<small className={'text-gray-400'}>(2024.03 ~ 2026.02 / 편입 후 졸업)</small>
              </button>
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
