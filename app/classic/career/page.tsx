'use client';

import { motion } from 'framer-motion';
import { Fragment, useState } from 'react';
import ThemedImage from '@/components/ThemedImage';

const tabTitles = ['SysOne (시스원)', '프리랜서', 'Mir9'];
const experiences = [
  {
    title: 'ITSM 솔루션 개발',
    data: [
      { label: '기간', value: '2022.07 ~ 2024.11(2년 5개월)' },
      { label: '프로젝트명', value: 'ITSM 솔루션 개발 및 유지보수' },
      {
        label: '성과',
        value: [
          '고객 요구사항 90% 이상 충족',
          '시스템 운영 및 고객사 대응 프로세스 정립',
          '신규 기능 개발 및 유지보수 처리 속도 30% 향상',
          '구두 처리 업무 문서화',
        ],
      },
      {
        label: '역할',
        value: [
          '기능 개발 - ITSM 솔루션 신규 기능 개발 및 유지보수',
          '환경 구성 - Docker 활용 개발 환경 설정',
          '배포 및 유지보수 - 시스템 운영 및 장애 대응',
          '사용자 지원 - 고객사 대상 사용법 안내 및 요구사항 조율',
        ],
      },
      { label: '기술', value: 'React, Java, Spring Boot, JPA, Docker' },
    ],
  },
  {
    title: '외주 작업 / 웹 퍼블리싱',
    data: [
      { label: '기간', value: '2021.08 ~ 2022.06(11개월)' },
      { label: '프로젝트명', value: '기업 웹사이트 구축/이벤트 페이지 작업' },
      {
        label: '성과',
        value: ['클라이언트 요구사항 100% 반영', '프로젝트 일정 준수 및 품질 유지', '재계약율 80% 이상 유지'],
      },
      {
        label: '역할',
        value: ['웹 퍼블리싱 - 반응형 웹페이지 및 UI 구현', '고객 커뮤니케이션 – 요구사항 정리 및 피드백 반영', '추가 개발 - 간단한 기능 개발 및 유지보수'],
      },
      { label: '기술', value: 'HTML, CSS, JavaScript, jQuery, PHP' },
    ],
  },
  {
    title: '웹 에이전시 / 웹 퍼블리싱',
    data: [
      { label: '기간', value: '2018.07 ~ 2020.11(2년 5개월)' },
      { label: '프로젝트명', value: '기업/공공기관 웹사이트 구축' },
      {
        label: '성과',
        value: ['프로젝트 납기 준수율 100%', '접근성 및 반응형 최적화로 웹사이트 품질 향상', '기획-개발 간 커뮤니케이션 효율 증대 기여'],
      },
      {
        label: '역할',
        value: [
          '웹 퍼블리싱 - HTML, CSS, JS 활용한 화면 디자인 구현',
          '디자인 구현 - 기획/디자인 시안 반영 및 인터랙션 추가',
          '협업 조율 - 기획자-백엔드 개발자와 기능 연계 논의',
          '웹 표준/접근성 준수 - 최적화된 코드 작성',
        ],
      },
      { label: '기술', value: 'HTML, CSS, JavaScript, jQuery' },
    ],
  },
];

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
        <div className='relative z-10 w-full border-b border-gray-200 text-center text-sm font-medium text-gray-500 md:text-lg xl:text-lg dark:border-gray-700 dark:text-gray-400'>
          <ul className='-mb-px flex w-full flex-wrap'>
            {tabTitles.map((title, index) => (
              <li className='me-2' key={index}>
                <button
                  onClick={() => setActiveTab(index)}
                  className={`inline-block rounded-t-lg border-b-2 px-4 py-2 ${
                    activeTab === index
                      ? 'border-sky-700 font-bold text-sky-700 dark:border-sky-500 dark:text-sky-500'
                      : 'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ul className='pt-4 pr-4 pl-4 text-left text-lg lg:pr-0'>
          {experiences.map(
            (exp, index) =>
              activeTab === index && (
                <li key={index} className='mb-8'>
                  <h3 className='mb-4 text-xl font-bold'>{exp.title}</h3>

                  <div className='w-full border-collapse text-left text-sm text-gray-600 lg:block rtl:text-right dark:text-gray-400'>
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
          lightSrc={`/images/career.webp`}
          darkSrc={`/images/career_w.webp`}
          alt={'My career step'}
          width={700}
          height={700}
          priority
        />
      </motion.div>
    </section>
  );
}
