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
      const target = e.target as HTMLElement;
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || target.closest('input, textarea, select, [contenteditable="true"]')) return;

      const focusItem = (section: 'v' | 'h', index: number) => {
        e.currentTarget.querySelector<HTMLElement>(`[data-keyboard-${section}="${index}"]`)?.focus();
      };

      if (['ArrowUp', 'ArrowDown', 'KeyW', 'KeyS'].includes(code)) {
        if (!vItems || vItems.length === 0) return;
        e.preventDefault();
        const step = code === 'ArrowUp' || code === 'KeyW' ? -1 : 1;
        setActiveSection('v');
        const next = getNextIdx(vIdx, step, vItems.length);
        setVIdx(next);
        focusItem('v', next);
      } else if (['ArrowLeft', 'ArrowRight', 'KeyA', 'KeyD'].includes(code)) {
        if (!hItems || hItems.length === 0) return;
        e.preventDefault();
        const step = code === 'ArrowLeft' || code === 'KeyA' ? -1 : 1;
        setActiveSection('h');
        const next = getNextIdx(hIdx, step, hItems.length);
        setHIdx(next);
        focusItem('h', next);
      } else if (code === 'Enter' || code === 'Space') {
        if (target !== e.currentTarget) {
          const link = target.closest<HTMLAnchorElement>('a[href]');
          if (code === 'Space' && link) {
            e.preventDefault();
            link.click();
          }
          return;
        }
        e.preventDefault();
        if (activeSection === 'v' && vItems && vItems[vIdx] !== undefined && onSelectV) onSelectV(vItems[vIdx]);
        if (activeSection === 'h' && hItems && hItems[hIdx] !== undefined && onSelectH) onSelectH(hItems[hIdx]);
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
