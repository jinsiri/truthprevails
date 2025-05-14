import Link from 'next/link';
import ThemeToggleButton from '@/components/ThemeToggleButton';

export function GlobalNavigation() {
  return (
    <nav className={'fixed top-5 left-1/2 flex w-full -translate-x-1/2 justify-between px-8 text-xl'}>
      <ul className={'flex gap-8'}>
        <li>
          <Link href={'/classic/about'}>About</Link>
        </li>
        <li>
          <Link href={'/classic/career'}>Career</Link>
        </li>
        <li>
          <Link href={'/classic/skills'}>Skills</Link>
        </li>
        <li>
          <Link href={'/classic/education'}>Education</Link>
        </li>
        <li>
          <Link href={'/classic/contact'}>Contact</Link>
        </li>
      </ul>
      <ThemeToggleButton />
    </nav>
  );
}
