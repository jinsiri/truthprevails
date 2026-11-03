import { IMAGE_ROOT } from './constants/imageSrc';

// 모든 이미지를 ImageKit에서 화면 폭에 맞게 리사이즈해서 받는다.
// /images/... 로컬 경로도 ImageKit에 같은 경로로 올라가 있으므로 CDN 주소로 바꿔서 요청한다.
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const url = src.startsWith('/images/') ? `${IMAGE_ROOT}${src}` : src;
  if (!url.startsWith(IMAGE_ROOT)) return src;

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}tr=w-${width},q-${quality || 80}`;
}
