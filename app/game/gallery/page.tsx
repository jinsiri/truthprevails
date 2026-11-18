'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { IconCaretDownFilled, IconCaretLeftFilled, IconCaretRightFilled, IconExternalLink, IconX } from '@tabler/icons-react';
import GameDialog from '@/components/game/GameDialog';
import { useKeyboardList } from '@/hooks/useKeyboardList';
import { useUIStore } from '@/store/useUIStore';
import { PROJECTS } from '@/features/portfolio/projects';
import type { Project } from '@/features/portfolio/types';

const PLACEHOLDER_COLORS = [
  ['#dff1fb', '#f4c542', '#c8553d', '#3d6b8f'],
  ['#f3ead8', '#2f5d50', '#e0a458', '#8c3b3b'],
  ['#fbefe6', '#6b4e9b', '#e4b363', '#3c7a89'],
];

function WebsitePlaceholder({ index }: { index: number }) {
  const [background, primary, secondary, accent] = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];
  return (
    <span className='flex h-full w-full flex-col' style={{ backgroundColor: background }}>
      <span className='flex h-[12%] items-center gap-[2%] bg-[#1f2a36] px-[3%]'>
        <span className='aspect-square h-[40%] rounded-full bg-[#ff5f57]' />
        <span className='aspect-square h-[40%] rounded-full bg-[#febc2e]' />
        <span className='aspect-square h-[40%] rounded-full bg-[#28c840]' />
      </span>
      <span className='grid flex-1 grid-cols-[2fr_1fr] gap-[5%] p-[6%]'>
        <span className='flex flex-col gap-[10%]'>
          <span className='h-[30%] border-[3px] border-[#1f2a36]' style={{ backgroundColor: primary }} />
          <span className='h-[16%] w-[70%] border-[3px] border-[#1f2a36]' style={{ backgroundColor: secondary }} />
          <span className='h-[16%] w-[50%] border-[3px] border-[#1f2a36]' style={{ backgroundColor: secondary }} />
        </span>
        <span className='border-[3px] border-[#1f2a36]' style={{ backgroundColor: accent }} />
      </span>
    </span>
  );
}

function Frame({ project, index, className }: { project: Project; index: number; className?: string }) {
  return (
    <span className={clsx('block aspect-[16/10] border-[10px] border-[#6b4423] bg-[#f8f4ea] p-[5%] shadow-[6px_6px_0_rgba(0,0,0,0.25)]', className)}>
      <span className='relative block h-full w-full overflow-hidden border-4 border-[#1f2a36]'>
        {project.image ? (
          <Image src={project.image} alt={`${project.title} 화면`} fill sizes='(max-width: 767px) 90vw, 30vw' className='object-cover object-top' />
        ) : (
          <WebsitePlaceholder index={index} />
        )}
      </span>
    </span>
  );
}

function ProjectInfo({ project, index }: { project: Project; index: number }) {
  return (
    <>
      <p className='text-xs tracking-[0.2em] text-[#8d6e63]'>No.{String(index + 1).padStart(2, '0')}</p>
      <h3 className='mt-1 text-2xl font-bold text-[#3e2723] md:text-3xl'>{project.title}</h3>
      <p className='mt-1 text-sm text-[#8d6e63]'>{project.date}</p>
      {project.isCurrentSite && (
        <span className='mt-3 inline-block border-2 border-[#3e2723] bg-yellow-200 px-2 py-0.5 text-xs font-bold text-[#3e2723]'>지금 보고 있는 사이트</span>
      )}
      <p className='mt-4 leading-relaxed break-keep text-[#3e2723] md:text-lg'>{project.description}</p>
      <ul className='mt-4 flex flex-wrap gap-1.5'>
        {project.stack.split(', ').map((tech) => (
          <li key={tech} className='border-2 border-[#3e2723] bg-white px-2 py-0.5 text-xs text-[#3e2723] md:text-sm'>
            {tech}
          </li>
        ))}
      </ul>
      {project.link && (
        <a
          href={project.link.href}
          target='_blank'
          rel='noreferrer'
          data-dialog-initial-focus
          className='mt-6 inline-flex items-center gap-1 bg-[#8d6e63] px-4 py-2 text-white shadow-[4px_4px_0_#5d4037] transition-all hover:translate-y-1 hover:shadow-none focus:translate-y-1 focus:shadow-none focus:outline-none'
        >
          {project.link.label} <IconExternalLink size={16} />
        </a>
      )}
    </>
  );
}

export default function GameGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeView, openView, closeView } = useUIStore();
  const { hIdx, setHIdx, handleKeyDown } = useKeyboardList({
    hItems: PROJECTS,
    onSelectH: () => openView('gallery'),
  });

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const move = (step: number) => setHIdx((prev) => (prev + step + PROJECTS.length) % PROJECTS.length);

  return (
    <main className='relative h-dvh w-full overflow-hidden bg-[#efe6d2] select-none dark:bg-[#2f2a3a]'>
      <div
        aria-hidden
        className='absolute inset-0 opacity-40 dark:opacity-20'
        style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 46px, rgba(120,90,50,0.15) 46px 50px)' }}
      />
      <div aria-hidden className='absolute inset-x-0 bottom-[22%] h-[8%] border-y-4 border-[#6b4423] bg-[#c4a77d] dark:bg-[#5c4632]' />
      <div
        aria-hidden
        className='absolute inset-x-0 bottom-0 h-[22%] bg-[#8b5e3c] dark:bg-[#4a3424]'
        style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 118px, rgba(0,0,0,0.18) 118px 122px)' }}
      />

      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label='프로젝트 전시'
        className='wide:flex absolute inset-x-0 top-[24%] hidden justify-center gap-[3vw] outline-none'
      >
        {PROJECTS.map((project, index) => (
          <div key={project.title} className='relative flex w-[28vw] max-w-[400px] flex-col items-center'>
            <span
              aria-hidden
              className={clsx(
                'pointer-events-none absolute -top-[30%] left-1/2 h-[150%] w-[140%] -translate-x-1/2 bg-gradient-to-b from-yellow-100/70 to-transparent transition-opacity duration-300 [clip-path:polygon(40%_0,60%_0,100%_100%,0_100%)] dark:from-yellow-200/30',
                hIdx === index ? 'opacity-100' : 'opacity-0',
              )}
            />
            {hIdx === index && activeView !== 'gallery' && (
              <IconCaretDownFilled
                aria-hidden
                className='absolute -top-12 h-10 w-10 animate-bounce text-yellow-300 [filter:drop-shadow(0_0_1px_#000)_drop-shadow(0_0_1px_#000)_drop-shadow(0_2px_0_#000)]'
              />
            )}
            <button
              type='button'
              data-keyboard-h={index}
              aria-label={`${project.title} 자세히 보기`}
              onFocus={() => setHIdx(index)}
              onMouseEnter={() => setHIdx(index)}
              onClick={() => {
                setHIdx(index);
                openView('gallery');
              }}
              className='relative w-full cursor-pointer transition-transform duration-300 hover:-translate-y-1 focus:outline-none'
            >
              <Frame project={project} index={index} />
            </button>
            <div className='relative mt-6 w-[80%] border-2 border-[#3e2723] bg-[#fffaf0] px-3 py-2 text-center shadow-[3px_3px_0_rgba(0,0,0,0.2)]'>
              <p className='text-sm font-bold text-[#3e2723] lg:text-base'>{project.title}</p>
              <p className='text-[11px] text-[#8d6e63]'>{hIdx === index ? 'Enter 또는 클릭' : project.date}</p>
            </div>
          </div>
        ))}
      </div>

      <section aria-label='프로젝트 전시' className='wide:hidden absolute inset-0 overflow-y-auto px-6 pt-28 pb-32 md:px-[12vw] md:pt-36'>
        <Frame project={PROJECTS[hIdx]} index={hIdx} className='w-full' />
        <div className='mt-4 flex items-center justify-center gap-4'>
          <button
            type='button'
            aria-label='이전 작품'
            onClick={() => move(-1)}
            className='flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center border-4 border-black bg-gray-100 text-gray-950 active:translate-y-0.5'
          >
            <IconCaretLeftFilled />
          </button>
          <div className='flex gap-2' aria-hidden>
            {PROJECTS.map((project, index) => (
              <span key={project.title} className={clsx('h-2.5 w-2.5 border-2 border-black', hIdx === index ? 'bg-yellow-300' : 'bg-white')} />
            ))}
          </div>
          <button
            type='button'
            aria-label='다음 작품'
            onClick={() => move(1)}
            className='flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center border-4 border-black bg-gray-100 text-gray-950 active:translate-y-0.5'
          >
            <IconCaretRightFilled />
          </button>
        </div>
        <div className='mt-5 border-4 border-[#3e2723] bg-[#fffaf0] p-5 shadow-[6px_6px_0_rgba(0,0,0,0.2)]'>
          <ProjectInfo project={PROJECTS[hIdx]} index={hIdx} />
        </div>
      </section>

      {activeView === 'gallery' && (
        <GameDialog
          label={`${PROJECTS[hIdx].title} 작품 설명`}
          onClose={closeView}
          className='wide:block absolute top-1/2 left-1/2 z-40 hidden w-[min(90vw,640px)] -translate-1/2 border-4 border-[#3e2723] bg-[#fffaf0] p-8 shadow-[8px_8px_0_rgba(0,0,0,0.25)]'
        >
          <button type='button' aria-label='닫기' onClick={closeView} className='absolute top-3 right-3 cursor-pointer text-[#5d4037] hover:text-[#3e2723]'>
            <IconX />
          </button>
          <ProjectInfo project={PROJECTS[hIdx]} index={hIdx} />
        </GameDialog>
      )}
    </main>
  );
}
