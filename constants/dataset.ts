export const EXPERIENCE_TABS = ['시스원(SysOne)', '프리랜서', '미르나인(Mir9)'];
export const EXPERIENCE = [
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

interface TimelineEntry {
  date: string;
  title: string;
  description: string;
  color?: 'blue' | 'green' | 'yellow';
  skillSet: string[];
  spotKey: string;
}
export const EDUCATION: TimelineEntry[] = [
  {
    date: '2024.03 - 2026.02',
    title: '방송통신대학교 컴퓨터과학과',
    description: '편입, 졸업',
    color: 'blue',
    skillSet: ['공학 지식'],
    spotKey: 'cs',
  },
  {
    date: '2012.03 - 2018.02',
    title: '인천대학교 국어국문학과',
    description: '졸업',
    color: 'blue',
    skillSet: ['커뮤니케이션 능력', '인문학적 사고'],
    spotKey: 'kl',
  },
  {
    date: '2009.03 - 2012.02',
    title: '신명여자고등학교',
    description: '졸업',
    color: 'blue',
    skillSet: ['기초 지식'],
    spotKey: 'hs',
  },
];
