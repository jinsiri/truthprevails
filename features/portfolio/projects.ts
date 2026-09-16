import type { Project } from './types';

export const PROJECTS: Project[] = [
  {
    date: '2026.03 1차 완료 · 수시 업데이트',
    title: 'TRUTH WORLD',
    description: '게임형·클래식 듀얼 모드로 이력을 소개하는 개인 포트폴리오 웹사이트',
    stack: 'Next.js 15, React 19, TypeScript, Zustand, Framer Motion, Tailwind CSS',
  },
  {
    date: '2026.01 ~ 2026.06',
    title: 'EASY-C',
    description: '조직도·부서 트리 관리 기능을 담은 그룹웨어 웹 애플리케이션',
    stack: 'Next.js, TypeScript, Zustand, Java, PostgreSQL',
  },
  {
    date: '2026.07 ~ 진행 중',
    title: 'SEORO-SEORO',
    description: '모임 권한과 독서 기록을 관리하는 독서 모임 웹 애플리케이션',
    stack: 'Next.js, TypeScript, TanStack Query, Zustand, Supabase',
  },
];
