'use client';

import ThemedImage from '@/components/ThemedImage';
import SpeechBubble from '@/components/game/SpeechBubble';
import clsx from 'clsx';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useKeyboardList } from '@/hooks/useKeyboardList';
import { EXPERIENCE, EXPERIENCE_TABS } from '@/constants/dataset';

interface Mode {
  companyNm: string;
}

const MODES: Mode[] = [{ companyNm: '시스원' }, { companyNm: '프리랜서' }, { companyNm: '미르나인' }];

export default function GameCareer() {
  const containerRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(false);
  const { selectedIndex, handleKeyDown, setSelectedIndex } = useKeyboardList({
    items: MODES,
    onSelect: () => {
      setActive(true);
    },
  });

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

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
        <div className={clsx('group absolute -bottom-15 z-10 transition-all duration-1000', active ? 'right-0' : 'right-1/4')}>
          <ThemedImage
            lightSrc={`/images/game/company_jinsil_day.png`}
            darkSrc={`/images/game/company_jinsil_night.png`}
            width={active ? 400 : 300}
            height={active ? 900 : 800}
            alt={'jinsil'}
          />
          <SpeechBubble text={'이런 일을 했습니다!'} />
        </div>

        <div className={clsx('absolute left-1/4 h-[50vh] w-[46%] transition-all duration-1000', active ? 'bottom-5 left-[5%] h-[90vh] w-[90%]' : 'bottom-20')}>
          <div className='block h-3/4 w-full overflow-y-auto rounded-lg border-8 border-gray-400 bg-white p-4 md:p-8'>
            {!active && (
              <>
                <h2 className={'mb-4 text-2xl md:mb-6 md:text-4xl'}>경력사항</h2>
                <ul
                  ref={containerRef}
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                  className={clsx(
                    'mode-btns flex w-full max-w-[70%] cursor-pointer flex-col gap-x-6 gap-y-2 text-xl outline-none md:text-2xl',
                    active && 'max-w-full',
                  )}
                >
                  {EXPERIENCE_TABS.map((mode, index) => (
                    <li
                      key={mode}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={() => setActive(true)}
                      className={clsx('flex items-center justify-between px-4 py-2 hover:text-blue-900', selectedIndex === index && 'active bg-gray-200')}
                    >
                      {mode}
                      {selectedIndex === index && <span>Enter</span>}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {active && (
              <>
                <h3 className={'mb-4 text-2xl md:mb-6 md:text-4xl'}>{EXPERIENCE_TABS[selectedIndex]}</h3>
                <ul className='pt-2 text-left text-lg lg:pr-0'>
                  {EXPERIENCE.map(
                    (exp, index) =>
                      selectedIndex === index && (
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
