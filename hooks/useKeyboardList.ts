import { useState, useCallback, useRef } from 'react';

interface KeyboardListConfig<T> {
  items: T[];
  onSelect: (item: T) => void;
  loop?: boolean;
}

export function useKeyboardList<T>({ items, onSelect, loop = true }: KeyboardListConfig<T>) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      const { key } = e;
      const move = (step: number) => {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = prev + step;
          if (loop) return (next + items.length) % items.length;
          return Math.max(0, Math.min(items.length - 1, next));
        });
      };

      if (key === 'ArrowDown' || key === 's') move(1);
      if (key === 'ArrowUp' || key === 'w') move(-1);
      if (key === 'Enter') {
        e.preventDefault();
        onSelect(items[selectedIndex]);
      }
    },
    [items, selectedIndex, onSelect, loop],
  );

  return {
    selectedIndex,
    setSelectedIndex,
    handleKeyDown,
    containerRef,
  };
}
