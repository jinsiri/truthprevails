'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ClassicCareer() {
  const [activeTab, setActiveTab] = useState(0);
  const tabTitles = ['SysOne (시스원)', '프리랜서', 'Mir9'];

  return (
    <section className={'relative flex h-screen flex-col items-end bg-sky-300'}>
      <h2 className={'top-20 left-0 text-left text-4xl font-black uppercase md:text-5xl lg:text-7xl xl:absolute'}>_Career</h2>
      <div className={'w-full lg:w-1/2 xl:w-2/3 xl:pt-40'}>
        <Image
          className={'absolute bottom-0 left-0 -scale-x-100'}
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/career.png`}
          alt={'My career step'}
          width={700}
          height={700}
        />

        <div className='relative z-10 w-full border-b border-gray-200 text-center text-xl font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400'>
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

        <ul className='pt-4 pl-4 text-lg'>
          {activeTab === 0 && (
            <li>
              <h3 className='mb-4 text-xl font-bold'>ITSM 솔루션 개발</h3>
              <div className='relative w-full overflow-x-auto'>
                <table className={'table-default'}>
                  <tbody>
                    <tr>
                      <th>기간</th>
                      <td>2022.07 ~ 2024.11(2년 5개월)</td>
                    </tr>
                    <tr>
                      <th>프로젝트명</th>
                      <td>ITSM 솔루션 개발 및 유지보수</td>
                    </tr>
                    <tr>
                      <th>성과</th>
                      <td>
                        <ul>
                          <li>고객 요구사항 90% 이상 충족</li>
                          <li>시스템 운영 및 고객사 대응 프로세스 정립</li>
                          <li>신규 기능 개발 및 유지보수 처리 속도 30% 향상</li>
                          <li>구두 처리 업무 문서화</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th>역할</th>
                      <td>
                        <ul>
                          <li>기능 개발 - ITSM 솔루션 신규 기능 개발 및 유지보수</li>
                          <li>환경 구성 - Docker 활용 개발 환경 설정</li>
                          <li>배포 및 유지보수 - 시스템 운영 및 장애 대응</li>
                          <li>사용자 지원 - 고객사 대상 사용법 안내 및 요구사항 조율</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th>기술</th>
                      <td>React, Java, Spring Boot, JPA, Docker</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          )}

          {activeTab === 1 && (
            <li>
              <h3 className='mb-4 text-xl font-bold'>외주 작업 / 웹 퍼블리싱</h3>
              <div className='relative w-full overflow-x-auto'>
                <table className={'table-default'}>
                  <tbody>
                    <tr>
                      <th>기간</th>
                      <td>2021.08 ~ 2022.06(11개월)</td>
                    </tr>
                    <tr>
                      <th>프로젝트명</th>
                      <td>기업 웹사이트 구축/이벤트 페이지 작업</td>
                    </tr>
                    <tr>
                      <th>성과</th>
                      <td>
                        <ul>
                          <li>클라이언트 요구사항 100% 반영</li>
                          <li>프로젝트 일정 준수 및 품질 유지</li>
                          <li>재계약율 80% 이상 유지</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th>역할</th>
                      <td>
                        <ul>
                          <li>웹 퍼블리싱 - 반응형 웹페이지 및 UI 구현</li>
                          <li>고객 커뮤니케이션 – 요구사항 정리 및 피드백 반영</li>
                          <li>추가 개발 - 간단한 기능 개발 및 유지보수</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th>기술</th>
                      <td>HTML, CSS, JavaScript, jQuery, PHP</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          )}

          {activeTab === 2 && (
            <li>
              <h3 className='mb-4 text-xl font-bold'>웹 에이전시 / 웹 퍼블리싱</h3>
              <div className='relative w-full overflow-x-auto'>
                <table className={'table-default'}>
                  <tbody>
                    <tr>
                      <th>기간</th>
                      <td>2018.07 ~ 2020.11(2년 5개월)</td>
                    </tr>
                    <tr>
                      <th>프로젝트명</th>
                      <td>브랜드/공공기관 웹사이트 구축</td>
                    </tr>
                    <tr>
                      <th>성과</th>
                      <td>
                        <ul>
                          <li>프로젝트 납기 준수율 100%</li>
                          <li>접근성 및 반응형 최적화로 웹사이트 품질 향상</li>
                          <li>기획-개발 간 커뮤니케이션 효율 증대 기여</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th>역할</th>
                      <td>
                        <ul>
                          <li>웹 퍼블리싱 - HTML, CSS, JS 활용한 화면 디자인 구현</li>
                          <li>디자인 구현 - 기획/디자인 시안 반영 및 인터랙션 추가</li>
                          <li>협업 조율 - 기획자-백엔드 개발자와 기능 연계 논의</li>
                          <li>웹 표준/접근성 준수 - 최적화된 코드 작성</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th>기술</th>
                      <td>HTML, CSS, JavaScript, jQuery</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
