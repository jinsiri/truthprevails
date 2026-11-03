import type { Experience } from './types';

export const EXPERIENCE_TABS = ['시스원(SysOne)', '프리랜서', '미르나인(Mir9)'];
export const EXPERIENCE: Experience[] = [
  {
    title: 'ITSM 솔루션 v2.0 리뉴얼 및 개발',
    data: [
      { label: '기간', value: '2022.07 ~ 2024.11(2년 5개월)' },
      { label: '프로젝트명', value: 'B2B IT 자산 관리 시스템(ITSM) v2.0' },
      {
        label: '성과',
        value: [
          '상세 조회 API에 객체별 접근 권한 검사를 추가해 문서 ID 변경을 통한 비인가 조회 차단',
          '반복되던 목록·선택 UI를 단일·다중 선택 공통 컴포넌트로 통합해 여러 업무 화면에 적용',
          'Redux에서 Recoil로 상태 관리 전체 전환 직접 수행',
          '장비 배치 편집 후 전체 재조회 대신 변경 항목만 반영해 중복 조회 감소',
        ],
      },
      {
        label: '역할',
        value: [
          '3인 개발팀에서 프론트엔드 설계 주도, 기획·디자인 전담자 없이 화면 구성과 사용자 동선 설계',
          '권한 상속 조회 로직(Spring Boot)과 React 권한 설정 트리 UI 개발',
          '폐쇄망 환경의 이미지 조회 API 연동 공통 컴포넌트 개발',
          'Linux/Docker 환경 셸 스크립트 배포, 정적 자원 및 패키지 의존성 관리',
        ],
      },
      { label: '기술', value: 'React, Recoil, Redux, Java, Spring Boot, Spring Data JPA, PostgreSQL, Linux, Docker' },
    ],
  },
  {
    title: '외주 작업 / 웹 퍼블리싱',
    data: [
      { label: '기간', value: '2021.08 ~ 2022.06(11개월)' },
      { label: '프로젝트명', value: '토니모리, AHC 등 브랜드 이벤트 페이지 및 CMS 구축' },
      {
        label: '성과',
        value: ['다수 브랜드 이벤트 페이지 및 CMS 추가 구축', '이전 재직처·파트너사에서 후속 프로젝트 의뢰'],
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
        value: ['SCSS 기반 모듈형 CSS 설계', '브라우저 호환성·반응형·웹 접근성을 고려한 구현', '시맨틱 마크업을 통한 SEO 품질 개선'],
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
