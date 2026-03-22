export default function SpeechBubble({ text }: { text: string }) {
  return (
    <div className='absolute bottom-[105%] left-1/2 min-w-[240px] -translate-x-1/2 border-[4px] border-black bg-white p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]'>
      <p className='text-center text-sm font-bold break-keep text-black md:text-base'>{text}</p>
      <div className='absolute -bottom-[12px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-r-[4px] border-b-[4px] border-black bg-white'></div>
    </div>
  );
}
