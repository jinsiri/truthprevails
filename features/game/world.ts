import { IMAGE_ROOT } from '@/constants/imageSrc';
import type { Direction, InteractionPoint } from './types';

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
    left: 5,
    range: [12, 18],
    path: '/game/learning',
    image: `${IMAGE_ROOT}/images/game/school.webp`,
    width: 990,
    height: 775,
    style: 'bottom-[76%] left-[5%] w-[28%]',
  },
  {
    id: 'office',
    name: '회사',
    left: 36,
    range: [44, 49],
    path: '/game/career',
    image: `${IMAGE_ROOT}/images/game/building.webp`,
    width: 557,
    height: 691,
    style: 'bottom-[80%] left-[36%] w-[29%]',
  },
  {
    id: 'info',
    name: '인포센터',
    left: 69,
    range: [68, 71],
    path: '/game/contact',
    image: `${IMAGE_ROOT}/images/game/info.webp`,
    width: 280,
    height: 323,
    style: 'bottom-[80%] left-[69%] w-[15%]',
  },
];
