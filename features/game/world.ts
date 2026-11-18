import { IMAGE_ROOT } from '@/constants/imageSrc';
import type { Direction, InteractionPoint } from './types';

export const MOBILE_WORLD_WIDTH = 960;

export const keyToDirection: Record<string, Direction> = {
  ArrowRight: 'right',
  ArrowLeft: 'left',
  ArrowUp: 'up',
  ArrowDown: 'down',
  KeyD: 'right',
  KeyA: 'left',
  KeyW: 'up',
  KeyS: 'down',
};

export const INTERACTION_POINTS: InteractionPoint[] = [
  {
    id: 'school',
    name: '학교',
    left: 6,
    range: [12, 17],
    door: { x: 50, y: 63 },
    path: '/game/learning',
    image: `${IMAGE_ROOT}/images/game/school.webp`,
    width: 990,
    height: 775,
    style: 'bottom-[76%] left-[6%] w-[25%]',
    widthPercent: 25,
  },
  {
    id: 'office',
    name: '회사',
    left: 36,
    range: [42, 47],
    door: { x: 50, y: 80 },
    path: '/game/career',
    image: `${IMAGE_ROOT}/images/game/building.webp`,
    width: 557,
    height: 691,
    style: 'bottom-[80%] left-[36%] w-[25%]',
    widthPercent: 25,
  },
  {
    id: 'gallery',
    name: '갤러리',
    left: 64,
    range: [71, 75],
    door: { x: 50, y: 75 },
    path: '/game/gallery',
    image: `${IMAGE_ROOT}/images/game/gallery_v3.png`,
    width: 525,
    height: 423,
    style: 'bottom-[80%] left-[64%] w-[26%]',
    widthPercent: 26,
  },
];

export const EXIT_HINT_POSITION = 87;
