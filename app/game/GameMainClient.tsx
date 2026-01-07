'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { IconTransfer } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import MessageBox from '@/components/game/MessageBox';
import Cloud from '@/components/game/Cloud';
import Heart from '@/components/game/Heart';
import Guide from '@/components/game/Guide';

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
    width: 538,
    height: 421,
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
    style: 'bottom-[80%] left-[69%] w-[18%]',
  },
];

export default function GameMainClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewport = searchParams.get('viewport') ?? 'desktop';
  const isMobile = viewport !== 'desktop';
  const pressedKeys = useRef<Set<string>>(new Set());
  const [msgState, setMsgState] = useState(isMobile);
  const [guideState, setGuideState] = useState(!isMobile);
  const [frame, setFrame] = useState(0);
  const [position, setPosition] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [lastDirection, setLastDirection] = useState<Direction>('right');
  const [isJumping, setIsJumping] = useState(false);
  const [activeObject, setActiveObject] = useState<(typeof INTERACTION_POINTS)[0] | null>(null);
  const [isEntering, setIsEntering] = useState(false);
  const isSide = lastDirection === 'left' || lastDirection === 'right';
  const isBackOrFront = lastDirection === 'up' || lastDirection === 'down';
  const imageSrc = isSide ? `/images/game/side_0${isJumping ? 2 : frame + 1}.webp` : `/images/game/${lastDirection === 'up' ? 'back' : 'front_book'}.png`;
  const transformStyle = isSide ? `scaleX(${lastDirection === 'left' ? -1 : 1}) translateY(${-positionY}px)` : undefined;
  const enteringStyle = isEntering
    ? {
        transform: `${transformStyle || ''} scale(0.8) translateY(20px)`,
        opacity: 0,
        transition: 'all 0.8s ease-in-out',
      }
    : {
        transition: 'all 0.1s linear',
      };

  useEffect(() => {
    const containerWidth = window.innerWidth;
    const currentPosPercent = (position / containerWidth) * 100;
    const target = INTERACTION_POINTS.find((obj) => currentPosPercent >= obj.range[0] && currentPosPercent <= obj.range[1]);

    setActiveObject(target || null);
  }, [position]);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      if (e.code === 'KeyW' && activeObject && !isEntering) {
        setIsEntering(true); // 입장 연출 시작
        setDirection(null); // 이동 멈춤
        setLastDirection('up');

        setTimeout(() => {
          activeObject.action(router);
        }, 1000);

        return;
      }

      const dir = keyToDirection[e.code];
      if (dir) {
        pressedKeys.current.add(e.code);
        setDirection(dir);
        setLastDirection(dir);

        return;
      }

      if (e.code === 'Space' && !isJumping) setIsJumping(true);
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

  useEffect(() => {
    if (!guideState) return;

    const handleKeyDown = () => {
      setGuideState(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [guideState]);

  return (
    <>
      <section className='home group relative flex h-screen items-center justify-center overflow-hidden bg-sky-200 select-none'>
        <Cloud />

        <Heart />

        {guideState && <Guide onClick={() => setGuideState(false)} />}

        {msgState && (
          <MessageBox
            onClose={() => {
              setMsgState(!msgState);
              setGuideState(true);
            }}
          >
            선택하신 모드는 데스크톱에 최적화되어 있습니다.
            <br />
            모바일에선 일부 기능이 원활하지 않을 수 있으니 <br />
            PC로 접속하시거나 왼쪽 아래 Change Mode 버튼을 통해 <br />
            클래식 모드 이용을 권장드립니다.
          </MessageBox>
        )}

        <div className='absolute right-0 bottom-0 left-0 h-50 border-t-4 border-gray-950 bg-[#b0a58c] dark:border-gray-100 dark:bg-[#46311e]'>
          {INTERACTION_POINTS.map((obj) => (
            <div key={obj.id} className={`absolute z-20 ${obj.style}`}>
              <Image src={obj.image} alt={obj.name} width={obj.width} height={obj.height} />
            </div>
          ))}
          <div className={'absolute -bottom-[4%] z-30 h-30 w-full bg-[url("/images/game/flowers_mini.webp")] bg-contain bg-repeat-x'}></div>
          <div className={'pattern-tree absolute bottom-[100%] h-60 w-full'}></div>ㅇ
          <div
            className={'absolute bottom-[70%] z-30 w-[8%]'}
            style={{
              left: `${position}px`,
              zIndex: isEntering ? 15 : 35,
              ...enteringStyle,
            }}
          >
            {activeObject && (
              <div className='absolute -top-8 left-1/2 flex -translate-x-1/2 flex-col items-center'>
                <div className='animate-bounce rounded border-2 border-black bg-white px-2 py-1 text-xs font-bold whitespace-nowrap'>
                  <span className={'text-black'}>[W] {activeObject.name} 입장</span>
                </div>
              </div>
            )}

            {(isSide || isBackOrFront) && (
              <Image
                src={imageSrc}
                alt='jinsil'
                width={154}
                height={154}
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
        href='/classic'
        className='fixed bottom-8 left-6 z-60 flex items-center gap-1 rounded-md border-4 border-black bg-amber-50 px-4 text-base font-bold text-amber-950 md:left-8 md:text-2xl'
      >
        <IconTransfer stroke={2} />
        Change mode
      </Link>
    </>
  );
}
