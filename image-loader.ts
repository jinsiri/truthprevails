import { IMAGE_ROOT } from './constants/imageSrc';

// /images/... 로컬 경로도 ImageKit에 같은 경로로 올라가 있어 CDN으로 요청한다
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const url = src.startsWith('/images/') ? `${IMAGE_ROOT}${src}` : src;
  if (!url.startsWith(IMAGE_ROOT)) return src;

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}tr=w-${width},q-${quality || 80}`;
}
