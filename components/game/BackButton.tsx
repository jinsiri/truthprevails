'use client';

import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useUIStore } from '@/store/useUIStore';

export default function BackButton() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { activeView, closeView } = useUIStore();

  const handleClick = () => {
    if (activeView) {
      closeView();
    } else {
      router.back();
    }
  };

  return (
    <button
      className='md:text-md fixed right-6 bottom-8 z-50 cursor-pointer rounded-lg border-4 border-black bg-gray-100 px-4 text-base font-bold text-gray-950 md:right-8 md:py-1'
      onClick={handleClick}
    >
      {!isMobile && <span className={'hidden md:inline'}>[ESC] </span>}뒤로가기
    </button>
  );
}
