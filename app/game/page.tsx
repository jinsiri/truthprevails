'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IconTransfer } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { Cloud } from '@/components/game/Cloud';
import { Heart } from '@/components/game/Heart';

type Direction = 'up' | 'down' | 'left' | 'right';
const keyToDirection: Record<string, Direction> = {
  ArrowRight: 'right',
  ArrowLeft: 'left',
  ArrowUp: 'up',
  ArrowDown: 'down',
  KeyD: 'right',
  KeyA: 'left',
  KeyW: 'up',
  KeyS: 'down',
};

export default function GameMain() {
  const pressedKeys = useRef<Set<string>>(new Set());
  const [frame, setFrame] = useState(0);
  const [position, setPosition] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [lastDirection, setLastDirection] = useState<Direction>('right');
  const [isJumping, setIsJumping] = useState(false);
  const isSide = lastDirection === 'left' || lastDirection === 'right';
  const isBackOrFront = lastDirection === 'up' || lastDirection === 'down';
  const imageSrc = isSide ? `/images/game/side_0${isJumping ? 2 : frame + 1}.webp` : `/images/game/${lastDirection === 'up' ? 'back' : 'front_book'}.png`;
  const transformStyle = isSide ? `scaleX(${lastDirection === 'left' ? -1 : 1}) translateY(${-positionY}px)` : undefined;

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      const dir = keyToDirection[e.code];
      if (dir) {
        pressedKeys.current.add(e.code);
        setDirection(dir);
        setLastDirection(dir);
        return;
      }

      if (e.code === 'Space' && !isJumping) {
        setIsJumping(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const dir = keyToDirection[e.code];
      if (dir) {
        pressedKeys.current.delete(e.code);

        const remaining = Array.from(pressedKeys.current);
        const lastKey = remaining[remaining.length - 1];
        const newDir = keyToDirection[lastKey];

        if (newDir) {
          setDirection(newDir);
          setLastDirection(newDir);
        } else {
          setDirection(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [direction, isJumping]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (direction) {
      interval = setInterval(() => {
        setFrame((prev) => (isJumping ? 1 : prev === 0 ? 1 : 0));

        setPosition((prev) => {
          if (direction === 'right') {
            return Math.min(window.innerWidth - 150, prev + 5);
          } else if (direction === 'left') {
            return Math.max(0, prev - 5);
          } else {
            return prev;
          }
        });
      }, 100);
    } else if (!isJumping) {
      setFrame(0);
    }

    return () => clearInterval(interval);
  }, [direction, isJumping]);

  useEffect(() => {
    if (!isJumping) return;

    let jumpUp = true;
    let jumpHeight = 0;
    const jumpMaxHeight = 80;
    const jumpSpeed = 10;

    const jumpInterval = setInterval(() => {
      if (jumpUp) {
        jumpHeight += jumpSpeed;
        if (jumpHeight >= jumpMaxHeight) {
          jumpUp = false;
        }
      } else {
        jumpHeight -= jumpSpeed;
        if (jumpHeight <= 0) {
          jumpHeight = 0;
          setIsJumping(false);
          clearInterval(jumpInterval);
        }
      }
      setPositionY(jumpHeight);
    }, 20);

    return () => clearInterval(jumpInterval);
  }, [isJumping]);

  return (
    <>
      <section className='home group relative flex h-screen items-center justify-center overflow-hidden bg-sky-200 select-none'>
        <Cloud />

        <Heart />

        {/*        <div className={'absolute top-0 right-0 bottom-0 left-0 z-100 bg-black/80 text-center text-xl text-white'}>
          <ul className={'absolute top-1/3 left-1/2 flex -translate-x-1/2 items-end gap-x-10'}>
            <li>
              <figure className={'w-max-[40%]'}>
                <Image src={`/images/game/wasd.webp`} alt='방향키' width={200} height={421} layout={'responsive'} />
                <figcaption className={'mt-3'}>WASD 키: 이동</figcaption>
              </figure>
            </li>
            <li>
              <figure className={'w-max-[40%]'}>
                <Image src={`/images/game/spacebar.webp`} alt='점프' width={230} height={421} layout={'responsive'} />
                <figcaption className={'mt-3'}>스페이스바: 점프</figcaption>
              </figure>
            </li>
          </ul>
        </div>*/}

        {/*<div className={'absolute top-20 right-8 z-10'}>
          <div className='relative min-h-50 w-[250px] border-4 border-[#3b2f1c] bg-[#fdf3d2] px-6 py-6 text-lg font-semibold text-[#3b2f1c] shadow-[4px_4px_0_#000]'>
            <h3 className={'text-2xl font-bold'}>능력치</h3>
            <ul className={'mt-2'}>
              <li>빠른 지식 습득</li>
              <li>문해력</li>
              <li>될 때까지 하기</li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>

          <div className='relative mt-6 min-h-50 w-[250px] border-4 border-[#3b2f1c] bg-[#fdf3d2] px-6 py-6 text-lg font-semibold text-[#3b2f1c] shadow-[4px_4px_0_#000]'>
            <h3 className={'text-2xl font-bold'}>보유 기술</h3>
            <ul className={'mt-2'}>
              <li>빠른 습득</li>
              <li>지속</li>
              <li>빠른 습득</li>
              <li>빠른 습득</li>
              <li>빠른 습득</li>
              <li>빠른 습득</li>
            </ul>
          </div>
        </div>*/}

        <p
          className={
            'text-md absolute top-1/4 left-1/2 z-100 w-[90%] max-w-3xl -translate-x-1/2 rounded-xl border-4 bg-black/80 px-6 pt-6 pb-8 text-center text-white lg:text-2xl'
          }
        >
          <strong className={'mb-4 block border-t-2 border-b-2 py-2'}>* 알림 *</strong>
          선택하신 모드는 데스크톱에 최적화되어 있습니다.
          <br />
          모바일에선 일부 기능이 원활하지 않을 수 있으니 <br />
          PC로 접속하시거나 왼쪽 아래 Change Mode 버튼을 통해 <br />
          클래식 모드 이용을 권장드립니다.
        </p>

        <div className='absolute right-0 bottom-0 left-0 h-50 border-t-4 border-gray-950 bg-[#b0a58c] dark:border-gray-100 dark:bg-[#46311e]'>
          <div className={'absolute bottom-[76%] left-[5%] z-20 w-[28%]'}>
            <Image src={`/images/game/school.webp`} alt='학교' width={538} height={421} layout={'responsive'} />
          </div>
          <div className={'absolute bottom-[80%] left-[36%] z-20 w-[29%]'}>
            <Image src={`/images/game/building.webp`} alt='회사' width={557} height={691} layout={'responsive'} />
          </div>
          <div className={'absolute bottom-[80%] left-[69%] z-20 w-[18%]'}>
            <Image src={`/images/game/info.webp`} alt='인포센터' width={280} height={323} />
          </div>
          <div className={'absolute -bottom-[4%] z-30 h-30 w-full bg-[url("/images/game/flowers_mini.webp")] bg-contain bg-repeat-x'}></div>
          <div className={'pattern-tree absolute bottom-[100%] h-60 w-full'}></div>
          <div
            className={'absolute bottom-[70%] z-30 w-[8%]'}
            style={{
              left: `${position}px`,
            }}
          >
            {(isSide || isBackOrFront) && (
              <Image
                src={imageSrc}
                alt='jinsil'
                width={154}
                height={154}
                layout='responsive'
                priority
                style={{
                  ...(transformStyle ? { transform: transformStyle } : {}),
                }}
              />
            )}
          </div>
        </div>
      </section>

      <Link
        href='/'
        className='fixed bottom-8 left-6 z-60 flex items-center gap-1 rounded-md border-4 border-black bg-amber-50 px-4 text-base font-bold text-amber-950 md:left-8 md:text-2xl'
      >
        <IconTransfer stroke={2} />
        Change mode
      </Link>
    </>
  );
}
