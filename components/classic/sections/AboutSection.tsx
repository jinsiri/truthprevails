import SectionHeader from '@/components/classic/SectionHeader';
import { aboutLead, traitGroups } from '@/features/portfolio/profile';

export default function AboutSection() {
  const [before, after] = aboutLead.text.split(aboutLead.highlight);

  return (
    <section id='about' className='scroll-mt-14 pt-6 md:scroll-mt-0 md:pt-10'>
      <SectionHeader num='01' title='About' subtitle='User-driven & Code-crafted · Frontend Developer' />

      <div className='grid gap-10 pt-10 md:grid-cols-[1.2fr_1fr] md:gap-14'>
        <div>
          <p className='font-editorial text-lg leading-[1.8] md:text-[22px]'>
            {before}
            <em className='bg-[linear-gradient(transparent_62%,var(--highlight)_62%)] not-italic'>{aboutLead.highlight}</em>
            {after}
          </p>
          <p className='mt-7 text-[13px] tracking-[0.06em] text-(--muted)'>— {aboutLead.sign}</p>
        </div>

        <div>
          {traitGroups.map((group) => (
            <div key={group.title} className='border-t border-(--ink) pt-4 pb-6'>
              <h2 className='mb-2.5 text-xs tracking-[0.16em] text-(--muted)'>{group.title}</h2>
              <ul>
                {group.items.map((item) => (
                  <li key={item} className='pl-[1.15em] -indent-[1.15em] text-[15px] leading-[1.9] before:text-(--accent) before:content-["—_"]'>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
