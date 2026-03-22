'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUIStore } from '@/store/useUIStore';

export default function GlobalKeyHandler() {
  const router = useRouter();
  const { activeView, closeView } = useUIStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeView) {
          closeView();
        } else {
          router.back();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeView, closeView, router]);

  return null;
}
