import SectionHeader from '@/components/classic/SectionHeader';
import { EDUCATION } from '@/features/portfolio/education';
import { PROJECTS } from '@/features/portfolio/projects';

export default function ClassicLearning() {
  return (
    <>
      <SectionHeader num='04' title='Learning' subtitle='Education & Side Projects' />

      <section className='pt-10'>
        <h2 className='text-xs tracking-[0.16em] text-(--muted)'>EDUCATION</h2>
        <ol className='mt-4'>
          {EDUCATION.map((item) => (
            <li key={item.title} className='grid gap-1 border-t border-(--ink)/30 py-5 md:grid-cols-[200px_1fr] md:gap-6'>
              <time className='font-editorial text-(--muted)'>{item.date}</time>
              <div>
                <p className='font-editorial text-xl font-bold md:text-2xl'>{item.title}</p>
                <p className='mt-1 text-[15px] text-(--muted)'>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className='pt-12'>
        <h2 className='text-xs tracking-[0.16em] text-(--muted)'>SIDE PROJECTS</h2>
        <ol className='mt-4'>
          {PROJECTS.map((project, index) => (
            <li key={project.title} className='grid gap-2 border-t border-(--ink)/30 py-6 md:grid-cols-[200px_1fr] md:gap-6'>
              <div>
                <span className='font-editorial text-2xl text-(--accent)'>{String(index + 1).padStart(2, '0')}</span>
                <p className='mt-1 text-[13px] text-(--muted)'>{project.date}</p>
              </div>
              <div>
                <h3 className='font-editorial flex flex-wrap items-center gap-x-3 gap-y-1 text-xl font-bold md:text-2xl'>
                  {project.title}
                  {project.isCurrentSite && (
                    <span className='border border-(--accent) px-2 py-0.5 font-sans text-[11px] font-medium tracking-[0.04em] text-(--accent)'>
                      지금 보고 있는 사이트
                    </span>
                  )}
                </h3>
                <p className='mt-2 text-[15px] leading-7 md:text-base'>{project.description}</p>
                <p className='mt-2 text-[13px] leading-6 text-(--muted)'>{project.stack}</p>
                {project.link && (
                  <a
                    href={project.link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='mt-3 inline-block border-b border-(--accent) text-sm font-bold'
                  >
                    {project.link.label} ↗
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
