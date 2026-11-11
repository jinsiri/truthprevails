import Image from 'next/image';
import { IconCaretDownFilled } from '@tabler/icons-react';
import { MOBILE_WORLD_WIDTH } from '@/features/game/world';
import type { InteractionPoint } from '@/features/game/types';

interface BuildingButtonProps {
  building: InteractionPoint;
  isActive: boolean;
  onClick: () => void;
}

export default function BuildingButton({ building, isActive, onClick }: BuildingButtonProps) {
  return (
    <button
      className={`group absolute z-20 cursor-pointer rounded-xl p-6 focus:outline-none ${building.style}`}
      style={{ aspectRatio: building.width / building.height }}
      onClick={onClick}
    >
      <span
        className={`absolute inset-0 top-1/2 left-1/2 hidden -translate-1/2 overflow-hidden rounded-full bg-gradient-to-r from-yellow-300/30 via-orange-400/20 to-white/20 opacity-0 blur-md transition-all duration-500 group-focus:scale-130 group-focus:opacity-100 md:block dark:from-blue-500/50 dark:via-purple-500/50 dark:to-pink-500/50`}
        style={{ width: '100%', aspectRatio: 1 }}
      ></span>
      <Image
        className='relative'
        src={building.image}
        alt={building.name}
        fill
        sizes={`(max-width: 767px) ${Math.round((MOBILE_WORLD_WIDTH * building.widthPercent) / 100)}px, ${building.widthPercent}vw`}
      />
      {!isActive && (
        <span
          aria-hidden
          className='pointer-events-none absolute -translate-x-1/2 -translate-y-full animate-bounce text-yellow-300 [filter:drop-shadow(0_0_1px_#000)_drop-shadow(0_0_1px_#000)_drop-shadow(0_2px_0_#000)]'
          style={{ left: `${building.door.x}%`, top: `${building.door.y}%` }}
        >
          <IconCaretDownFilled className='h-9 w-9 md:h-10 md:w-10' />
        </span>
      )}
    </button>
  );
}
