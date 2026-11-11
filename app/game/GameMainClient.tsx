'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CSSProperties, useEffect, useRef, useState, useCallback } from 'react';
import { IconTransfer } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/useIsMobile';
import MessageBox from '@/components/game/MessageBox';
import Cloud from '@/components/game/Cloud';
import Guide from '@/components/game/Guide';
import TouchControls from '@/components/game/TouchControls';
import clsx from 'clsx';
import LoadingSpinner from '@/components/game/LoadingSpinner';
import { IMAGE_ROOT } from '@/constants/imageSrc';

import { keyToDirection, INTERACTION_POINTS, MOBILE_WORLD_WIDTH } from '@/features/game/world';
import type { Collectible, Direction, InteractionPoint } from '@/features/game/types';
import { COLLECTIBLES, COLLECTIBLE_QUEST_ID } from '@/features/game/collectibles';
import useQuestStore from '@/store/useQuestStore';
import CollectibleItem from '@/components/game/CollectibleItem';
import ItemToast from '@/components/game/ItemToast';
import BuildingButton from '@/components/game/BuildingButton';
import PlayerCharacter from '@/components/game/PlayerCharacter';
import { useJump } from '@/hooks/useJump';

const CHARACTER_SPRITES = ['side_01.webp', 'side_02.webp', 'back.png', 'front_book.png'].map((file) => `${IMAGE_ROOT}/images/game/${file}`);

export default function GameMainClient() {
  const router = useRouter();
  const isMobile = useIsMobile();

  const [isReady, setIsReady] = useState(false);
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [lastDirection, setLastDirection] = useState<Direction>('down');
  const [activeObject, setActiveObject] = useState<InteractionPoint | null>(null);
  const [isEntering, setIsEntering] = useState(false);
  const [frame, setFrame] = useState(0);
  const [guideState, setGuideState] = useState(false);
  const [msgState, setMsgState] = useState(false);
  const [toastItem, setToastItem] = useState<Collectible | null>(null);
  const collected = useQuestStore((state) => state.collected);
  const collectItem = useQuestStore((state) => state.collectItem);

  const pressedKeys = useRef<Set<string>>(new Set());
  const stateRef = useRef({ position, isEntering, activeObject });

  const handleCollect = useCallback(
    (item: Collectible) => {
      collectItem(item.id, COLLECTIBLE_QUEST_ID);
      setToastItem(item);
    },
    [collectItem],
  );
  const { isJumping, positionY, landing, jump } = useJump({ stateRef, collected, onCollect: handleCollect });

  useEffect(() => {
    if (isMobile && sessionStorage.getItem('mobileNoticeShown') === null) setMsgState(true);
  }, [isMobile]);

  useEffect(() => {
    stateRef.current = { position, isEntering, activeObject };
  }, [position, isEntering, activeObject]);

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
    const stopMoving = () => {
      pressedKeys.current.clear();
      setDirection(null);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      setGuideState(false);

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

    const handlePointerDown = (e: PointerEvent) => {
      if (!(e.target instanceof Element) || !e.target.closest('[data-touch-controls]')) stopMoving();
    };

    window.addEventListener('keydown', handleKeyDown);
    // 팝업이 keyup 전파를 막아도 받도록 캡처 단계에서 듣는다
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
    if (isReady) {
      sessionStorage.setItem('guideState', JSON.stringify(guideState));
    }
  }, [guideState, isReady]);

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
            <BuildingButton key={obj.id} building={obj} isActive={activeObject?.id === obj.id} onClick={() => router.push(obj.path)} />
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

          <PlayerCharacter
            position={position}
            positionY={positionY}
            lastDirection={lastDirection}
            frame={frame}
            isJumping={isJumping}
            isEntering={isEntering}
            activeObject={activeObject}
            isMobile={isMobile}
          />
        </div>
      </section>

      {toastItem && <ItemToast key={toastItem.id} item={toastItem} count={collected.length} total={COLLECTIBLES.length} onClose={() => setToastItem(null)} />}

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
