import type { Project } from './types';

export const PROJECTS: Project[] = [
  {
    date: '2026.03 1차 완료 · 수시 업데이트',
    title: 'TRUTH WORLD',
    description: '게임형·클래식 듀얼 모드로 이력을 소개하는 개인 포트폴리오 웹사이트 (1인)',
    stack: 'Next.js 16, React 19, TypeScript, Zustand, Framer Motion, Tailwind CSS 4',
    link: { href: 'https://github.com/jinsiri/truthprevails', label: 'GitHub' },
    isCurrentSite: true,
    image: '/images/preview_game_day.png',
    exhibitNote: '이 작품 앞에 서 계신 지금, 사실 작품 속에 계신 거예요. 이 전시장도 제가 직접 지었거든요!',
  },
  {
    date: '2026.01 ~ 2026.06',
    title: 'EASY-C',
    description: '조직도·부서원 일괄 이동과 회원 관리 기능을 담은 그룹웨어 (3인)',
    stack: 'Next.js, TypeScript, Zustand, Java, Spring Boot, PostgreSQL',
    link: { href: 'https://github.com/jinsiri/easy-c', label: 'GitHub' },
    image: '/images/game/easy-c.png',
    exhibitNote: '세 사람이 각자의 색을 섞어 완성한 협업작이에요. 복잡한 조직 구조를 누구나 쉽게 다룰 수 있도록 다듬었답니다.',
  },
  {
    date: '2026.07 ~ 진행 중',
    title: 'SEORO-SEORO',
    description: '가입 방식별 승인과 모임 권한을 관리하는 교환 독서 모임 서비스 (3인)',
    stack: 'Next.js, TypeScript, TanStack Query, Zustand, Supabase, Tailwind CSS',
    link: { href: 'https://seoro-seoro.vercel.app', label: '서비스 보기' },
    image: '/images/game/seoro-seoro.png',
    exhibitNote: '아직 붓을 놓지 않은 신작이에요. 책을 바꿔 읽는 사람들을 위해 매일 덧칠하고 있어요.',
  },
];
