import type { CharacterStat } from './types';

export const MASTERED_SKILLS: CharacterStat[] = [
  {
    label: 'React',
    level: 95,
    colorClass: 'bg-cyan-500',
  },
  {
    label: 'TypeScript',
    level: 90,
    colorClass: 'bg-blue-600',
  },
  {
    label: 'Recoil / Zustand / Redux',
    level: 85,
    colorClass: 'bg-cyan-400',
  },
  {
    label: 'Tailwind / SCSS',
    level: 95,
    colorClass: 'bg-pink-500',
  },
  {
    label: 'Java / Spring Boot',
    level: 80,
    colorClass: 'bg-emerald-600',
  },
  {
    label: 'TanStack Query',
    level: 75,
    colorClass: 'bg-red-500',
  },
  {
    label: 'PostgreSQL / Supabase',
    level: 80,
    colorClass: 'bg-emerald-500',
  },
  {
    label: 'Linux / Docker / Vercel',
    level: 75,
    colorClass: 'bg-slate-500',
  },
];

export const CHARACTER_STATS: CharacterStat[] = [
  {
    label: 'STR (Execution)',
    level: 90,
    colorClass: 'bg-yellow-500',
    description: '기획을 코드로 꽂아넣는 실행력',
  },
  {
    label: 'INT (Logic)',
    level: 85,
    colorClass: 'bg-yellow-700',
    description: '효율적인 데이터 구조와 로직 설계',
  },
  {
    label: 'DEX (Detail)',
    level: 95,
    colorClass: 'bg-orange-500',
    description: '1px도 놓치지 않는 UI 디테일',
  },
  {
    label: 'CHA (Teamwork)',
    level: 95,
    colorClass: 'bg-red-500',
    description: '협업과 소통, 긍정적인 에너지',
  },
  {
    label: 'LUK (Growth)',
    level: 95,
    colorClass: 'bg-orange-700',
    description: '새로운 기술을 빨아들이는 학습 운',
  },
];
