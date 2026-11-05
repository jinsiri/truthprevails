'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';

export default function FadeInImage({ className, onLoad, alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      {...props}
      alt={alt}
      className={clsx(className, 'transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0')}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
    />
  );
}
