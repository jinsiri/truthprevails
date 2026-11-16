'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import { useUIStore } from '@/store/useUIStore';
import { useSiteBack } from '@/hooks/useSiteBack';

export default function BackButton() {
  const isMobile = useIsMobile();
  const { activeView, closeView } = useUIStore();
  const goBack = useSiteBack();

  const handleClick = () => {
    if (activeView) {
      closeView();
    } else {
      goBack();
    }
  };

  return (
    <button
      className='md:text-md tablet:[zoom:1.3] tablet:right-6 tablet:bottom-6 fixed right-6 bottom-8 z-50 cursor-pointer rounded-lg border-4 border-black bg-gray-100 px-4 text-base font-bold text-gray-950 md:right-8 md:py-1'
      onClick={handleClick}
    >
      {!isMobile && <span className={'hidden md:inline'}>[ESC] </span>}뒤로가기
    </button>
  );
}
