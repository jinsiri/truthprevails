interface SectionHeaderProps {
  num: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ num, title, subtitle }: SectionHeaderProps) {
  return (
    <div className='grid gap-2 border-b-[3px] border-double border-(--ink) pt-10 pb-6 md:grid-cols-[120px_1fr] md:gap-6 md:pt-14'>
      <p className='font-editorial text-4xl leading-none font-black text-(--accent) md:text-6xl'>{num}</p>
      <div>
        <h1 className='font-editorial text-4xl leading-none font-black tracking-tight md:text-[56px]'>{title}</h1>
        {subtitle && <p className='mt-3 text-xs tracking-[0.14em] text-(--muted) uppercase md:text-[13px]'>{subtitle}</p>}
      </div>
    </div>
  );
}
