import { IMAGE_ROOT } from '@/constants/imageSrc';
import type { SiteMode } from './types';

export const MODES: SiteMode[] = [
  {
    korNm: '클래식 모드',
    address: '/classic',
    enNm: 'CLASSIC',
    description: '정보 위주로 빠르게 알아보기',
    detail: '소개 · 경력 · 스킬 · 학습 기록',
    image: '/images/classic/about.webp',
    previewImage: {
      day: `${IMAGE_ROOT}/images/preview_classic_day.png`,
      night: `${IMAGE_ROOT}/images/preview_classic_night.png?v=2`,
    },
  },
  {
    korNm: '게임 모드',
    address: '/game',
    enNm: 'GAME',
    description: '직접 탐험하며 인터랙티브 모험해보기',
    detail: '탐험 · 퀘스트 · 스킬 · 방명록',
    image: '/images/game/school.webp',
    previewImage: {
      day: `${IMAGE_ROOT}/images/preview_game_day.png`,
      night: `${IMAGE_ROOT}/images/preview_game_night.png`,
    },
  },
];
