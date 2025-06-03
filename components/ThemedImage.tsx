import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ThemedImageProps {
  className?: string;
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

export default function ThemedImage({ className = '', lightSrc, darkSrc, alt, width, height, priority = false }: ThemedImageProps) {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

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

  return (
    <Image
      className={`${className} ${theme === 'dark' ? 'opacity-70' : 'opacity-100'}`}
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
    />
  );
}
