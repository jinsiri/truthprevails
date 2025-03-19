import Image from 'next/image';

export default function Home() {
	return (
		<main className={'h-screen flex flex-col items-center justify-center text-center'}>
			<h1 className={'text-3xl md:text-5xl'}>TRUTH WORLD에<br /> 오신 것을 환영합니다.</h1>
			<div className={'game-box flex items-end justify-center'} style={{ height: '380px', width: '90%', maxWidth: '700px' }}>
				<Image src={'/images/jinsil2.png'} alt={'jinsil'} width={300} height={300}/>
				<p className={'text-hello'}>안녕하세요!😀</p>
			</div>
			<div>
				<a
					className={'btn-start block text-xl md:text-2xl'}
					href='#'
					target='_blank'
					rel='noopener noreferrer'
				>
					게임 시작하기
				</a>
				{/*          <a
              className={styles.primary}
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
          >
            <Image
                className={styles.logo}
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
            />
            게임 시작하기 →
          </a>*/}
			</div>
			{/*        <div>
          <a
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              download
              rel="noopener noreferrer"
          >
            시간이 없어요! <strong>서류만 다운로드하기</strong>
          </a>
        </div>*/}
			<footer className={'fixed bottom-0 py-3 text-sm'}>© 2025. Jinsil Kwon all rights reserved.</footer>
		</main>
	);
}
