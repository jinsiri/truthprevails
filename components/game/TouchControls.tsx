'use client';

import { PointerEvent, ReactNode } from 'react';
import clsx from 'clsx';
import { IconArrowBigUpLines, IconCaretLeftFilled, IconCaretRightFilled, IconDoorEnter } from '@tabler/icons-react';
import type { Direction } from '@/features/game/types';

interface TouchControlsProps {
  onMove: (direction: Direction | null) => void;
  onJump: () => void;
  onEnter: () => void;
  enterLabel: string | null;
}

export const touchButtonClass =
  'flex h-14 min-w-14 cursor-pointer touch-none items-center justify-center gap-1 rounded-lg border-4 border-black px-2 font-bold text-gray-950 select-none active:translate-y-0.5';

function HoldButton({ label, onHold, onRelease, children }: { label: string; onHold: () => void; onRelease: () => void; children: ReactNode }) {
  const handleDown = (event: PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    onHold();
  };

  return (
    <button
      aria-label={label}
      className={clsx(touchButtonClass, 'bg-gray-100 active:bg-gray-300')}
      onPointerDown={handleDown}
      onPointerUp={onRelease}
      onPointerCancel={onRelease}
      onLostPointerCapture={onRelease}
    >
      {children}
    </button>
  );
}

export default function TouchControls({ onMove, onJump, onEnter, enterLabel }: TouchControlsProps) {
  return (
    <div className='pointer-events-none fixed right-6 bottom-24 left-6 z-60 flex items-end justify-between'>
      <div className='pointer-events-auto flex gap-3'>
        <HoldButton label='왼쪽으로 이동' onHold={() => onMove('left')} onRelease={() => onMove(null)}>
          <IconCaretLeftFilled size={28} />
        </HoldButton>
        <HoldButton label='오른쪽으로 이동' onHold={() => onMove('right')} onRelease={() => onMove(null)}>
          <IconCaretRightFilled size={28} />
        </HoldButton>
      </div>

      <div className='pointer-events-auto flex gap-3'>
        <button aria-label='점프' className={clsx(touchButtonClass, 'bg-gray-100 active:bg-gray-300')} onPointerDown={onJump}>
          <IconArrowBigUpLines size={26} />
        </button>
        <button
          aria-label={enterLabel ? `${enterLabel} 입장` : '입장'}
          disabled={!enterLabel}
          className={clsx(touchButtonClass, enterLabel ? 'animate-pulse bg-amber-200' : 'bg-gray-100 opacity-50')}
          onClick={onEnter}
        >
          <IconDoorEnter size={24} />
          <span className='text-sm'>입장</span>
        </button>
      </div>
    </div>
  );
}
