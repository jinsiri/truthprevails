'use client';

import { TimelineItem } from '@/components/classic/TimelineItem';
import { motion } from 'framer-motion';
import ThemedImage from '@/components/ThemedImage';
import { EDUCATION, PROJECTS } from '@/constants/dataset';
import { IMAGE_ROOT } from '@/constants/imageSrc';

export default function ClassicLearning() {
  return (
    <section
      className={
        'relative min-h-screen bg-radial from-pink-600 via-pink-400 to-pink-300 [background-size:200%] [background-position:left_bottom] lg:overflow-hidden dark:from-[#32142d] dark:via-[#40182f] dark:to-[#4b1d34]'
      }
    >
      <h2 className={'text-right text-4xl font-black uppercase md:text-5xl lg:text-7xl'}>Learning_</h2>

      <div className={'mt-10 lg:mt-20'}>
        <div className='relative ml-4 pr-6 text-right lg:w-2/3 lg:pr-10 xl:w-3/4 xl:pr-[100px]'>
          <h3 className={'mt-10 text-2xl font-black uppercase md:text-3xl lg:mt-20 lg:text-5xl'}>Education</h3>

          <div className={'relative mt-6 lg:mt-10'}>
            <div className='absolute top-0 right-0 h-full w-px bg-gray-200 dark:bg-gray-700' />

            {EDUCATION.map((item, index) => (
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

        <ThemedImage
          className={'right-10 -bottom-28 -mt-30 max-w-1/2 lg:absolute lg:mt-0 lg:w-1/3 xl:w-1/4'}
          lightSrc={`${IMAGE_ROOT}/images/classic/edu.webp`}
          darkSrc={`${IMAGE_ROOT}/images/classic/edu_w.webp`}
          alt={'educated list'}
          width={450}
          height={450}
          priority
        />
      </div>

      <motion.div
        className={'mt-16 px-6 pb-16 lg:mt-24 lg:ml-6 lg:w-2/3 lg:pr-10 xl:ml-10 xl:w-3/4 xl:pr-[100px]'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <h3 className={'text-2xl font-black uppercase md:text-3xl lg:text-5xl'}>Side Projects</h3>
        <div className={'mt-6 grid gap-4 md:grid-cols-3'}>
          {PROJECTS.map((project) => (
            <article key={project.title} className={'rounded-xl border border-black/10 bg-white/30 p-4 text-left shadow-sm dark:border-white/10 dark:bg-black/20'}>
              <p className={'text-xs font-medium text-gray-600 dark:text-gray-300'}>{project.date}</p>
              <h4 className={'mt-2 text-lg font-black md:text-xl'}>{project.title}</h4>
              <p className={'mt-2 text-sm leading-relaxed break-keep md:text-base'}>{project.description}</p>
              <p className={'mt-3 text-xs leading-relaxed text-gray-600 dark:text-gray-300'}>{project.stack}</p>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
