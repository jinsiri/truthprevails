import SectionHeader from '@/components/classic/SectionHeader';
import { frontendTextList, frontendIcons, backendTextList, backendIcons, toolsTextList, toolsIcons } from '@/features/portfolio/skills';

const SKILL_GROUPS = [
  { title: 'FRONTEND', icons: frontendIcons, items: frontendTextList },
  { title: 'BACKEND', icons: backendIcons, items: backendTextList },
  { title: 'TOOLS', icons: toolsIcons, items: toolsTextList },
];

const CERTIFICATES = [
  { date: '2022. 12', name: 'SQLD (SQL 개발자)' },
  { date: '2021. 08', name: '정보처리기사' },
];

export default function ClassicSkills() {
  return (
    <>
      <SectionHeader num='02' title='Skills' subtitle='Stack & Certificates' />

      <dl className='pt-6'>
        {SKILL_GROUPS.map(({ title, icons, items }) => (
          <div key={title} className='grid gap-3 border-b border-(--ink)/30 py-7 md:grid-cols-[200px_1fr] md:gap-6'>
            <dt className='text-xs tracking-[0.16em] text-(--muted)'>{title}</dt>
            <dd>
              <ul className='mb-3 flex flex-wrap gap-3 text-2xl md:text-3xl'>
                {icons.map((Icon, index) => (
                  <li key={index}>
                    <Icon />
                  </li>
                ))}
              </ul>
              <p className='text-[15px] leading-7 md:text-base'>{items.join(' · ')}</p>
            </dd>
          </div>
        ))}

        <div className='grid gap-3 py-7 md:grid-cols-[200px_1fr] md:gap-6'>
          <dt className='text-xs tracking-[0.16em] text-(--muted)'>CERTIFICATE</dt>
          <dd>
            <ul>
              {CERTIFICATES.map((cert) => (
                <li key={cert.name} className='flex gap-4 text-[15px] leading-8 md:text-base'>
                  <span className='font-editorial w-20 shrink-0 text-(--muted)'>{cert.date}</span>
                  <span>{cert.name}</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </>
  );
}
