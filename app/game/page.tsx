'use client';

import Link from 'next/link';
import { IconTransfer } from '@tabler/icons-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Cloud } from '@/components/game/Cloud';
import { Heart } from '@/components/game/Heart';

export default function ClassicMain() {
  const [frame, setFrame] = useState(0);
  const [position, setPosition] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [lastDirection, setLastDirection] = useState<'left' | 'right'>('right');
  const [isJumping, setIsJumping] = useState(false);

  const isMoveFront = (e: KeyboardEvent) => {
    return e.key === 'ArrowRight' || e.code === 'KeyD';
  };

  const isMoveMoveBack = (e: KeyboardEvent) => {
    return e.key === 'ArrowLeft' || e.code === 'KeyA';
  };

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      if (isMoveFront(e)) {
        setDirection('right');
        setLastDirection('right');
      } else if (isMoveMoveBack(e)) {
        setDirection('left');
        setLastDirection('left');
      } else if (e.key === ' ' && !isJumping) {
        setIsJumping(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (isMoveFront(e) || isMoveMoveBack(e)) {
        setDirection(null);
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
          } else {
            return Math.max(0, prev - 5);
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
    const jumpMaxHeight = 100;
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

        <p className={'absolute top-1/3 left-1/2 z-100 -translate-x-1/2 border-4 bg-white px-6 py-1 text-2xl text-black'}>페이지 준비중입니다! :)</p>

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
              transform: `${lastDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)'} translateY(${-positionY}px)`,
              transition: 'transform 0.1s linear',
            }}
          >
            <Image src={`/images/game/side_0${isJumping ? 2 : frame + 1}.webp`} alt='jinsil' width={154} height={154} layout={'responsive'} priority />
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
