'use client';

import { BriefcaseBusiness, X } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';
import useQuestStore from '@/store/useQuestStore';

interface InventoryItemProps {
  icon: string;
  name: string;
  level?: number;
  description: string;
}

const InventoryItem = ({ icon, name, level, description }: InventoryItemProps) => {
  return (
    <div className='group relative flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-stone-900 bg-stone-700 p-1 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.3)] transition-colors hover:bg-stone-600'>
      <span className='mb-1 text-3xl'>{icon}</span>
      {level && (
        <span className='absolute -right-1 -bottom-1 z-10 rounded-sm border border-blue-900 bg-blue-600 px-1 py-0.5 font-mono text-[9px] text-white'>
          Lv.{level}
        </span>
      )}

      <div className='pointer-events-none absolute bottom-full z-50 mb-3 w-48 rounded border-2 border-stone-500 bg-stone-900 p-2 text-[10px] leading-relaxed text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100'>
        <div className='absolute right-1/2 -bottom-1.5 h-3 w-3 -translate-x-1/2 rotate-45 border-r border-b border-stone-500 bg-stone-900'></div>
        <p className='mb-1 text-[11px] font-bold text-blue-300'>{name}</p>
        <p className='leading-tight text-stone-300'>{description}</p>
      </div>
    </div>
  );
};

export default function Inventory() {
  const { activeView, openView, closeView } = useUIStore();
  const incrementProgress = useQuestStore((state) => state.incrementProgress);

  return (
    <section className={'relative'}>
      {activeView === 'inventoryWindow' && (
        <div className='absolute top-0 right-0 z-51 w-80 rounded-sm border-4 border-stone-950 bg-stone-800 p-5 text-stone-200 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]'>
          <button className={'absolute top-0 right-0 inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center text-white'} onClick={closeView}>
            <X />
          </button>

          <h3 className='mb-5 flex items-center gap-2 border-b-2 border-stone-600 pb-2 text-base font-black text-white'>
            <span className='text-yellow-400'>🎒</span> INVENTORY (24/30)
          </h3>

          <div className='grid grid-cols-4 gap-2'>
            <InventoryItem icon='⚛️' name='React 룬' level={9} description='컴포넌트 설계 및 상태 관리에 특화된 전설적인 룬입니다.' />
            <InventoryItem icon='🔷' name='TypeScript 검' level={8} description='타입 안정성을 확보하여 에러를 베어내는 예리한 검입니다.' />
            <InventoryItem icon='▲' name='Next.js 갑옷' level={8} description='빠른 SSR 성능을 제공하여 사용자 경험을 보호하는 갑옷입니다.' />
            <InventoryItem icon='🍃' name='Tailwind CSS' level={9} description='빠른 스타일링과 일관된 디자인 시스템을 구축하는 유틸리티입니다.' />

            <InventoryItem icon='📜' name='정보처리기사 스크롤' description='컴퓨터 공학 기초 지식을 마스터한 증서입니다.' />
            <InventoryItem icon='🧪' name='토익 물약 (850)' description='글로벌 소통 능력을 일시적으로 상승시키는 물약입니다.' />

            <InventoryItem icon='🐙' name='Git의 깃털' description='모든 프로젝트의 변경 사항을 기록하는 신비로운 깃털입니다.' />
            <InventoryItem icon='🎨' name='Figma의 붓' description='UI/UX 디자인을 시각화하는 마법의 붓입니다.' />

            {[...Array(8)].map((_, i) => (
              <div key={i} className='h-16 w-16 rounded-sm border-2 border-stone-950 bg-stone-900 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.3)]'></div>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => {
          openView('inventoryWindow');
          incrementProgress(3);
        }}
        className='hover:bg-elevated inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-sm border-2 border-black bg-yellow-600 p-2 text-white transition dark:bg-yellow-200 dark:text-black'
        aria-label='Toggle dark mode'
      >
        <BriefcaseBusiness />
      </button>
    </section>
  );
}
