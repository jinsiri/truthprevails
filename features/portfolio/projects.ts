import type { Project } from './types';

export const PROJECTS: Project[] = [
  {
    date: '2026.03 1차 완료 · 수시 업데이트',
    title: 'TRUTH WORLD',
    description: '게임형·클래식 듀얼 모드로 이력을 소개하는 개인 포트폴리오 웹사이트 (1인)',
    stack: 'Next.js 16, React 19, TypeScript, Zustand, Framer Motion, Tailwind CSS',
    link: { href: 'https://github.com/jinsiri/truthprevails', label: 'GitHub' },
    isCurrentSite: true,
  },
  {
    date: '2026.01 ~ 2026.06',
    title: 'EASY-C',
    description: '조직도·부서원 일괄 이동과 회원 관리 기능을 담은 그룹웨어 (3인)',
    stack: 'Next.js, TypeScript, Zustand, Java, Spring Boot, PostgreSQL',
    link: { href: 'https://github.com/jinsiri/easy-c', label: 'GitHub' },
  },
  {
    date: '2026.07 ~ 진행 중',
    title: 'SEORO-SEORO',
    description: '가입 방식별 승인과 모임 권한을 관리하는 교환 독서 모임 서비스 (3인)',
    stack: 'Next.js, TypeScript, TanStack Query, Zustand, Supabase, Tailwind CSS',
    link: { href: 'https://seoro-seoro.vercel.app', label: '서비스 보기' },
  },
];
