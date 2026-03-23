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
}

export default function ThemedImage({ className, lightSrc, darkSrc, alt, width, height, priority = false, fill }: ThemedImageProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark' || currentTheme === 'light') {
      setTheme(currentTheme);
    } else {
      setTheme('light');
    }

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
      style={{
        imageRendering: 'pixelated',
      }}
    />
  ) : (
    <Image className={clsx(className && className)} src={src} alt={alt} width={width} height={height} priority={priority} />
  );
}
