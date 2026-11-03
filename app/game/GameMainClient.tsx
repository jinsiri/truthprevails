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
import type { Collectible, Direction, InteractionPoint } from '@/features/game/types';
import { COLLECTIBLES, COLLECTIBLE_QUEST_ID } from '@/features/game/collectibles';
import useQuestStore from '@/store/useQuestStore';
import CollectibleItem from '@/components/game/CollectibleItem';
import ItemToast from '@/components/game/ItemToast';

const MOBILE_WORLD_WIDTH = 960;
// 처음 움직일 때 깜빡이지 않도록 캐릭터 동작 이미지를 미리 받아 둔다
const CHARACTER_SPRITES = ['side_01.webp', 'side_02.webp', 'back.png', 'front_book.png'].map((file) => `${IMAGE_ROOT}/images/game/${file}`);
// 단위: 캐릭터 키/초. 1단 점프 최고 높이 ≈ JUMP_VELOCITY² / (2 * GRAVITY) = 0.9
const JUMP_VELOCITY = 6;
const GRAVITY = 20;

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
  // 착지 지점을 고정해 둬야 착지 후 계속 걸어도 먼지가 캐릭터를 따라오지 않는다
  const [landing, setLanding] = useState<{ id: number; x: number } | null>(null);
  const [toastItem, setToastItem] = useState<Collectible | null>(null);
  const collected = useQuestStore((state) => state.collected);
  const collectItem = useQuestStore((state) => state.collectItem);

  useEffect(() => {
    if (isMobile && sessionStorage.getItem('mobileNoticeShown') === null) setMsgState(true);
  }, [isMobile]);

  const pressedKeys = useRef<Set<string>>(new Set());
  const jumpCountRef = useRef(0);
  const jumpVelocityRef = useRef(0);
  const collectedRef = useRef(collected);
  const stateRef = useRef({ position, isEntering, activeObject, isJumping });

  useEffect(() => {
    stateRef.current = { position, isEntering, activeObject, isJumping };
  }, [position, isEntering, activeObject, isJumping]);

  useEffect(() => {
    collectedRef.current = collected;
  }, [collected]);

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

  // 점프 높이(positionY)는 캐릭터 키 배수. 공중에서 한 번 더 누르면 2단 점프
  const jump = useCallback(() => {
    if (stateRef.current.isEntering || jumpCountRef.current >= 2) return;
    jumpVelocityRef.current = jumpCountRef.current === 0 ? JUMP_VELOCITY : JUMP_VELOCITY * 0.9;
    jumpCountRef.current += 1;
    setIsJumping(true);
  }, []);

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
    const stopMoving = () => {
      pressedKeys.current.clear();
      setDirection(null);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      setGuideState(false);

      // 이동 중 다른 키를 누르면 멈춘다(점프·달리기·방향키는 이동과 같이 쓰는 키라 제외)
      if (!keyToDirection[e.code] && e.code !== 'Space' && !e.code.includes('Shift')) {
        stopMoving();
        return;
      }

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

      if (e.code === 'Space' && !e.repeat) {
        jump();
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

    // 팝업·버튼으로 포커스가 옮겨가면 keyup이 막히거나 누락되므로, 이동 키를 놓친 채 계속 걷지 않게 멈춘다
    const handlePointerDown = (e: PointerEvent) => {
      if (!(e.target instanceof Element) || !e.target.closest('[data-touch-controls]')) stopMoving();
    };

    window.addEventListener('keydown', handleKeyDown);
    // 캡처 단계에서 받아야 팝업이 이벤트 전파를 막아도 키를 뗀 것을 놓치지 않는다
    window.addEventListener('keyup', handleKeyUp, true);
    window.addEventListener('pointerdown', handlePointerDown, true);
    window.addEventListener('blur', stopMoving);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp, true);
      window.removeEventListener('pointerdown', handlePointerDown, true);
      window.removeEventListener('blur', stopMoving);
    };
  }, [handleInteraction, jump]);

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
    let height = 0;
    let last = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const delta = Math.max(0, Math.min(now - last, 50)) / 1000;
      last = now;

      jumpVelocityRef.current -= GRAVITY * delta;
      height += jumpVelocityRef.current * delta;

      if (height <= 0 && jumpVelocityRef.current < 0) {
        jumpCountRef.current = 0;
        setPositionY(0);
        setIsJumping(false);
        setLanding((prev) => ({ id: (prev?.id ?? 0) + 1, x: stateRef.current.position + 4 }));
        return;
      }

      // 캐릭터 몸(발~머리) 높이 구간에 아이템이 들어오면 획득
      const center = stateRef.current.position + 4;
      const hit = COLLECTIBLES.find(
        (item) => !collectedRef.current.includes(item.id) && Math.abs(item.x - center) < 3 && height + 1 > item.height + 0.15 && height < item.height + 0.3,
      );
      if (hit) {
        collectItem(hit.id, COLLECTIBLE_QUEST_ID);
        setToastItem(hit);
      }

      setPositionY(height);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [isJumping, collectItem]);

  useEffect(() => {
    if (!toastItem) return;
    const timer = setTimeout(() => setToastItem(null), 3500);
    return () => clearTimeout(timer);
  }, [toastItem]);

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

  const jumpOffset = `translateY(${-positionY * 100}%)`;
  const transformStyle = isSide ? `scaleX(${lastDirection === 'left' ? -1 : 1}) ${jumpOffset}` : jumpOffset;

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
          className='@container absolute bottom-0 left-0 h-72 w-full border-t-4 border-gray-950 bg-[#b0a58c] max-md:w-(--world) max-md:translate-x-(--camera) md:h-50 dark:border-gray-100 dark:bg-[#46311e]'
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

          {COLLECTIBLES.filter((item) => !collected.includes(item.id)).map((item) => (
            <CollectibleItem key={item.id} item={item} />
          ))}

          {landing && (
            <span
              key={landing.id}
              aria-hidden
              className='animate-landing-dust pointer-events-none absolute bottom-[68%] z-36 h-[2.5cqw] w-[9cqw] rounded-[50%] bg-[#e8dcc0]/90 dark:bg-[#8a6d4d]/90'
              style={{ left: `${landing.x}%` }}
            />
          )}

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

      {toastItem && <ItemToast key={toastItem.id} item={toastItem} count={collected.length} total={COLLECTIBLES.length} />}

      {isMobile && !msgState && (
        <TouchControls
          onMove={handleTouchMove}
          onJump={() => {
            setGuideState(false);
            jump();
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
