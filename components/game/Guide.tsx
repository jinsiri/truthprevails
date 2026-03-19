import Image from 'next/image';

export default function Guide({ onClick }: { onClick: () => void }) {
  return (
    <div
      className={
        'absolute top-0 right-0 bottom-0 left-0 z-100 flex flex-col items-center justify-center bg-black/80 px-4 text-center text-xl break-keep text-white'
      }
      onClick={onClick}
    >
      <ul className={'flex items-end gap-x-10'}>
        <li>
          <figure className={'w-max-[40%]'}>
            <Image src={`/images/game/wasd.webp`} alt='방향키' width={200} height={421} />
            <figcaption className={'mt-3'}>WASD 키: 이동</figcaption>
          </figure>
        </li>
        <li>
          <figure className={'w-max-[40%]'}>
            <Image src={`/images/game/spacebar.webp`} alt='점프' width={230} height={421} />
            <figcaption className={'mt-3'}>스페이스바: 점프</figcaption>
          </figure>
        </li>
      </ul>
      <p className={'text-md mt-6 md:mt-20 md:text-2xl'}>
        [Shift]를 같이 누르시면 더 빠르게 이동할 수 있습니다!
        <br />
        아무 키나 누르시면 게임이 시작됩니다! :)
      </p>
    </div>
  );
}
