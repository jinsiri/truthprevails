'use client';

import { useEffect } from 'react';

export default function GlobalViewportHandler() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('viewport')) {
      const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
      params.set('viewport', isMobile ? 'mobile' : 'desktop');
      window.history.replaceState(null, '', `?${params.toString()}`);
    }
  }, []);

  return null;
}
