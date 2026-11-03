import { traits } from '@/features/portfolio/profile';
import type { Collectible } from './types';

export const COLLECTIBLE_QUEST_ID = 5;

// x: 월드 가로 위치(%) / height: 지면에서 띄운 높이(캐릭터 키 배수, 약 1.9 넘으면 2단 점프 필요)
export const COLLECTIBLES: Collectible[] = [
  {
    id: 'coffee',
    name: '모닝 커피',
    icon: 'coffee',
    x: 34.5,
    height: 1.3,
    message: traits[0],
  },
  {
    id: 'book',
    name: '손때 묻은 소설책',
    icon: 'book',
    x: 66.5,
    height: 1.6,
    message: `${traits[5]} ${traits[6]}`,
  },
  {
    id: 'puzzle',
    name: '마지막 퍼즐 조각',
    icon: 'puzzle',
    x: 90,
    height: 2.3,
    message: traits[3],
  },
];
