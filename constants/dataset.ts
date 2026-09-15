export const EXPERIENCE_TABS = ['시스원(SysOne)', '프리랜서', '미르나인(Mir9)'];
export const EXPERIENCE = [
  {
    title: 'ITSM 솔루션 v2.0 차세대 전면 리뉴얼 및 개발',
    data: [
      { label: '기간', value: '2022.07 ~ 2024.11(2년 5개월)' },
      { label: '프로젝트명', value: 'B2B IT 자산 관리 시스템(ITSM) v2.0' },
      {
        label: '성과',
        value: [
          '레거시 시스템을 엔터프라이즈급 ITSM v2.0으로 전면 재구축',
          '프론트엔드 파트 리딩 및 공통 컴포넌트 라이브러리 구축 주도',
          'Redux 보일러플레이트를 줄이고 Recoil로 상태 관리 마이그레이션',
        ],
      },
      {
        label: '역할',
        value: [
          'Dynamic Tree UI 및 백엔드 권한 필터링 기반 RBAC 구현',
          '폐쇄망 환경의 정적 자원 관리 및 패키지 의존성 제어',
          'Spring Boot/JPA REST API 설계 및 Linux/Docker 배포 자동화',
        ],
      },
      { label: '기술', value: 'React, Recoil, Java, Spring Boot, Spring Data JPA, Linux, Docker' },
    ],
  },
  {
    title: '외주 작업 / 웹 퍼블리싱',
    data: [
      { label: '기간', value: '2021.08 ~ 2022.06(11개월)' },
      { label: '프로젝트명', value: '토니모리, AHC 등 브랜드 이벤트 페이지 및 CMS 구축' },
      {
        label: '성과',
        value: ['다수 브랜드 이벤트 페이지 및 CMS 추가 구축', '퇴사 후에도 기술 자문 및 프로젝트 의뢰 수주'],
      },
      {
        label: '역할',
        value: ['웹 퍼블리싱 - 반응형 웹페이지 및 UI 구현', '고객 커뮤니케이션 - 요구사항 정리 및 피드백 반영', '추가 개발 - CMS 기능 개발 및 유지보수'],
      },
      { label: '기술', value: 'HTML5, CSS3, JavaScript, jQuery, PHP' },
    ],
  },
  {
    title: '웹 에이전시 / 웹 퍼블리싱',
    data: [
      { label: '기간', value: '2018.07 ~ 2020.11(2년 5개월)' },
      { label: '프로젝트명', value: '다양한 산업군 기업 홍보 및 이벤트 사이트 구축' },
      {
        label: '성과',
        value: ['SCSS 기반 모듈형 CSS 설계', '크로스 브라우징·반응형·웹 접근성(WA) 100% 최적화', '시맨틱 마크업을 통한 SEO 품질 개선'],
      },
      {
        label: '역할',
        value: [
          '웹 퍼블리싱 - HTML, CSS, JS 활용한 화면 디자인 구현',
          '디자인 구현 - 기획/디자인 시안 반영 및 인터랙션 추가',
          '협업 조율 - 기획자·백엔드 개발자와 기능 연계 논의',
          '웹 표준·접근성 준수 - 최적화된 시맨틱 코드 작성',
        ],
      },
      { label: '기술', value: 'HTML5, CSS3, SCSS/SASS, JavaScript, jQuery' },
    ],
  },
];

interface TimelineEntry {
  date: string;
  title: string;
  description: string;
  gameDescription?: string;
  color: 'blue' | 'purple' | 'yellow';
  skillSet: string[];
  spotKey: string;
  textClass: string;
}
export const EDUCATION: TimelineEntry[] = [
  {
    date: '2024.03 - 2026.02',
    title: '방송통신대학교 컴퓨터과학과',
    description: '편입·졸업 (학점 4.1 / 4.5)',
    gameDescription: '편입·졸업',
    color: 'blue',
    skillSet: ['공학 지식'],
    spotKey: 'cs',
    textClass: 'text-blue-300',
  },
  {
    date: '2012.03 - 2018.02',
    title: '인천대학교 국어국문학과',
    description: '졸업 (학점 3.84 / 4.5)',
    gameDescription: '졸업',
    color: 'yellow',
    skillSet: ['커뮤니케이션 능력', '인문학적 사고'],
    spotKey: 'kl',
    textClass: 'text-yellow-300',
  },
];
