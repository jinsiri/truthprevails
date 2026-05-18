export default function imageKitLoader({ src, width, quality }) {
  const root = 'https://ik.imagekit.io/ry2wztqvv/truthprevails';
  const relativeSrc = src.startsWith('/') ? src.slice(1) : src;
  return `${root}/${relativeSrc}?tr=w-${width},q-${quality || 75}`;
}
