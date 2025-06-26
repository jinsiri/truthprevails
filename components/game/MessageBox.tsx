'use client';

import { ReactNode } from 'react';

interface MessageBoxProps {
  onClose?: () => void;
  children?: ReactNode;
}

export default function MessageBox({ onClose, children }: MessageBoxProps) {
  return (
    <div className='text-md fixed top-1/2 left-1/2 z-100 w-[90%] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-xl border-4 bg-black/80 px-6 py-6 text-center text-white lg:text-2xl'>
      <p className={'break-keep'}>
        <strong className={'mb-4 block border-t-2 border-b-2 py-2'}>* 알림 *</strong>
        {children}
      </p>
      {onClose && (
        <button onClick={onClose} className='mt-6'>
          확인
        </button>
      )}
    </div>
  );
}
