import { IconBook2, IconCoffee, IconPuzzle } from '@tabler/icons-react';
import type { Collectible } from '@/features/game/types';

const ICONS = {
  coffee: IconCoffee,
  book: IconBook2,
  puzzle: IconPuzzle,
} as const;

export function CollectibleIcon({ icon, className }: { icon: Collectible['icon']; className?: string }) {
  const Icon = ICONS[icon];
  return <Icon className={className} stroke={2} />;
}

export default function CollectibleItem({ item }: { item: Collectible }) {
  return (
    <div
      aria-hidden
      className='animate-stardust-float pointer-events-none absolute z-25 flex aspect-square w-[3.5%] -translate-x-1/2 items-center justify-center rounded-md border-[3px] border-black bg-yellow-200 text-[#5c2b03] shadow-[0_3px_0_#000]'
      style={{ left: `${item.x}%`, bottom: `calc(70% + ${item.height * 8}cqw)` }}
    >
      <CollectibleIcon icon={item.icon} className='h-[70%] w-[70%]' />
    </div>
  );
}
