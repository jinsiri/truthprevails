'use client';

import ThemedImage from '@/components/ThemedImage';
import SpeechBubble from '@/components/game/SpeechBubble';
import clsx from 'clsx';
import { Fragment, useEffect, useRef } from 'react';
import { useKeyboardList } from '@/hooks/useKeyboardList';
import { EXPERIENCE, EXPERIENCE_TABS } from '@/constants/dataset';
import { useUIStore } from '@/store/useUIStore';
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react';

export default function GameCareer() {
  const containerRef = useRef<HTMLUListElement>(null);
  const careerDetailRef = useRef<HTMLDivElement>(null);
  const { activeView, openView } = useUIStore();
  const { vIdx, hIdx, handleKeyDown, setVIdx, setHIdx } = useKeyboardList({
    vItems: activeView === 'career' ? [] : EXPERIENCE_TABS,
    onSelectV: () => openView('career'),
    hItems: activeView === 'careerDetail' ? [] : EXPERIENCE_TABS,
    onSelectH: () => {
      openView('careerDetail');
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeView === 'career') {
        setHIdx(vIdx);
        careerDetailRef.current?.focus();
      } else {
        setVIdx(hIdx);
        containerRef.current?.focus();
      }
    }, 10);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeView]);

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
        <div
          className={clsx(
            'absolute bottom-0 left-1/2 w-[90%] -translate-x-1/2 transition-all duration-1000',
            activeView === 'career' ? 'h-[90vh]' : 'h-[70vh] max-w-[1000px]',
          )}
        >
          <div
            className={clsx(
              'group absolute -bottom-15 z-10 hidden aspect-[651/950] w-[30%] transition-all duration-1000 md:block',
              activeView === 'career' ? 'right-10 max-w-[400px]' : '-right-20',
            )}
          >
            <ThemedImage lightSrc={`/images/game/company_jinsil_day.png`} darkSrc={`/images/game/company_jinsil_night.png`} fill alt={'발표하는 캐릭터'} />
            <SpeechBubble text={'이런 일을 했습니다!'} />
          </div>

          <div className='block h-3/4 w-full overflow-y-auto rounded-lg border-8 border-gray-400 bg-gray-50 p-4 md:p-8 lg:p-12'>
            {activeView !== 'career' && (
              <>
                <h2 className={'mb-4 text-2xl md:mb-8 md:text-4xl lg:mb-10'}>경력사항</h2>
                <ul
                  ref={containerRef}
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                  className={clsx('mode-btns flex cursor-pointer flex-col gap-x-6 gap-y-2 text-xl outline-none md:w-[80%] md:text-2xl')}
                >
                  {EXPERIENCE_TABS.map((mode, index) => (
                    <li
                      key={mode}
                      onMouseEnter={() => setVIdx(index)}
                      onClick={() => openView('career')}
                      className={clsx('flex items-center justify-between px-4 py-2', vIdx === index && 'active bg-gray-200')}
                    >
                      {mode}
                      {vIdx === index && <span>Enter</span>}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {activeView === 'career' && (
              <>
                <div className={'sticky top-0 mb-4 flex items-center justify-between gap-x-4 bg-gray-50 md:mb-6 md:w-[80%]'}>
                  <h3 className={'text-2xl md:text-4xl'}>{EXPERIENCE_TABS[hIdx]}</h3>
                  <div ref={careerDetailRef} className={'flex items-center outline-none'} onKeyDown={handleKeyDown} tabIndex={0}>
                    <button
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') e.stopPropagation();
                      }}
                      onClick={() => setHIdx((prev) => (prev - 1 + EXPERIENCE_TABS.length) % EXPERIENCE_TABS.length)}
                      className={'font-inherit cursor-pointer outline-none hover:text-blue-400 focus:text-blue-400'}
                    >
                      <SquareChevronLeft size={30} />
                    </button>
                    <button
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') e.stopPropagation();
                      }}
                      onClick={() => setHIdx((prev) => (prev + 1) % EXPERIENCE_TABS.length)}
                      className={'font-inherit cursor-pointer outline-none hover:text-blue-400 focus:text-blue-400'}
                    >
                      <SquareChevronRight size={30} />
                    </button>
                  </div>
                </div>

                <ul className='pt-2 text-left text-lg md:w-[80%] lg:pr-0'>
                  {EXPERIENCE.map(
                    (exp, index) =>
                      hIdx === index && (
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
              </>
            )}
          </div>
          <canvas className={'absolute left-[5%] block h-full w-[30px] border-l-6 border-gray-800 bg-gradient-to-r from-gray-800 to-gray-400'} />
          <canvas className={'absolute right-[5%] block h-full w-[30px] border-l-6 border-gray-800 bg-gradient-to-r from-gray-800 to-gray-400'} />
        </div>
      </section>
    </main>
  );
}
