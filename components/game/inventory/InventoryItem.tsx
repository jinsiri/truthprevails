'use client';

import { useUIStore } from '@/store/useUIStore';
import type { InventoryItemData } from '@/features/game/types';

export const InventoryItem = ({ icon, name, level, description }: InventoryItemData) => {
  const setHoveredItem = useUIStore((state) => state.setHoveredItem);
  const toggleFigmaMode = useUIStore((state) => state.toggleFigmaMode);

  const handleMouseEnter = () => {
    setHoveredItem({ name, icon, description, level });
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleDoubleClick = () => {
    if (name === 'Figma') {
      toggleFigmaMode();
    }
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      onClick={handleMouseEnter}
      onDoubleClick={handleDoubleClick}
      className='group relative flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-stone-900 bg-stone-700 p-1 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.3)] transition-colors hover:bg-stone-600 active:scale-95'
    >
      <span className='text-3xl select-none'>{icon}</span>

      {level && (
        <span className='absolute -right-1 -bottom-1 z-10 rounded-sm border border-blue-900 bg-blue-600 px-1 py-0.5 font-mono text-[9px] text-white'>
          Lv.{level}
        </span>
      )}
    </button>
  );
};
