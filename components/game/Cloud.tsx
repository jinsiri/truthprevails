import Image from 'next/image';

export function Cloud() {
  const cloudSrc = '/images/game/cloud.webp';

  return (
    <>
      <Image className={'absolute top-12 left-[20%]'} src={cloudSrc} alt='cloud' width={90} height={90} />
      <Image className={'absolute top-18 left-[30%]'} src={cloudSrc} alt='cloud' width={100} height={100} />
      <Image className={'absolute top-22 left-[28%]'} src={cloudSrc} alt='cloud' width={80} height={80} />
      <Image className={'absolute top-12 left-[70%]'} src={cloudSrc} alt='cloud' width={90} height={90} />
      <Image className={'absolute top-18 left-[80%]'} src={cloudSrc} alt='cloud' width={100} height={100} />
      <Image className={'absolute top-22 left-[78%]'} src={cloudSrc} alt='cloud' width={80} height={80} />
    </>
  );
}
