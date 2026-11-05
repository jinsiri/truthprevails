import clsx from 'clsx';

export default function SpeechBubble({ text, placement = 'top' }: { text: string; placement?: 'top' | 'right' }) {
  return (
    <div
      className={clsx(
        'absolute border-[4px] border-black bg-white p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]',
        placement === 'top' ? 'bottom-[105%] left-1/2 min-w-[240px] -translate-x-1/2' : '-top-2 left-[105%] w-max max-w-[180px]',
      )}
    >
      <p className='text-center text-sm font-bold break-keep text-black md:text-base'>{text}</p>
      <div
        className={clsx(
          'absolute h-3 w-3 bg-white',
          placement === 'top'
            ? '-bottom-[12px] left-1/2 -translate-x-1/2 rotate-45 border-r-[4px] border-b-[4px] border-black'
            : 'top-4 -left-[12px] rotate-45 border-b-[4px] border-l-[4px] border-black',
        )}
      ></div>
    </div>
  );
}
