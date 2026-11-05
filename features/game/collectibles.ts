import type { Collectible } from './types';

export const COLLECTIBLE_QUEST_ID = 5;

// x: 월드 가로 위치(%) / height: 지면에서 띄운 높이(캐릭터 키 배수).
// 1단 점프로는 약 1.75까지, 2단 점프로는 약 2.65까지 닿는다(머리 기준). 2는 2단 점프를 언제 눌러도 닿는 높이
export const COLLECTIBLES: Collectible[] = [
  {
    id: 'coffee',
    name: '모닝 커피',
    icon: 'coffee',
    x: 34.5,
    height: 1.3,
    message: '진실의 아침을 깨우는 한 잔입니다. 해가 떠 있는 동안 집중력이 최고치에 도달합니다.',
  },
  {
    id: 'book',
    name: '손때 묻은 소설책',
    icon: 'book',
    x: 66.5,
    height: 1.6,
    message: '닳도록 읽은 소설책입니다. 문학으로 다진 문해력이 기획서와 API 문서 독해에서 빛을 발합니다.',
  },
  {
    id: 'puzzle',
    name: '잃어버린 퍼즐 조각',
    icon: 'puzzle',
    x: 90,
    height: 2,
    message: '복잡한 로직의 마지막 빈칸을 채우는 조각입니다. 어려운 문제일수록 진실의 의욕이 차오릅니다.',
  },
];
