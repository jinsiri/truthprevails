'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useUIStore } from '@/store/useUIStore';

export default function BackButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewport = searchParams.get('viewport') ?? 'desktop';
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
      {viewport === 'desktop' && <>[ESC] </>}뒤로가기
    </button>
  );
}
