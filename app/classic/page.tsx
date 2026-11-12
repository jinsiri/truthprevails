import AboutSection from '@/components/classic/sections/AboutSection';
import SkillsSection from '@/components/classic/sections/SkillsSection';
import CareerSection from '@/components/classic/sections/CareerSection';
import ProjectsSection from '@/components/classic/sections/ProjectsSection';
import ContactSection from '@/components/classic/sections/ContactSection';

export default function ClassicMain() {
  return (
    <>
      <section id='top' className='pt-12 pb-10 md:pt-20 md:pb-14'>
        <p className='text-xs tracking-[0.2em] text-(--muted)'>PORTFOLIO — 2026</p>
        <h1 className='font-editorial relative mt-6 text-[64px] leading-[0.9] font-black tracking-tight md:text-[128px] lg:text-[160px]'>
          <span className='absolute top-2 left-[3%] aspect-square w-[28%] max-w-60 rounded-full bg-(--accent) opacity-90'></span>
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

      <AboutSection />
      <SkillsSection />
      <CareerSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
