import { useState, useCallback } from 'react';

interface KeyboardListConfig<T, U> {
  vItems?: T[];
  hItems?: U[];
  onSelectV?: (item: T) => void;
  onSelectH?: (item: U) => void;
}

export function useKeyboardList<T, U>({ vItems, hItems, onSelectV, onSelectH }: KeyboardListConfig<T, U>) {
  const [activeSection, setActiveSection] = useState<'v' | 'h'>('v');
  const [vIdx, setVIdx] = useState(0);
  const [hIdx, setHIdx] = useState(0);

  const getNextIdx = (prev: number, step: number, length: number) => {
    if (length === 0) return 0;
    return (prev + step + length) % length;
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const { code } = e;

      if (['ArrowUp', 'ArrowDown', 'KeyW', 'KeyS'].includes(code)) {
        e.preventDefault();
        if (!vItems || vItems.length === 0) return;
        const step = code === 'ArrowUp' || code === 'KeyW' ? -1 : 1;
        setActiveSection('v');
        setVIdx((prev) => getNextIdx(prev, step, vItems.length));
      } else if (['ArrowLeft', 'ArrowRight', 'KeyA', 'KeyD'].includes(code)) {
        e.preventDefault();
        if (!hItems || hItems.length === 0) return;
        const step = code === 'ArrowLeft' || code === 'KeyA' ? -1 : 1;
        setActiveSection('h');
        setHIdx((prev) => getNextIdx(prev, step, hItems.length));
      } else if (code === 'Enter' || code === 'Space') {
        e.preventDefault();
        if (activeSection === 'v' && vItems && onSelectV) onSelectV(vItems[vIdx]);
        if (activeSection === 'h' && hItems && onSelectH) onSelectH(hItems[hIdx]);
      }
    },
    [vItems, hItems, vIdx, hIdx, activeSection, onSelectV, onSelectH],
  );

  return {
    activeSection,
    vIdx,
    hIdx,
    setVIdx,
    setHIdx,
    vItems,
    hItems,
    handleKeyDown,
  };
}
