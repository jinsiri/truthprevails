'use client';

import Image from 'next/image';
import { TimelineItem } from '@/components/classic/TimelineItem';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface TimelineEntry {
  date: string;
  title: string;
  description: string;
  color?: 'blue' | 'green' | 'yellow';
}

const timelineData: TimelineEntry[] = [
  {
    date: '2024.03 ~',
    title: '방송통신대학교 컴퓨터과학과',
    description: '편입, 현재 4학년 1학기 재학중',
    color: 'blue',
  },
  {
    date: '2012.03 ~ 2018.02',
    title: '인천대학교 국어국문학과',
    description: '졸업',
    color: 'blue',
  },
  {
    date: '2009.03 ~ 2012.02',
    title: '신명여자고등학교',
    description: '졸업',
    color: 'blue',
  },
];

export default function ClassicLearning() {
  return (
    <section
      className={
        'relative min-h-screen bg-radial from-pink-600 via-pink-400 to-pink-300 [background-size:200%] [background-position:left_bottom] lg:overflow-hidden'
      }
    >
      <h2 className={'text-right text-4xl font-black uppercase md:text-5xl lg:text-7xl'}>Learning_</h2>

      <div className={'mt-10 lg:mt-20'}>
        <div className='relative ml-4 pr-6 text-right lg:w-2/3 lg:pr-10 xl:w-3/4 xl:pr-[100px]'>
          <h3 className={'mt-10 text-2xl font-black uppercase md:text-3xl lg:mt-20 lg:text-5xl'}>Education</h3>

          <div className={'relative mt-6 lg:mt-10'}>
            <div className='absolute top-0 right-0 h-full w-px bg-gray-200 dark:bg-gray-700' />

            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.3,
                }}
              >
                <TimelineItem key={index} date={item.date} title={item.title} description={item.description} color={item.color} />
              </motion.div>
            ))}
          </div>
        </div>

        <Image
          className={'right-10 -bottom-28 -mt-30 max-w-1/2 lg:absolute lg:mt-0 lg:w-1/3 xl:w-1/4'}
          src={`/images/edu.webp`}
          alt={'educated list'}
          width={450}
          height={450}
          priority
        />
      </div>

      <motion.div
        className={'pb-10 pl-6 lg:absolute lg:bottom-0 lg:left-0 lg:pl-10'}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.7,
          duration: 0.3,
        }}
      >
        <h3 className={'mt-10 text-2xl font-black uppercase md:text-3xl lg:mt-20 lg:text-5xl'}>Side projects</h3>
        <ul className={'mt-4 text-base md:text-xl'}>
          <li className='relative pl-6'>
            <div className={'absolute left-0 mt-1 h-3 w-3 rounded-full bg-blue-700 xl:mt-2'}></div>
            <Link href={'#github_address'}>할 일 관리 웹 어플리케이션 YOURTODO</Link>
          </li>
          <li className='relative pl-6'>
            <div className={'absolute left-0 mt-1 h-3 w-3 rounded-full bg-blue-700 xl:mt-2'}></div>
            <Link href={'#github_address'}>그룹웨어 EASY-C</Link>
          </li>
        </ul>
      </motion.div>
    </section>
  );
}
