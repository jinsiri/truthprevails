'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';

// 로딩이 끝난 뒤에 서서히 나타나서, 페이지 애니메이션이 끝난 뒤 이미지가 갑자기 튀어나오지 않게 한다
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
