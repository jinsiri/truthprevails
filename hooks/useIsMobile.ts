'use client';

import { useEffect, useState } from 'react';

const MOBILE_UA = /Mobi|Android|iPhone|iPad/i;

// 정적 배포(GitHub Pages)에서는 middleware가 실행되지 않으므로 브라우저에서 직접 판별한다.
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(pointer: coarse)');
    const update = () => setIsMobile(query.matches || MOBILE_UA.test(navigator.userAgent));

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return isMobile;
}
