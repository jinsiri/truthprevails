import clsx from 'clsx';

type Placement = 'top' | 'right' | 'left';

const BUBBLE_CLASS: Record<Placement, string> = {
  top: 'bottom-[105%] left-1/2 min-w-[240px] -translate-x-1/2',
  right: '-top-2 left-[105%] w-max max-w-[180px]',
  left: '-top-2 right-[105%] w-max max-w-[240px]',
};

const TAIL_CLASS: Record<Placement, string> = {
  top: '-bottom-[12px] left-1/2 -translate-x-1/2 rotate-45 border-r-[4px] border-b-[4px] border-black',
  right: 'top-4 -left-[12px] rotate-45 border-b-[4px] border-l-[4px] border-black',
  left: 'top-4 -right-[12px] rotate-45 border-t-[4px] border-r-[4px] border-black',
};

export default function SpeechBubble({ text, placement = 'top', className }: { text: string; placement?: Placement; className?: string }) {
  return (
    <div className={clsx('absolute border-[4px] border-black bg-white p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]', BUBBLE_CLASS[placement], className)}>
      <p className='text-center text-sm font-bold break-keep text-black md:text-base'>{text}</p>
      <div className={clsx('absolute h-3 w-3 bg-white', TAIL_CLASS[placement])}></div>
    </div>
  );
}
