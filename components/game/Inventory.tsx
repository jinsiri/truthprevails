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
      <span className='text-3xl'>{icon}</span>
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
            <InventoryItem icon='📜' name='정보처리기사' description='CS 기초 지식과 설계 능력을 마스터했음을 증명하는 고대 문서입니다.' />
            <InventoryItem icon='💎' name='SQLD' description='정교한 데이터 모델링과 쿼리 최적화 능력이 깃든 보석입니다.' />

            <InventoryItem icon='🎖️' name='Senior Badge' description='5년+ 프론트엔드 전장을 누비며 얻은 시니어 개발자의 완장입니다.' />
            <InventoryItem icon='📝' name='TroubleShooter' description='복잡한 장애 상황에서도 침착하게 원인을 찾아 해결하는 기록장입니다.' />

            <InventoryItem icon='🎨' name='Figma' description='디자인 시스템을 깊이 이해하고 완벽하게 코드로 구현하는 붓입니다.' />
            <InventoryItem icon='👁️' name='Code Reviewer' description='동료의 코드를 분석하고 성장을 돕는 날카로운 통찰력의 눈입니다.' />
            <InventoryItem icon='📢' name='Speaker' description='기획/디자인과 기술적 간극을 좁히는 원활한 소통 능력을 상징합니다.' />
            <InventoryItem icon='🐙' name='Git Flow' description='코드의 흐름을 관리하고 안정적인 협업을 조율하는 신비로운 깃털입니다.' />

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
