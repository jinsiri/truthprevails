'use client';

import { Scroll, X } from 'lucide-react';
import { useUIStore } from '@/store/useUIStore';

interface QuestItemProps {
  level?: number;
  title: string;
  rewards: string;
  isComplete?: boolean;
}

const QuestItem = ({ level, title, rewards, isComplete = false }: QuestItemProps) => {
  return (
    <div
      className={`border-2 p-4 ${isComplete ? 'border-amber-900 bg-amber-100' : 'border-emerald-900 bg-emerald-50'} relative mb-3 cursor-pointer rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,0.1)] transition-all hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.1)]`}
    >
      <div className='mb-2 flex items-center gap-2'>
        <span
          className={`rounded-sm border px-1 py-0.5 text-[9px] font-bold ${isComplete ? 'border-amber-700 bg-amber-950 text-amber-100' : 'border-emerald-700 bg-emerald-950 text-emerald-100'}`}
        >
          {isComplete ? '★' : `Lv.${level}`}
        </span>
        <h4 className={`text-sm font-black ${isComplete ? 'text-amber-950' : 'text-emerald-950'}`}>{title}</h4>
      </div>

      <div className='flex gap-2 text-[11px] text-stone-700'>
        <span className='font-medium text-amber-700'>보상:</span>
        <span className='leading-tight'>{rewards}</span>
      </div>

      {isComplete && <span className='absolute top-2 right-3 animate-pulse text-2xl text-amber-500'>★</span>}
    </div>
  );
};

export default function QuestLog() {
  return (
    <div className='fixed top-10 right-6 z-50 w-96 rounded-sm border-4 border-amber-900 bg-orange-50 p-6 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]'>
      <h3 className='mb-6 flex items-center gap-2 border-b-2 border-amber-200 pb-2 text-lg font-black text-amber-950'>
        <span className='text-amber-600'>📜</span> QUEST LOG (Active)
      </h3>

      {/* 수행 중인 메인 퀘스트 */}
      <QuestItem level={8} title='[메인] 개인 포트폴리오 사이트 제작' rewards="경험치 +500, '컨셉 천재' 칭호 획득, 3월 서류 합격 확률 상승" />

      {/* 수행 중인 서브 퀘스트 */}
      <QuestItem level={6} title='[서브] Todo List 마법 도구 개발' rewards='React 상태 관리 숙련도 Lv.+1, Tailwind CSS 숙련도 Lv.+2' />

      {/* 완료된 퀘스트 구분선 */}
      <div className='relative my-6 text-center'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-amber-200'></div>
        </div>
        <span className='relative bg-orange-50 px-3 text-xs font-bold tracking-widest text-amber-400'>COMPLETE</span>
      </div>

      {/* 완료된 퀘스트 */}
      <QuestItem title='[경력] 00기업 인턴십 (Front-end)' rewards='개발 실무 프로세스 이해도 획득, 팀워크 능력 강화' isComplete />
    </div>
  );
}

interface QuestProgressItemProps {
  title: string;
  current: number;
  total: number;
  isComplete?: boolean;
}

const QuestProgressItem = ({ title, current, total, isComplete }: QuestProgressItemProps) => {
  return (
    <div className={`mb-2 border-2 p-3 ${isComplete ? 'border-amber-800 bg-amber-100 opacity-70' : 'border-stone-800 bg-white'} transition-all`}>
      <div className='mb-1 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className={`flex h-4 w-4 items-center justify-center border-2 border-stone-800 ${isComplete ? 'bg-emerald-500' : 'bg-stone-200'}`}>
            {isComplete && <span className='text-[10px] text-white'>✔</span>}
          </div>
          <span className={`text-xs font-bold ${isComplete ? 'text-stone-500 line-through' : 'text-stone-900'}`}>{title}</span>
        </div>
        <span className='font-mono text-[10px]'>
          {current}/{total}
        </span>
      </div>

      <div className='h-1 w-full bg-stone-200'>
        <div className='h-full bg-emerald-500 transition-all duration-500' style={{ width: `${(current / total) * 100}%` }}></div>
      </div>
    </div>
  );
};

export function UserQuestLog() {
  const { activeView, openView, closeView } = useUIStore();

  return (
    <section className={'relative'}>
      {activeView === 'questWindow' && (
        <div className='absolute top-0 right-0 z-51 w-80 border-4 border-[#5d4037] bg-[#f4e4bc] p-5 shadow-[6px_6px_0px_rgba(0,0,0,0.2)]'>
          <button className={'absolute top-0 right-0 inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center text-black'} onClick={closeView}>
            <X />
          </button>

          <h3 className='mb-4 flex items-center justify-between border-b-2 border-[#d7ccc8] pb-1 text-sm font-black text-[#3e2723]'>
            <span>📋 현재 수행 중인 퀘스트</span>
          </h3>

          <QuestProgressItem title="신비한 개발자 '진실'의 스탯 확인" current={1} total={1} isComplete={true} />
          <QuestProgressItem title='주력 스킬 인벤토리 조사' current={0} total={1} isComplete={false} />
          <QuestProgressItem title='진실의 모험 기록(프로젝트) 읽기' current={1} total={3} isComplete={false} />
          <QuestProgressItem title="펫 '커밋냥'과 인사하기" current={0} total={1} isComplete={false} />

          <div className='mt-4 border border-[#bcaaa4] bg-[#efebe9] p-2 text-[10px] leading-tight text-[#5d4037]'>
            <strong>💡 Tip:</strong> 모든 단서를 모으면 <span className='font-bold text-emerald-700'>면접 제의</span> 버튼이 활성화됩니다!
          </div>
        </div>
      )}
      <button
        onClick={() => openView('questWindow')}
        className='hover:bg-elevated z-50 inline-flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-sm border-2 border-black bg-purple-600 p-2 text-white transition dark:bg-purple-200 dark:text-black'
        aria-label='Toggle dark mode'
      >
        <Scroll />
      </button>
    </section>
  );
}
