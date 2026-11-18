import Image from 'next/image';
import clsx from 'clsx';

const CLOUDS = [
  'top-[15%] left-[6%] w-16 md:top-12 md:left-[20%] md:w-[90px]',
  'top-[17%] left-[16%] w-[72px] md:top-18 md:left-[30%] md:w-[100px]',
  'top-[19.5%] left-[13%] w-14 md:top-22 md:left-[28%] md:w-[80px]',
  'top-[13%] left-[58%] w-16 md:top-12 md:left-[70%] md:w-[90px]',
  'top-[15%] left-[68%] w-[72px] md:top-18 md:left-[80%] md:w-[100px]',
  'top-[17.5%] left-[65%] w-14 md:top-22 md:left-[78%] md:w-[80px]',
];

export default function Cloud() {
  return (
    <>
      {CLOUDS.map((className) => (
        <Image key={className} className={clsx('absolute h-auto', className)} src='/images/game/cloud.webp' alt='' aria-hidden width={100} height={64} />
      ))}
    </>
  );
}
