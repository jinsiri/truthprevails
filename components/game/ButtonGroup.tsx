'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { useUIStore } from '@/store/useUIStore';
import type { ViewType } from '@/features/game/types';

const PANEL_VIEWS: ViewType[] = ['statWindow', 'skillWindow', 'inventoryWindow', 'questWindow'];

interface ButtonGroupProps {
  children: React.ReactNode;
  leading?: React.ReactNode;
  positionClass?: string;
  direction?: 'row' | 'col';
}

export function ButtonGroup({ children, leading, positionClass = 'top-8 right-8', direction = 'col' }: ButtonGroupProps) {
  const activeView = useUIStore((state) => state.activeView);
  const [isOpen, setIsOpen] = useState(false);

  const isExpanded = isOpen || PANEL_VIEWS.includes(activeView);

  return (
    <div className={`fixed ${positionClass} z-50 flex flex-col items-end gap-2`}>
      <div className='flex gap-2'>
        {leading}
        <button
          type='button'
          aria-label={isExpanded ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={isExpanded}
          onClick={() => setIsOpen((open) => !open)}
          className='inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-sm border-2 border-black bg-stone-800 p-2 text-white md:hidden'
        >
          {isExpanded ? <IconX /> : <IconMenu2 />}
        </button>
      </div>
      <div className={clsx('flex gap-2', direction === 'col' ? 'flex-col' : 'flex-row', !isExpanded && 'max-md:hidden')}>{children}</div>
    </div>
  );
}
