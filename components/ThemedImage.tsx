import Image from 'next/image';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface ThemedImageProps {
  className?: string;
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  pixelated?: boolean;
}

// ThemeToggleButton과 같은 기준: data-theme > 저장된 테마 > 시스템 설정
function getInitialTheme(): 'light' | 'dark' {
  const current = document.documentElement.getAttribute('data-theme');
  if (current === 'dark' || current === 'light') return current;
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemedImage({ className, lightSrc, darkSrc, alt, width, height, priority = false, fill, sizes, pixelated = true }: ThemedImageProps) {
  // 테마를 확정한 뒤에 렌더해야 다크 모드에서 라이트 이미지를 먼저 받는 이중 다운로드가 없다
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    setTheme(getInitialTheme());

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme');
          if (newTheme === 'dark' || newTheme === 'light') {
            setTheme(newTheme);
          }
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  if (!theme) return null;

  const src = theme === 'dark' ? darkSrc : lightSrc;

  return fill ? (
    <Image
      className={clsx(className && className)}
      src={src}
      alt={alt}
      priority={priority}
      fill
      sizes={sizes}
      style={{
        imageRendering: pixelated ? 'pixelated' : 'auto',
      }}
    />
  ) : (
    <Image className={clsx(className && className)} src={src} alt={alt} width={width} height={height} priority={priority} />
  );
}
