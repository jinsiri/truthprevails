import { useEffect, useState } from 'react';
import Image from 'next/image';
import FadeInImage from './FadeInImage';
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
  fadeIn?: boolean;
}

function getInitialTheme(): 'light' | 'dark' {
  const current = document.documentElement.getAttribute('data-theme');
  if (current === 'dark' || current === 'light') return current;
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemedImage({
  className,
  lightSrc,
  darkSrc,
  alt,
  width,
  height,
  priority = false,
  fill,
  sizes,
  pixelated = true,
  fadeIn = true,
}: ThemedImageProps) {
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

  if (!theme) {
    if (fill || !width || !height) return null;
    return <span aria-hidden className={clsx(className, 'block max-w-full')} style={{ width, aspectRatio: `${width} / ${height}` }} />;
  }

  const src = theme === 'dark' ? darkSrc : lightSrc;
  const ImageComponent = fadeIn ? FadeInImage : Image;

  return fill ? (
    <ImageComponent
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
    <ImageComponent className={clsx(className && className)} src={src} alt={alt} width={width} height={height} priority={priority} />
  );
}
