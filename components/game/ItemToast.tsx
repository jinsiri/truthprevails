import { IconX } from '@tabler/icons-react';
import type { Collectible } from '@/features/game/types';
import { CollectibleIcon } from './CollectibleItem';

interface ItemToastProps {
  item: Collectible;
  count: number;
  total: number;
  onClose: () => void;
}

export default function ItemToast({ item, count, total, onClose }: ItemToastProps) {
  return (
    <div
      role='status'
      onClick={onClose}
      className='animate-item-toast fixed top-28 right-18 left-4 z-60 flex cursor-pointer items-start gap-3 rounded-xl border-4 border-black bg-black/80 py-3 pr-9 pl-4 text-white md:top-24 md:right-auto md:left-1/2 md:w-[90%] md:max-w-md md:-translate-x-1/2'
    >
      <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-md border-[3px] border-black bg-yellow-200 text-[#5c2b03]'>
        <CollectibleIcon icon={item.icon} className='h-7 w-7' />
      </span>
      <p className='text-sm break-keep md:text-base'>
        <strong className='mb-1 block text-yellow-300'>
          {item.name} 획득! ({count}/{total})
        </strong>
        {item.message}
      </p>
      <button type='button' aria-label='닫기' className='absolute top-2 right-2 cursor-pointer text-white/70 hover:text-white'>
        <IconX size={18} />
      </button>
    </div>
  );
}
