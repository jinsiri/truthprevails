'use client';

import { useCallback, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

let currentDepth: number | null = null;
let pendingDepth: number | null = null;

const getParentPath = (pathname: string) => pathname.replace(/\/[^/]+\/?$/, '') || '/';

export function useHistoryDepthTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const state = window.history.state ?? {};
    const depth = pendingDepth ?? (typeof state.depth === 'number' ? state.depth : currentDepth === null ? 0 : currentDepth + 1);
    pendingDepth = null;
    currentDepth = depth;
    if (state.depth !== depth) window.history.replaceState({ ...state, depth }, '');
  }, [pathname]);
}

export function useSiteBack() {
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(() => {
    if (currentDepth) {
      router.back();
      return;
    }
    pendingDepth = 0;
    router.replace(getParentPath(pathname));
  }, [router, pathname]);
}
