import FadeInImage from '@/components/FadeInImage';
import SectionHeader from '@/components/classic/SectionHeader';
import { CONTACT } from '@/features/portfolio/contact';
import { IMAGE_ROOT } from '@/constants/imageSrc';

const LINKS = [
  { label: 'E-MAIL', href: `mailto:${CONTACT.email}`, text: CONTACT.email },
  { label: 'GITHUB', href: CONTACT.github, text: CONTACT.github.replace('https://', '') },
  { label: 'BLOG', href: CONTACT.blog, text: CONTACT.blog.replace('https://', '').replace(/\/$/, '') },
];

export default function ClassicContact() {
  return (
    <>
      <SectionHeader num='05' title='Contact' subtitle='Get in touch' />

      <dl className='pt-6'>
        {LINKS.map((link) => (
          <div key={link.label} className='grid gap-1 border-b border-(--ink)/30 py-6 md:grid-cols-[200px_1fr] md:items-baseline md:gap-6'>
            <dt className='text-xs tracking-[0.16em] text-(--muted)'>{link.label}</dt>
            <dd>
              <a
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel='noopener noreferrer'
                className='font-editorial text-xl break-all hover:text-(--accent) md:text-3xl'
              >
                {link.text}
              </a>
            </dd>
          </div>
        ))}

        <div className='grid gap-3 py-6 md:grid-cols-[200px_1fr] md:gap-6'>
          <dt className='text-xs tracking-[0.16em] text-(--muted)'>PHONE</dt>
          <dd>
            <a href={CONTACT.phoneHref} className='inline-block border border-(--ink) px-5 py-3 text-sm font-bold tracking-[0.06em] md:hidden'>
              전화 걸기 →
            </a>
            <div className='hidden items-center gap-6 md:flex'>
              <FadeInImage
                src={`${IMAGE_ROOT}/images/classic/contact_qr.png`}
                alt='연락처 QR 코드'
                width={120}
                height={120}
                className='border border-(--ink) bg-white p-2'
              />
              <p className='text-[15px] leading-7 text-(--muted)'>
                휴대폰 카메라로 QR 코드를 스캔하면
                <br />
                연락처를 저장할 수 있습니다.
              </p>
            </div>
          </dd>
        </div>
      </dl>
    </>
  );
}
