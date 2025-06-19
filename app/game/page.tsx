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
      <section className='home group relative flex h-screen items-center justify-center overflow-hidden bg-sky-200'>
        <Cloud />

        <Heart />

        <p className={'absolute top-1/3 left-1/2 -translate-x-1/2 text-2xl'}>페이지 준비중입니다! :)</p>

        <div className='absolute right-0 bottom-0 left-0 h-50 border-t-2 border-gray-950 bg-green-500 dark:border-gray-100 dark:bg-green-950'>
          <Image
            src={`/images/side_0${isJumping ? 2 : frame + 1}.webp`}
            alt='jinsil'
            width={150}
            height={150}
            priority
            style={{
              left: `${position}px`,
              transform: `${lastDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)'} translateY(${-positionY}px)`,
              bottom: '80%',
              transition: 'transform 0.1s linear',
              position: 'absolute',
            }}
          />
        </div>
      </section>

      <Link href='/' className='fixed bottom-8 left-6 flex items-center gap-1 text-base font-light md:left-8 md:text-xl'>
        <IconTransfer stroke={2} />
        Change mode
      </Link>
    </>
  );
}
