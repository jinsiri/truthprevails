import Image from 'next/image';
import { TimelineItem } from '@/components/classic/TimelineItem';

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
    description: '재학중',
    color: 'blue',
  },
  {
    date: '2012.03 ~ 2018.02',
    title: '인천대학교 국어국문학과',
    description: '졸업',
    color: 'green',
  },
  {
    date: '2009.03 ~ 2012.02',
    title: '신명여자고등학교',
    description: '졸업',
    color: 'yellow',
  },
];

export default function ClassicEducation() {
  return (
    <section className={'relative h-screen overflow-hidden bg-pink-300'}>
      <h2 className={'text-right text-4xl font-black uppercase md:text-5xl lg:text-7xl'}>Education_</h2>
      <Image
        className={'absolute right-10 -bottom-28 max-w-1/2 md:max-w-1/3'}
        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/edu.png`}
        alt={"It's me, jinsil!"}
        width={450}
        height={450}
      />

      <div className='relative ml-4'>
        <div className='absolute top-0 left-0 h-full w-px bg-gray-200 dark:bg-gray-700' />

        {timelineData.map((item, index) => (
          <TimelineItem key={index} date={item.date} title={item.title} description={item.description} color={item.color} />
        ))}
      </div>
    </section>
  );
}
