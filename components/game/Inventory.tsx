'use client';

import { useUIStore } from '@/store/useUIStore';
import { X, BriefcaseBusiness } from 'lucide-react';
import useQuestStore from '@/store/useQuestStore';

interface InventoryItemProps {
  icon: string;
  name: string;
  level?: number;
  description: string;
}

const InventoryItem = ({ icon, name, level, description }: InventoryItemProps) => {
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

export default function Inventory() {
  const { activeView, openView, closeView, hoveredItem } = useUIStore();
  const incrementProgress = useQuestStore((state) => state.incrementProgress);

  return (
    <section className={'relative'}>
      {activeView === 'inventoryWindow' && (
        <div className='animate-in fade-in zoom-in-95 absolute top-0 right-0 z-51 w-80 rounded-sm border-4 border-stone-950 bg-stone-800 p-5 text-stone-200 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] duration-200'>
          <button
            className='absolute top-0 right-0 inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center text-stone-400 transition-colors hover:text-white'
            onClick={closeView}
          >
            <X size={20} />
          </button>

          <h3 className='mb-5 flex items-center gap-2 border-b-2 border-stone-600 pb-2 text-base font-black tracking-tighter text-white uppercase'>
            <span className='text-xl text-yellow-400'>🎒</span> INVENTORY (8/16)
          </h3>

          <div className='mb-4 grid grid-cols-4 gap-2'>
            <InventoryItem icon='📜' name='정보처리기사' description='CS 기초 지식과 설계 능력을 마스터했음을 증명하는 고대 문서입니다.' />
            <InventoryItem icon='💎' name='SQLD' description='정교한 데이터 모델링과 쿼리 최적화 능력이 깃든 보석입니다.' />
            <InventoryItem icon='🎖️' name='6Y+ Badge' description='6년+ IT 전장을 누비며 얻은 경력 개발자의 완장입니다.' />
            <InventoryItem icon='📝' name='TroubleShooter' description='복잡한 장애 상황에서도 침착하게 원인을 찾아 해결하는 기록장입니다.' />
            <InventoryItem icon='🎨' name='Figma' description='디자인 시스템을 깊이 이해하고 완벽하게 코드로 구현하는 붓입니다.' />
            <InventoryItem icon='👁️' name='Code Reviewer' description='동료의 코드를 분석하고 성장을 돕는 날카로운 통찰력의 눈입니다.' />
            <InventoryItem icon='📢' name='Speaker' description='기획/디자인과 기술적 간극을 좁히는 원활한 소통 능력을 상징합니다.' />
            <InventoryItem icon='🐙' name='Git Flow' description='코드의 흐름을 관리하고 안정적인 협업을 조율하는 신비로운 문어입니다.' />

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
                <p className='mt-2 text-right text-[9px] font-bold tracking-widest text-stone-500 uppercase'>Jinsil's Items</p>
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center text-[12px] text-stone-400'>
                <p>마우스를 올리거나 탭 키를 누르면</p>
                <p className={'opacity-60'}>아이템을 조사할 수 있어요!</p>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => {
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
