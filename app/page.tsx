import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
	return (
		<main className={'h-screen flex flex-col items-center justify-center text-center'}>
			<h1 className={'text-5xl'}>HELLO, USER!</h1>
			<div className={'mt-2'} style={{ height: '380px', width: '90%', maxWidth: '700px', border: '1px solid #ccc' }}></div>
			<div className={'mt-2'}>
				<a
					className={'text-base'}
					href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					target='_blank'
					rel='noopener noreferrer'
				>
					게임 시작하기 →
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
			<footer className={styles.footer}></footer>
		</main>
	);
}
