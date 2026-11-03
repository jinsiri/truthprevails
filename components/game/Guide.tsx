import Image from 'next/image';
import clsx from 'clsx';
import { IconArrowBigUpLines, IconCaretDownFilled, IconCaretLeftFilled, IconCaretRightFilled, IconDoorEnter } from '@tabler/icons-react';
import { touchButtonClass } from './TouchControls';

const keyClass = clsx(touchButtonClass, 'bg-gray-100 text-gray-950');

export default function Guide({ onClick, isMobile = false }: { onClick: () => void; isMobile?: boolean }) {
  return (
    <div
      className={
        'absolute top-0 right-0 bottom-0 left-0 z-100 flex flex-col items-center justify-center bg-black/80 px-4 text-center text-xl break-keep text-white'
      }
      onClick={onClick}
    >
      {isMobile ? (
        <>
          <ul className={'flex items-end gap-x-6'}>
            <li>
              <figure className={'flex flex-col items-center'}>
                <div className={'flex gap-2'}>
                  <span className={keyClass}>
                    <IconCaretLeftFilled size={28} />
                  </span>
                  <span className={keyClass}>
                    <IconCaretRightFilled size={28} />
                  </span>
                </div>
                <figcaption className={'mt-3'}>이동</figcaption>
              </figure>
            </li>
            <li>
              <figure className={'flex flex-col items-center'}>
                <span className={keyClass}>
                  <IconArrowBigUpLines size={26} />
                </span>
                <figcaption className={'mt-3'}>점프</figcaption>
              </figure>
            </li>
            <li>
              <figure className={'flex flex-col items-center'}>
                <span className={keyClass}>
                  <IconDoorEnter size={24} />
                  <span className='text-sm'>입장</span>
                </span>
                <figcaption className={'mt-3'}>입장</figcaption>
              </figure>
            </li>
          </ul>
          <p className={'mt-6 text-base'}>
            <IconCaretDownFilled className={'inline h-5 w-5 align-[-3px] text-yellow-300'} /> 표시된 문 앞에서 입장할 수 있습니다!
            <br />
            화면을 터치하면 게임이 시작됩니다! :)
          </p>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
