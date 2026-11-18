import clsx from 'clsx';

type Placement = 'top' | 'right' | 'left';

const BUBBLE_CLASS: Record<Placement, string> = {
  top: 'bottom-[110%] left-1/2 min-w-[240px] -translate-x-1/2',
  right: '-top-2 left-[108%] w-max max-w-[200px]',
  left: '-top-2 right-[108%] w-max max-w-[240px]',
};

const TAIL_CLASS: Record<Placement, string> = {
  top: '-bottom-[10px] left-1/2 -translate-x-1/2 border-r-4 border-b-4',
  right: 'top-5 -left-[10px] border-b-4 border-l-4',
  left: 'top-5 -right-[10px] border-t-4 border-r-4',
};

interface SpeechBubbleProps {
  text: string;
  placement?: Placement;
  name?: string;
  className?: string;
}

export default function SpeechBubble({ text, placement = 'top', name = '진실', className }: SpeechBubbleProps) {
  return (
    <div className={clsx('absolute border-4 border-black bg-[#232838]/95 p-1 shadow-[4px_4px_0_rgba(0,0,0,0.35)]', BUBBLE_CLASS[placement], className)}>
      <span className='absolute -top-4 left-3 border-2 border-black bg-yellow-300 px-2 py-0.5 text-xs font-bold whitespace-nowrap text-black'>{name}</span>
      <div className='border-2 border-white/25 px-3 pt-3.5 pb-2.5 text-white'>
        <p className='text-sm leading-relaxed break-keep md:text-base'>{text}</p>
      </div>
      <span aria-hidden className={clsx('absolute h-3 w-3 rotate-45 border-black bg-[#232838]', TAIL_CLASS[placement])} />
    </div>
  );
}
