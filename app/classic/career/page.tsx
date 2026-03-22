'use client';

import { motion } from 'framer-motion';
import { Fragment, useState } from 'react';
import ThemedImage from '@/components/ThemedImage';
import { EXPERIENCE, EXPERIENCE_TABS } from '@/constants/dataset';

export default function ClassicCareer() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className={'relative flex min-h-screen w-full flex-col items-end bg-sky-300'}>
      <h2 className={'absolute top-20 left-0 text-left text-4xl font-black uppercase md:text-5xl lg:text-7xl'}>_Career</h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='w-full pt-20 text-right lg:w-1/2 xl:w-2/3 xl:pt-30'
      >
        <div className='relative z-10 w-full border-b border-gray-600 text-center text-sm font-medium text-gray-500 md:text-lg xl:text-lg dark:border-gray-700'>
          <ul className='-mb-px flex w-full flex-wrap'>
            {EXPERIENCE_TABS.map((title, index) => (
              <li className='me-2' key={index}>
                <button
                  onClick={() => setActiveTab(index)}
                  className={`inline-block rounded-t-lg border-b-2 px-4 py-2 ${
                    activeTab === index
                      ? 'border-sky-700 font-bold text-sky-700 dark:border-sky-500 dark:text-sky-500'
                      : 'border-transparent text-gray-600 hover:border-gray-600 hover:text-gray-700'
                  }`}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ul className='pt-4 pr-4 pl-4 text-left text-lg lg:pr-0'>
          {EXPERIENCE.map(
            (exp, index) =>
              activeTab === index && (
                <li key={index} className='mb-8'>
                  <h3 className='mb-4 text-xl font-bold text-gray-700'>{exp.title}</h3>

                  <div className='w-full border-collapse text-left text-sm text-gray-700 lg:block rtl:text-right'>
                    <div className='border-t border-gray-700 bg-gray-50/50 md:grid md:grid-cols-[150px_1fr]'>
                      {exp.data.map((item, idx) => (
                        <Fragment key={idx}>
                          <div className='border-gray-700 bg-gray-100 p-3 font-semibold md:border-b'>{item.label}</div>
                          <div className='border-b border-gray-700 p-3'>
                            {Array.isArray(item.value) ? (
                              <ul className='list-inside list-disc space-y-1'>
                                {item.value.map((v, i) => (
                                  <li key={i}>{v}</li>
                                ))}
                              </ul>
                            ) : (
                              item.value
                            )}
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </li>
              ),
          )}
        </ul>

        <ThemedImage
          className={'bottom-0 mt-10 inline-block lg:absolute lg:left-0 lg:mt-0 lg:w-1/2 lg:-scale-x-100 xl:w-1/3'}
          lightSrc={`/images/classic/career.webp`}
          darkSrc={`/images/classic/career_w.webp`}
          alt={'My career step'}
          width={700}
          height={700}
          priority
        />
      </motion.div>
    </section>
  );
}
