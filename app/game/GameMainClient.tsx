'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties, useEffect, useRef, useState, useCallback } from 'react';
import { IconCaretDownFilled, IconTransfer } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/useIsMobile';
import MessageBox from '@/components/game/MessageBox';
import Cloud from '@/components/game/Cloud';
import Guide from '@/components/game/Guide';
import TouchControls from '@/components/game/TouchControls';
import clsx from 'clsx';
import LoadingSpinner from '@/components/game/LoadingSpinner';
import { IMAGE_ROOT } from '@/constants/imageSrc';

import { keyToDirection, INTERACTION_POINTS } from '@/features/game/world';
import type { Direction, InteractionPoint } from '@/features/game/types';

const MOBILE_WORLD_WIDTH = 960;
// 처음 움직일 때 깜빡이지 않도록 캐릭터 동작 이미지를 미리 받아 둔다
const CHARACTER_SPRITES = ['side_01.webp', 'side_02.webp', 'back.png', 'front_book.png'].map((file) => `${IMAGE_ROOT}/images/game/${file}`);

export default function GameMainClient() {
  const router = useRouter();
  const isMobile = useIsMobile();

  const [isReady, setIsReady] = useState(false);
  const [position, setPosition] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [lastDirection, setLastDirection] = useState<Direction>('down');
  const [isJumping, setIsJumping] = useState(false);
  const [activeObject, setActiveObject] = useState<InteractionPoint | null>(null);
  const [isEntering, setIsEntering] = useState(false);
  const [frame, setFrame] = useState(0);
  const [guideState, setGuideState] = useState(false);
  const [msgState, setMsgState] = useState(false);

  useEffect(() => {
    if (isMobile && sessionStorage.getItem('mobileNoticeShown') === null) setMsgState(true);
  }, [isMobile]);

  const pressedKeys = useRef<Set<string>>(new Set());
  const stateRef = useRef({ position, isEntering, activeObject, isJumping });

  useEffect(() => {
    stateRef.current = { position, isEntering, activeObject, isJumping };
  }, [position, isEntering, activeObject, isJumping]);

  useEffect(() => {
    const savedPos = sessionStorage.getItem('lastPosition');
    if (savedPos) setPosition(JSON.parse(savedPos).x);

    const savedGuide = sessionStorage.getItem('guideState');
    setGuideState(savedGuide !== null ? JSON.parse(savedGuide) : !isMobile);

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    setTimeout(() => setIsReady(true), 0);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, [isMobile]);

  const handleInteraction = useCallback(() => {
    const { activeObject: currentActive, position: currentPos, isEntering: entering } = stateRef.current;
    if (!currentActive || entering) return;

    setIsEntering(true);
    setDirection(null);
    setLastDirection('up');

    sessionStorage.setItem('lastPosition', JSON.stringify({ x: currentPos, y: 0 }));

    setTimeout(() => {
      router.push(currentActive.path);
    }, 1000);
  }, [router]);

  useEffect(() => {
    const target = INTERACTION_POINTS.find((obj) => position >= obj.range[0] && position <= obj.range[1]);
    setActiveObject(target || null);
  }, [position]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setGuideState(false);

      if (e.shiftKey) pressedKeys.current.add('Shift');

      if (e.code === 'KeyW' || e.code === 'ArrowUp') {
        handleInteraction();
        return;
      }

      const dir = keyToDirection[e.code];
      if (dir && !stateRef.current.isEntering) {
        pressedKeys.current.add(e.code);
        setDirection(dir);
        setLastDirection(dir);
      }

      if (e.code === 'Space' && !stateRef.current.isJumping) {
        setIsJumping(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code.includes('Shift')) pressedKeys.current.delete('Shift');

      const dir = keyToDirection[e.code];
      if (dir) {
        pressedKeys.current.delete(e.code);
        const remaining = Array.from(pressedKeys.current).filter((k) => k !== 'Shift');
        if (remaining.length > 0) {
          const nextDir = keyToDirection[remaining[remaining.length - 1]];
          setDirection(nextDir);
          setLastDirection(nextDir);
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
  }, [handleInteraction]);

  useEffect(() => {
    let rafId: number | null = null;

    if (direction && !isEntering) {
      // 매 프레임 위치를 갱신해야 모바일에서 끊김 없이 이동한다(속도 단위: %/100ms)
      let last = performance.now();
      let frameElapsed = 0;

      const tick = (now: number) => {
        const delta = Math.min(now - last, 50);
        last = now;

        frameElapsed += delta;
        if (frameElapsed >= 100) {
          frameElapsed = 0;
          setFrame((prev) => (isJumping ? 1 : prev === 0 ? 1 : 0));
        }

        setPosition((prev) => {
          const isDashing = pressedKeys.current.has('Shift');
          const moveSpeed = (isDashing ? 1.6 : isMobile ? 1.3 : 0.8) * (delta / 100);

          if (direction === 'right') return Math.min(92, prev + moveSpeed);
          if (direction === 'left') return Math.max(0, prev - moveSpeed);
          return prev;
        });

        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    } else {
      if (!isJumping) {
        setFrame(0);
      }
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [direction, isJumping, isEntering, isMobile]);

  useEffect(() => {
    if (!isJumping) return;
    let jumpUp = true;
    let jumpHeight = 0;
    const jumpMaxHeight = 80;
    const jumpSpeed = 10;

    const jumpInterval = setInterval(() => {
      if (jumpUp) {
        jumpHeight += jumpSpeed;
        if (jumpHeight >= jumpMaxHeight) jumpUp = false;
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

  useEffect(() => {
    if (isReady) {
      sessionStorage.setItem('guideState', JSON.stringify(guideState));
    }
  }, [guideState, isReady]);

  const isSide = lastDirection === 'left' || lastDirection === 'right';
  const isBackOrFront = lastDirection === 'up' || lastDirection === 'down';
  const imageSrc = isSide
    ? `${IMAGE_ROOT}/images/game/side_0${isJumping ? 2 : frame + 1}.webp`
    : `${IMAGE_ROOT}/images/game/${lastDirection === 'up' ? 'back' : 'front_book'}.png`;

  const transformStyle = isSide ? `scaleX(${lastDirection === 'left' ? -1 : 1}) translateY(${-positionY}px)` : `translateY(${-positionY}px)`;

  // 모바일: 월드를 화면보다 넓게(MOBILE_WORLD_WIDTH) 깔고 캐릭터를 따라 가로 스크롤
  const worldWidth = `max(100vw, ${MOBILE_WORLD_WIDTH}px)`;
  const cameraX = `clamp(calc(100vw - ${worldWidth}), calc(50vw - ${worldWidth} * ${(position + 4) / 100}), 0px)`;

  const handleTouchMove = (dir: Direction | null) => {
    setGuideState(false);
    if (!dir) {
      setDirection(null);
      return;
    }
    if (stateRef.current.isEntering) return;
    setDirection(dir);
    setLastDirection(dir);
  };

  const enteringAnimation = isEntering
    ? {
        transform: `${transformStyle} scale(0.8) translateY(20px)`,
        opacity: 0,
        transition: 'all 0.8s ease-in-out',
      }
    : {};

  if (!isReady) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className={clsx('home group relative flex h-dvh items-center justify-center overflow-hidden bg-sky-200 select-none')}>
        <Cloud />

        {CHARACTER_SPRITES.map((src) => (
          <Image key={src} src={src} alt='' width={154} height={154} priority className='hidden' />
        ))}

        {guideState && <Guide isMobile={isMobile} onClick={() => setGuideState(false)} />}

        {msgState && (
          <MessageBox
            onClose={() => {
              sessionStorage.setItem('mobileNoticeShown', 'true');
              setMsgState(false);
              setGuideState(true);
            }}
          >
            선택하신 모드는 데스크톱에 최적화되어 있습니다.
            <br />
            모바일에선 일부 기능이 원활하지 않을 수 있으니 PC 접속을 권장합니다.
          </MessageBox>
        )}

        <div
          className='absolute bottom-0 left-0 h-72 w-full border-t-4 border-gray-950 bg-[#b0a58c] max-md:w-(--world) max-md:translate-x-(--camera) md:h-50 dark:border-gray-100 dark:bg-[#46311e]'
          style={{ '--world': worldWidth, '--camera': cameraX } as CSSProperties}
        >
          {INTERACTION_POINTS.map((obj) => (
            <button
              key={obj.id}
              className={`group absolute z-20 cursor-pointer rounded-xl p-6 focus:outline-none ${obj.style}`}
              style={{ aspectRatio: obj.width / obj.height }}
              onClick={() => {
                router.push(obj.path);
              }}
            >
              <span
                className={`absolute inset-0 top-1/2 left-1/2 hidden -translate-1/2 overflow-hidden rounded-full bg-gradient-to-r from-yellow-300/30 via-orange-400/20 to-white/20 opacity-0 blur-md transition-all duration-500 group-focus:scale-130 group-focus:opacity-100 md:block dark:from-blue-500/50 dark:via-purple-500/50 dark:to-pink-500/50`}
                style={{ width: '100%', aspectRatio: 1 }}
              ></span>
              <Image
                className='relative'
                src={obj.image}
                alt={obj.name}
                fill
                sizes={`(max-width: 767px) ${Math.round((MOBILE_WORLD_WIDTH * obj.widthPercent) / 100)}px, ${obj.widthPercent}vw`}
              />
              {activeObject?.id !== obj.id && (
                <span
                  aria-hidden
                  className='pointer-events-none absolute -translate-x-1/2 -translate-y-full animate-bounce text-yellow-300 [filter:drop-shadow(0_0_1px_#000)_drop-shadow(0_0_1px_#000)_drop-shadow(0_2px_0_#000)]'
                  style={{ left: `${obj.door.x}%`, top: `${obj.door.y}%` }}
                >
                  <IconCaretDownFilled className='h-9 w-9 md:h-10 md:w-10' />
                </span>
              )}
            </button>
          ))}
          <div
            className={`absolute -bottom-[4%] z-30 h-30 w-full bg-contain bg-repeat-x`}
            style={{
              backgroundImage: `url(${IMAGE_ROOT}/images/game/flowers_mini.webp?tr=h-240)`,
            }}
          ></div>
          <div className='pattern-tree absolute bottom-[100%] h-60 w-full'></div>

          <div
            className='absolute bottom-[70%] w-[8%]'
            style={{
              left: `${position}%`,
              zIndex: isEntering ? 15 : 35,
              ...enteringAnimation,
            }}
          >
            {activeObject && !isEntering && (
              <div className='absolute -top-8 left-1/2 flex -translate-x-1/2 flex-col items-center'>
                <div className='animate-bounce rounded border-2 border-black bg-white px-2 py-1 text-xs font-bold whitespace-nowrap'>
                  <span className='text-black'>
                    {!isMobile && '[W or ↑] '}
                    {activeObject.name} 입장
                  </span>
                </div>
              </div>
            )}

            {(isSide || isBackOrFront) && (
              <Image
                src={imageSrc}
                alt='character'
                width={154}
                height={154}
                priority
                style={{
                  transform: transformStyle,
                }}
              />
            )}
          </div>
        </div>
      </section>

      {isMobile && !msgState && (
        <TouchControls
          onMove={handleTouchMove}
          onJump={() => {
            setGuideState(false);
            if (!stateRef.current.isJumping) setIsJumping(true);
          }}
          onEnter={handleInteraction}
          enterLabel={activeObject && !isEntering ? activeObject.name : null}
        />
      )}

      <Link
        href='/classic'
        className='fixed bottom-8 left-6 z-60 flex items-center gap-1 rounded-md border-4 border-black bg-amber-50 px-4 text-base font-bold text-amber-950 md:left-8 md:text-2xl'
      >
        <IconTransfer stroke={2} /> Change mode
      </Link>
    </>
  );
}
