import Image from 'next/image';
import Link from 'next/link';
import ThemeToggleButton from '@/components/ThemeToggleButton';

export default function Home() {
  return (
    <main className={'flex min-h-screen flex-col items-center justify-center bg-amber-50 px-4 pt-10 pb-2.5 text-center'}>
      <h1 className={'text-2xl break-keep md:text-3xl lg:text-5xl'}>
        TRUTH WORLD에
        <br /> 오신 것을 환영합니다.
      </h1>
      <div className={'game-box flex min-h-[380px] max-w-[700px] items-end justify-center lg:w-[90%]'}>
        <Image src={`/images/jinsil2.webp`} alt={'jinsil'} width={300} height={300} priority />
        <p className={'text-hello'}>안녕하세요!😀</p>
      </div>
      <div className={'mt-2 mb-6 flex w-[90%] flex-col space-y-2 md:w-auto md:flex-row md:justify-center md:space-y-0 md:space-x-2'}>
        <Link className={'rounded-full border-2 border-amber-950 bg-amber-950 px-6 py-1 text-xl text-gray-50 md:text-2xl'} href='/game'>
          게임 모드
        </Link>
        <Link className={'block rounded-full border-2 border-amber-950 px-6 py-1 text-xl text-amber-950 md:text-2xl'} href='/classic'>
          클래식 모드
        </Link>
      </div>
      <footer className={'bottom-0 py-3 text-sm md:fixed'}>© 2025. Jinsil Kwon all rights reserved.</footer>
      <ThemeToggleButton />
    </main>
  );
}
