'use client';

import { ReactNode, useLayoutEffect, useRef } from 'react';

const dialogStack: HTMLDivElement[] = [];
const focusableSelector = 'a[href], button, input, select, textarea, [tabindex]';

interface GameDialogProps {
  children: ReactNode;
  className?: string;
  label: string;
  onClose?: () => void;
}

export default function GameDialog({ children, className, label, onClose }: GameDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialogStack.push(dialog);

    const getFocusable = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) =>
          element.tabIndex >= 0 &&
          !element.matches(':disabled') &&
          !element.closest('[inert]') &&
          element.getClientRects().length > 0 &&
          getComputedStyle(element).visibility !== 'hidden',
      );
    const focusFirst = () => (getFocusable()[0] ?? dialog).focus();
    const isTopDialog = () => dialogStack[dialogStack.length - 1] === dialog;

    const containFocus = (event: FocusEvent) => {
      if (isTopDialog() && !dialog.contains(event.target as Node)) focusFirst();
    };
    const handleTab = (event: KeyboardEvent) => {
      if (!isTopDialog() || event.key !== 'Tab') return;
      const items = getFocusable();
      const index = items.indexOf(document.activeElement as HTMLElement);
      event.preventDefault();
      if (items.length === 0) {
        dialog.focus();
        return;
      }
      const next = index < 0 ? (event.shiftKey ? items.length - 1 : 0) : (index + (event.shiftKey ? -1 : 1) + items.length) % items.length;
      items[next].focus();
    };

    document.addEventListener('focusin', containFocus);
    document.addEventListener('keydown', handleTab, true);
    const initialFocus = getFocusable().find((element) => element.hasAttribute('data-dialog-initial-focus'));
    if (initialFocus) initialFocus.focus();
    else focusFirst();

    return () => {
      document.removeEventListener('focusin', containFocus);
      document.removeEventListener('keydown', handleTab, true);
      const wasTop = isTopDialog();
      dialogStack.splice(dialogStack.indexOf(dialog), 1);
      if (wasTop && previousFocus?.isConnected) previousFocus.focus();
    };
  }, []);

  return (
    <div
      ref={dialogRef}
      role='dialog'
      aria-modal='true'
      aria-label={label}
      tabIndex={-1}
      className={className}
      onKeyDown={(event) => {
        event.stopPropagation();
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose?.();
        }
      }}
      onKeyUp={(event) => event.stopPropagation()}
    >
      {children}
    </div>
  );
}
