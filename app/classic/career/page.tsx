'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import SectionHeader from '@/components/classic/SectionHeader';
import { EXPERIENCE, EXPERIENCE_TABS } from '@/features/portfolio/career';

const SPY_OFFSET = 130;

export default function ClassicCareer() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const passed = sectionRefs.current.filter((section) => section && section.getBoundingClientRect().top <= SPY_OFFSET);
      setActiveIndex(Math.max(0, passed.length - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    setActiveIndex(index);
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SectionHeader num='03' title='Career' subtitle='Experience & Achievements' />

      <nav aria-label='경력 목차' className='sticky top-14 z-10 -mx-5 border-b border-(--ink) bg-(--paper) px-5 md:-mx-8 md:px-8'>
        <ul className='flex gap-6 overflow-x-auto text-sm md:gap-8 md:text-[15px]'>
          {EXPERIENCE_TABS.map((company, index) => (
            <li key={company}>
              <button
                type='button'
                aria-current={activeIndex === index ? 'true' : undefined}
                onClick={() => scrollToSection(index)}
                className={clsx(
                  'cursor-pointer border-b-2 py-3 whitespace-nowrap',
                  activeIndex === index ? 'border-(--accent) font-bold' : 'border-transparent text-(--muted) hover:text-(--ink)',
                )}
              >
                {company}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {EXPERIENCE.map((experience, index) => (
        <article
          key={experience.title}
          ref={(element) => {
            sectionRefs.current[index] = element;
          }}
          className='scroll-mt-28 border-b border-(--ink) pt-10 pb-6 last:border-b-0'
        >
          <p className='text-xs tracking-[0.16em] text-(--muted)'>
            <span className='font-editorial mr-2 text-(--accent)'>{String(index + 1).padStart(2, '0')}</span>
            {EXPERIENCE_TABS[index]}
          </p>
          <h2 className='font-editorial mt-2 text-2xl font-bold md:text-3xl'>{experience.title}</h2>

          <dl className='mt-6'>
            {experience.data.map((item) => (
              <div key={item.label} className='grid gap-2 border-t border-(--ink)/30 py-5 md:grid-cols-[160px_1fr] md:gap-6'>
                <dt className='text-xs tracking-[0.16em] text-(--muted)'>{item.label}</dt>
                <dd className='text-[15px] leading-7 md:text-base'>
                  {Array.isArray(item.value) ? (
                    <ul>
                      {item.value.map((value) => (
                        <li key={value} className='before:text-(--accent) before:content-["—_"]'>
                          {value}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
    </>
  );
}
