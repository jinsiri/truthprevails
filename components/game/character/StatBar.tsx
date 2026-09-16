import type { CharacterStat } from '@/features/game/types';

export const StatBar = ({ label, level, colorClass, description }: CharacterStat) => {
  return (
    <div className='group relative mb-5'>
      <div className='mb-1 flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <span className='text-sm font-bold tracking-tight text-amber-900'>{label}</span>

          {description && (
            <div className='relative'>
              <span className='flex h-3.5 w-3.5 cursor-help items-center justify-center rounded-full border border-amber-400 bg-amber-200 text-[10px] font-bold text-amber-800 transition-colors hover:bg-amber-300'>
                ?
              </span>

              <div className='pointer-events-none absolute top-[100%] left-1/2 z-50 w-48 -translate-x-1/2 translate-y-[4px] rounded border border-stone-600 bg-stone-800 p-2 text-[12px] leading-relaxed break-keep text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100'>
                {/*<div className='absolute top-1/2 -left-1 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-l border-stone-600 bg-stone-800'></div>*/}
                {description}
              </div>
            </div>
          )}
        </div>
        <span className='font-mono text-[10px] text-amber-700'>LV.{level}</span>
      </div>

      <div className='h-4 w-full border-2 border-stone-800 bg-stone-200 p-[1px]'>
        <div className={`h-full ${colorClass} transition-all duration-1000 ease-out`} style={{ width: `${level}%` }}></div>
      </div>
    </div>
  );
};
