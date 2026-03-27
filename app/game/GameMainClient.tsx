'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';
import { IconTransfer } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import MessageBox from '@/components/game/MessageBox';
import Cloud from '@/components/game/Cloud';
import Guide from '@/components/game/Guide';
import clsx from 'clsx';
import LoadingSpinner from '@/components/game/LoadingSpinner';

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

const INTERACTION_POINTS = [
  {
    id: 'school',
    name: '학교',
    left: 5,
    range: [12, 18],
    action: (router: AppRouterInstance) => router.push('/game/learning'),
    image: '/images/game/school.webp',
    width: 990,
    height: 775,
    style: 'bottom-[76%] left-[5%] w-[28%]',
  },
  {
    id: 'office',
    name: '회사',
    left: 36,
    range: [44, 49],
    action: (router: AppRouterInstance) => router.push('/game/career'),
    image: '/images/game/building.webp',
    width: 557,
    height: 691,
    style: 'bottom-[80%] left-[36%] w-[29%]',
  },
  {
    id: 'info',
    name: '인포센터',
    left: 69,
    range: [68, 71],
    action: (router: AppRouterInstance) => router.push('/game/contact'),
    image: '/images/game/info.webp',
    width: 280,
    height: 323,
    style: 'bottom-[80%] left-[69%] w-[15%]',
  },
];

export default function GameMainClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewport = searchParams.get('viewport') ?? 'desktop';
  const isMobile = viewport !== 'desktop';

  const [isReady, setIsReady] = useState(false);
  const [position, setPosition] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [lastDirection, setLastDirection] = useState<Direction>('down');
  const [isJumping, setIsJumping] = useState(false);
  const [activeObject, setActiveObject] = useState<(typeof INTERACTION_POINTS)[0] | null>(null);
  const [isEntering, setIsEntering] = useState(false);
  const [frame, setFrame] = useState(0);
  const [guideState, setGuideState] = useState(false);
  const [msgState, setMsgState] = useState(isMobile);

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

    setTimeout(() => setIsReady(true), 500);
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
      currentActive.action(router);
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
    let moveInterval: NodeJS.Timeout | null = null;

    if (direction && !isEntering) {
      moveInterval = setInterval(() => {
        setFrame((prev) => (isJumping ? 1 : prev === 0 ? 1 : 0));

        setPosition((prev) => {
          const isDashing = pressedKeys.current.has('Shift');
          const moveSpeed = isDashing ? 1.6 : 0.8;

          if (direction === 'right') return Math.min(92, prev + moveSpeed);
          if (direction === 'left') return Math.max(0, prev - moveSpeed);
          return prev;
        });
      }, 100);
    } else {
      if (!isJumping) {
        setFrame(0);
      }
    }

    return () => {
      if (moveInterval) clearInterval(moveInterval);
    };
  }, [direction, isJumping, isEntering]);

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
  const imageSrc = isSide ? `/images/game/side_0${isJumping ? 2 : frame + 1}.webp` : `/images/game/${lastDirection === 'up' ? 'back' : 'front_book'}.png`;

  const transformStyle = isSide ? `scaleX(${lastDirection === 'left' ? -1 : 1}) translateY(${-positionY}px)` : `translateY(${-positionY}px)`;

  const enteringAnimation = isEntering
    ? {
        transform: `${transformStyle} scale(0.8) translateY(20px)`,
        opacity: 0,
        transition: 'all 0.8s ease-in-out',
      }
    : {
        transition: 'all 0.1s linear',
      };

  if (!isReady) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className={clsx('home group relative flex h-screen items-center justify-center overflow-hidden bg-sky-200 select-none')}>
        <Cloud />

        {guideState && <Guide onClick={() => setGuideState(false)} />}

        {msgState && (
          <MessageBox
            onClose={() => {
              setMsgState(false);
              setGuideState(true);
            }}
          >
            선택하신 모드는 데스크톱에 최적화되어 있습니다.
            <br />
            모바일에선 일부 기능이 원활하지 않을 수 있으니 PC 접속을 권장합니다.
          </MessageBox>
        )}

        <div className='absolute right-0 bottom-0 left-0 h-50 border-t-4 border-gray-950 bg-[#b0a58c] dark:border-gray-100 dark:bg-[#46311e]'>
          {INTERACTION_POINTS.map((obj) => (
            <button
              key={obj.id}
              className={`group absolute z-20 cursor-pointer rounded-xl p-6 focus:outline-none ${obj.style}`}
              style={{ aspectRatio: obj.width / obj.height }}
              onClick={() => obj.action(router)}
            >
              <span
                className={`absolute inset-0 top-1/2 left-1/2 hidden -translate-1/2 overflow-hidden rounded-full bg-gradient-to-r from-yellow-300/30 via-orange-400/20 to-white/20 opacity-0 blur-md transition-all duration-500 group-focus:scale-130 group-focus:opacity-100 md:block dark:from-blue-500/50 dark:via-purple-500/50 dark:to-pink-500/50`}
                style={{ width: '100%', aspectRatio: 1 }}
              ></span>
              <Image className='relative' src={obj.image} alt={obj.name} fill />
            </button>
          ))}
          <div className="absolute -bottom-[4%] z-30 h-30 w-full bg-[url('/images/game/flowers_mini.webp')] bg-contain bg-repeat-x"></div>
          <div className='pattern-tree absolute bottom-[100%] h-60 w-full'></div>

          <div
            className='absolute bottom-[70%] w-[8%]'
            style={{
              left: `${position}%`,
              zIndex: isEntering ? 15 : 35,
              ...enteringAnimation,
            }}
          >
            {!isMobile && activeObject && !isEntering && (
              <div className='absolute -top-8 left-1/2 flex -translate-x-1/2 flex-col items-center'>
                <div className='animate-bounce rounded border-2 border-black bg-white px-2 py-1 text-xs font-bold whitespace-nowrap'>
                  <span className='text-black'>[W or ↑] {activeObject.name} 입장</span>
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

      <Link
        href='/classic'
        className='fixed bottom-8 left-6 z-60 flex items-center gap-1 rounded-md border-4 border-black bg-amber-50 px-4 text-base font-bold text-amber-950 md:left-8 md:text-2xl'
      >
        <IconTransfer stroke={2} /> Change mode
      </Link>
    </>
  );
}
