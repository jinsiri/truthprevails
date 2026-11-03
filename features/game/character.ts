import type { CharacterStat, MasteredSkill } from './types';

// MAIN: 실무에서 주력으로 사용 / SUB: 개인·팀 프로젝트에서 사용
export const MASTERED_SKILLS: MasteredSkill[] = [
  { label: 'React', tier: 'MAIN', source: 'ITSM 던전 · 공통 컴포넌트, 권한 트리 UI' },
  { label: 'Recoil / Redux', tier: 'MAIN', source: 'ITSM 던전 · 상태 관리 전체 전환' },
  { label: 'Java / Spring Boot / JPA', tier: 'MAIN', source: 'ITSM 던전 · 객체별 권한 검사, 트리 API' },
  { label: 'PostgreSQL', tier: 'MAIN', source: 'ITSM 던전 · 권한 상속 조회 로직' },
  { label: 'Linux / Docker', tier: 'MAIN', source: 'ITSM 던전 · 폐쇄망 배포, 의존성 관리' },
  { label: 'HTML / CSS / SCSS', tier: 'MAIN', source: '퍼블리싱 길드 · 반응형, 웹 접근성' },
  { label: 'Next.js / TypeScript', tier: 'SUB', source: 'EASY-C · SEORO-SEORO · TRUTH WORLD 퀘스트' },
  { label: 'Zustand', tier: 'SUB', source: 'EASY-C · TRUTH WORLD 퀘스트' },
  { label: 'TanStack Query', tier: 'SUB', source: 'SEORO-SEORO 퀘스트 · 조회·변경 흐름' },
  { label: 'Supabase', tier: 'SUB', source: 'SEORO-SEORO 퀘스트 · DB 설계, RPC' },
  { label: 'Tailwind CSS', tier: 'SUB', source: 'TRUTH WORLD · SEORO-SEORO 퀘스트' },
  { label: 'Vercel', tier: 'SUB', source: 'SEORO-SEORO 퀘스트 · 배포' },
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
