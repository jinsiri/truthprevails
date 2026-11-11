import Image from 'next/image';
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
}

export default function PlayerCharacter({ position, positionY, lastDirection, frame, isJumping, isEntering, activeObject, isMobile }: PlayerCharacterProps) {
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

      <Image src={imageSrc} alt='character' width={154} height={154} priority style={{ transform: transformStyle }} />
    </div>
  );
}
