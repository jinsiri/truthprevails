import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={'flex h-screen flex-col items-center justify-center bg-orange-100 pb-2.5 text-center'}>
      <h1 className={'text-3xl md:text-5xl'}>
        TRUTH WORLD에
        <br /> 오신 것을 환영합니다.
      </h1>
      <div className={'game-box flex items-end justify-center'} style={{ height: '380px', width: '90%', maxWidth: '700px' }}>
        <Image src={`/images/jinsil2.png`} alt={'jinsil'} width={300} height={300} priority />
        <p className={'text-hello'}>안녕하세요!😀</p>
      </div>
      <div>
        <div className={'flex space-x-2'}>
          <Link className={'mt-2 mb-6 block rounded-full border-2 border-amber-950 bg-amber-950 px-6 py-1 text-xl text-white md:text-2xl'} href='/game'>
            게임 모드
          </Link>
          <Link className={'mt-2 mb-6 block rounded-full border-2 border-amber-950 px-6 py-1 text-xl text-amber-950 md:text-2xl'} href='/classic'>
            클래식 모드
          </Link>
        </div>
      </div>
      <footer className={'fixed bottom-0 py-3 text-sm'}>© 2025. Jinsil Kwon all rights reserved.</footer>
    </main>
  );
}
