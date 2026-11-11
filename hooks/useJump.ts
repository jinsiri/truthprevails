import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { COLLECTIBLES } from '@/features/game/collectibles';
import type { Collectible } from '@/features/game/types';

// 단위: 캐릭터 키/초
const JUMP_VELOCITY = 6;
const GRAVITY = 20;

interface UseJumpOptions {
  stateRef: RefObject<{ position: number; isEntering: boolean }>;
  collected: string[];
  onCollect: (item: Collectible) => void;
}

export function useJump({ stateRef, collected, onCollect }: UseJumpOptions) {
  const [isJumping, setIsJumping] = useState(false);
  const [positionY, setPositionY] = useState(0);
  const [landing, setLanding] = useState<{ id: number; x: number } | null>(null);

  const jumpCountRef = useRef(0);
  const jumpVelocityRef = useRef(0);
  const collectedRef = useRef(collected);
  const onCollectRef = useRef(onCollect);

  useEffect(() => {
    collectedRef.current = collected;
    onCollectRef.current = onCollect;
  }, [collected, onCollect]);

  const jump = useCallback(() => {
    if (stateRef.current.isEntering || jumpCountRef.current >= 2) return;
    jumpVelocityRef.current = JUMP_VELOCITY;
    jumpCountRef.current += 1;
    setIsJumping(true);
  }, [stateRef]);

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

      const center = stateRef.current.position + 4;
      const hit = COLLECTIBLES.find(
        (item) => !collectedRef.current.includes(item.id) && Math.abs(item.x - center) < 3 && height + 1 > item.height + 0.15 && height < item.height + 0.3,
      );
      if (hit) onCollectRef.current(hit);

      setPositionY(height);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [isJumping, stateRef]);

  return { isJumping, positionY, landing, jump };
}
