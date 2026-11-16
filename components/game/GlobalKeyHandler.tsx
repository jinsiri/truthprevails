'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { useSiteBack } from '@/hooks/useSiteBack';

export default function GlobalKeyHandler() {
  const { activeView, closeView } = useUIStore();
  const goBack = useSiteBack();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeView) {
          closeView();
        } else {
          goBack();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeView, closeView, goBack]);

  return null;
}
