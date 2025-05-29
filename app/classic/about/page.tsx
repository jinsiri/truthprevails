'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const traits = [
  '업무 선호 시간은 아침과 낮',
  '분야 구분 없이 뭐든 새로 배우는 걸 좋아합니다.',
  '피할 수 없다면 즐기는 편',
  '복잡한 로직 구현 성공에 희열을 느끼는 편',
  '기술을 위한 기술이 아닌 사람을 위한 기술을 고민합니다.',
  '활자 중독입니다.',
  '문학을 전공했고 지금도 사랑합니다 :)',
  '잘 키운 문해력은 기획서와 API 독해에 유익합니다.',
  '현재 컴퓨터과학과를 두 번째 전공으로 공부하고 있습니다.',
];

export default function ClassicAbout() {
  return (
    <section className='bg-indigo-300 lg:h-screen'>
      <h2 className='text-4xl font-black uppercase md:text-5xl lg:text-7xl'>_About</h2>
      <div className='mt-10 items-center lg:flex'>
        <motion.div className='flex-shrink-0' initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: 'easeOut' }}>
          <Image src={`/images/about.png`} alt={"It's me, jinsil!"} width={550} height={550} priority />
        </motion.div>
        <ul className='w-full py-10 pl-10 text-base font-medium md:text-xl lg:pl-20 xl:text-2xl'>
          {traits.map((text, index) => (
            <li key={index} className='list-disc gap-2'>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
