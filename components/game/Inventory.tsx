'use client';

import GameDialog from '@/components/game/GameDialog';

import { useUIStore } from '@/store/useUIStore';
import { X, BriefcaseBusiness } from 'lucide-react';
import useQuestStore from '@/store/useQuestStore';

import { InventoryItem } from './inventory/InventoryItem';
import { INVENTORY_ITEMS } from '@/features/game/inventory';

export default function Inventory() {
  const { activeView, openView, closeView, hoveredItem } = useUIStore();
  const incrementProgress = useQuestStore((state) => state.incrementProgress);

  return (
    <section className={'relative'}>
      {activeView === 'inventoryWindow' && (
        <GameDialog
          label='인벤토리'
          onClose={closeView}
          className='animate-in fade-in zoom-in-95 absolute top-0 right-0 z-51 w-80 rounded-sm border-4 border-stone-950 bg-stone-800 p-5 text-stone-200 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] duration-200'
        >
          <button
            className='absolute top-0 right-0 inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center text-stone-400 transition-colors hover:text-white'
            aria-label='닫기'
            onClick={closeView}
          >
            <X size={20} />
          </button>

          <h3 className='mb-5 flex items-center gap-2 border-b-2 border-stone-600 pb-2 text-base font-black tracking-tighter text-white uppercase'>
            <span className='text-xl text-yellow-400'>🎒</span> INVENTORY (8/16)
          </h3>

          <div className='mb-4 grid grid-cols-4 gap-2'>
            {INVENTORY_ITEMS.map((item) => (
              <InventoryItem key={item.name} {...item} />
            ))}

            {[...Array(8)].map((_, i) => (
              <div key={i} className='h-16 w-16 rounded-sm border-2 border-stone-950 bg-stone-900 opacity-50 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.3)]'></div>
            ))}
          </div>

          <div className='flex h-[110px] w-full flex-col justify-center rounded-sm border-2 border-stone-950 bg-stone-900/50 p-3 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.3)]'>
            {hoveredItem ? (
              <div className='animate-in fade-in slide-in-from-bottom-1 duration-200'>
                <div className='mb-1.5 flex items-center gap-2 border-b border-stone-700 pb-1'>
                  <span className='text-xl'>{hoveredItem.icon}</span>
                  <span className='text-sm font-bold text-yellow-400'>{hoveredItem.name}</span>
                  {hoveredItem.level && <span className='ml-auto font-mono text-[10px] text-blue-400'>LV.{hoveredItem.level}</span>}
                </div>
                <p className='text-[11px] leading-[1.4] text-stone-300 antialiased'>{hoveredItem.description}</p>
                <p className='mt-2 text-right text-[9px] font-bold tracking-widest text-stone-500 uppercase'>Jinsil&apos;s Items</p>
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center text-[12px] text-stone-400'>
                <p>마우스를 올리거나 탭 키를 누르면</p>
                <p className={'opacity-60'}>아이템을 조사할 수 있어요!</p>
              </div>
            )}
          </div>
        </GameDialog>
      )}

      <button
        onClick={(event) => {
          event.currentTarget.focus();
          openView('inventoryWindow');
          incrementProgress(3);
        }}
        className='hover:bg-elevated inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-sm border-2 border-black bg-yellow-600 p-2 text-white transition dark:bg-yellow-200 dark:text-black'
        aria-label='Open Inventory'
      >
        <BriefcaseBusiness />
      </button>
    </section>
  );
}
