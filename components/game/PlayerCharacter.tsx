import Image from 'next/image';
import { IconArrowBigRightFilled } from '@tabler/icons-react';
import { IMAGE_ROOT } from '@/constants/imageSrc';
import type { Direction, InteractionPoint } from '@/features/game/types';

interface PlayerCharacterProps {
  position: number;
  positionY: number;
  lastDirection: Direction;
  frame: number;
  isJumping: boolean;
  isEntering: boolean;
  activeObject: InteractionPoint | null;
  isMobile: boolean;
  showExitHint: boolean;
}

export default function PlayerCharacter({
  position,
  positionY,
  lastDirection,
  frame,
  isJumping,
  isEntering,
  activeObject,
  isMobile,
  showExitHint,
}: PlayerCharacterProps) {
  const isSide = lastDirection === 'left' || lastDirection === 'right';
  const imageSrc = isSide
    ? `${IMAGE_ROOT}/images/game/side_0${isJumping ? 2 : frame + 1}.webp`
    : `${IMAGE_ROOT}/images/game/${lastDirection === 'up' ? 'back' : 'front_book'}.png`;

  const jumpOffset = `translateY(${-positionY * 100}%)`;
  const transformStyle = isSide ? `scaleX(${lastDirection === 'left' ? -1 : 1}) ${jumpOffset}` : jumpOffset;

  const enteringAnimation = isEntering
    ? {
        transform: `${transformStyle} scale(0.8) translateY(20px)`,
        opacity: 0,
        transition: 'all 0.8s ease-in-out',
      }
    : {};

  return (
    <div
      className='absolute bottom-[70%] w-[8%]'
      style={{
        left: `${position}%`,
        zIndex: isEntering ? 15 : 35,
        ...enteringAnimation,
      }}
    >
      {activeObject && !isEntering && (
        <div className='absolute -top-8 left-1/2 flex -translate-x-1/2 flex-col items-center'>
          <div className='animate-bounce rounded border-2 border-black bg-white px-2 py-1 text-xs font-bold whitespace-nowrap'>
            <span className='text-black'>
              {!isMobile && '[W or ↑] '}
              {activeObject.name} 입장
            </span>
          </div>
        </div>
      )}

      {showExitHint && !activeObject && !isEntering && (
        <div aria-hidden className='pointer-events-none absolute -top-12 left-1/2 flex -translate-x-1/2 flex-col items-center'>
          <span className='rounded border-2 border-black bg-white px-2 py-0.5 text-xs font-bold whitespace-nowrap text-black'>인포센터</span>
          <IconArrowBigRightFilled className='animate-nudge-right h-9 w-9 text-yellow-300 [filter:drop-shadow(0_0_1px_#000)_drop-shadow(0_0_1px_#000)_drop-shadow(0_2px_0_#000)] md:h-10 md:w-10' />
        </div>
      )}

      <Image src={imageSrc} alt='character' width={154} height={154} priority style={{ transform: transformStyle }} />
    </div>
  );
}
