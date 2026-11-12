'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import SectionHeader from '@/components/classic/SectionHeader';
import { EXPERIENCE, EXPERIENCE_TABS } from '@/features/portfolio/career';
import { EDUCATION } from '@/features/portfolio/education';

const SPY_OFFSET = 130;
const NAV_ITEMS = [...EXPERIENCE_TABS, '학력'];

export default function ClassicCareer() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      const passed = sectionRefs.current.filter((section) => section && section.getBoundingClientRect().top <= SPY_OFFSET);
      setActiveIndex(isAtBottom ? NAV_ITEMS.length - 1 : Math.max(0, passed.length - 1));
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
      <SectionHeader num='03' title='Career' subtitle='Experience & Education' />

      <nav aria-label='경력 목차' className='sticky top-14 z-10 -mx-5 border-b border-(--ink) bg-(--paper) px-5 md:-mx-8 md:px-8'>
        <ul className='flex gap-6 overflow-x-auto text-sm md:gap-8 md:text-[15px]'>
          {NAV_ITEMS.map((label, index) => (
            <li key={label}>
              <button
                type='button'
                aria-current={activeIndex === index ? 'true' : undefined}
                onClick={() => scrollToSection(index)}
                className={clsx(
                  'cursor-pointer border-b-2 py-3 whitespace-nowrap',
                  activeIndex === index ? 'border-(--accent) font-bold' : 'border-transparent text-(--muted) hover:text-(--ink)',
                )}
              >
                {label}
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
          className='scroll-mt-28 border-b border-(--ink) pt-10 pb-6'
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
                        <li key={value} className='pl-[1.15em] -indent-[1.15em] before:text-(--accent) before:content-["—_"]'>
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

      <section
        ref={(element) => {
          sectionRefs.current[EXPERIENCE.length] = element;
        }}
        className='scroll-mt-28 pt-10'
      >
        <p className='text-xs tracking-[0.16em] text-(--muted)'>EDUCATION</p>
        <h2 className='font-editorial mt-2 text-2xl font-bold md:text-3xl'>학력</h2>
        <ol className='mt-6'>
          {EDUCATION.map((item) => (
            <li key={item.title} className='grid gap-1 border-t border-(--ink)/30 py-5 md:grid-cols-[160px_1fr] md:gap-6'>
              <time className='font-editorial text-(--muted)'>{item.date}</time>
              <div>
                <p className='font-editorial text-xl font-bold md:text-2xl'>{item.title}</p>
                <p className='mt-1 text-[15px] text-(--muted)'>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
