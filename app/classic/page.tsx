import Link from 'next/link';
import { navItems } from '@/constants/navItems';

const SECTION_SUMMARY: Record<string, string> = {
  '/classic/about': '소개와 일하는 방식',
  '/classic/skills': '기술 스택과 자격',
  '/classic/career': '경력과 주요 성과',
  '/classic/learning': '학력과 사이드 프로젝트',
  '/classic/contact': '연락처',
};

export default function ClassicMain() {
  const sections = navItems.filter((item) => item.href !== '/classic');

  return (
    <>
      <section className='border-b-[3px] border-double border-(--ink) pt-12 pb-10 md:pt-20 md:pb-14'>
        <p className='text-xs tracking-[0.2em] text-(--muted)'>PORTFOLIO — 2026</p>
        <h1 className='font-editorial relative mt-6 text-[64px] leading-[0.9] font-black tracking-tight md:text-[128px] lg:text-[160px]'>
          <span className='absolute top-2 left-[3%] -z-0 aspect-square w-[28%] max-w-60 rounded-full bg-(--accent) opacity-90'></span>
          <span className='relative'>
            JINSIL
            <br />
            KWON
          </span>
        </h1>
        <p className='mt-6 text-lg md:text-2xl'>
          makes <strong className='font-bold'>User-driven &amp; Code-crafted</strong> Program
        </p>
      </section>

      <nav aria-label='섹션 목차'>
        <ol>
          {sections.map((item, index) => (
            <li key={item.href} className='border-b border-(--ink)/30'>
              <Link href={item.href} className='group grid grid-cols-[48px_1fr_auto] items-baseline gap-4 py-5 md:grid-cols-[120px_1fr_auto] md:gap-6'>
                <span className='font-editorial text-lg text-(--accent) md:text-2xl'>{String(index + 1).padStart(2, '0')}</span>
                <span>
                  <span className='font-editorial block text-2xl font-bold md:text-3xl'>{item.label}</span>
                  <span className='mt-1 block text-sm text-(--muted)'>{SECTION_SUMMARY[item.href]}</span>
                </span>
                <span className='text-(--muted) transition-transform group-hover:translate-x-1 group-hover:text-(--ink)'>→</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
