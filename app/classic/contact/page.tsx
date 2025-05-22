import Image from 'next/image';

export default function ClassicContact() {
  return (
    <section className={'relative h-screen bg-purple-200'}>
      <h2 className={'text-center text-4xl font-black uppercase md:text-5xl lg:text-7xl'}>Contact</h2>
      <div className={'flex h-3/4 items-center pl-120 text-2xl font-medium md:text-3xl lg:text-4xl xl:text-5xl'}>
        <Image
          className={'absolute bottom-0 -left-40'}
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/search.png`}
          alt={'How to contact jinsil'}
          width={550}
          height={550}
        />

        <ul className={'space-y-6'}>
          <li className={'flex items-center gap-2'}>
            <h3 className={'w-50 text-purple-700'}>E-MAIL</h3>
            <a href={'tel:01034845519'}>developer.js.corn@gmail.com</a>
          </li>
          <li className={'flex items-center gap-2'}>
            <h3 className={'w-50 text-purple-700 uppercase'}>Github</h3>
            <a href={'https://github.com/jinsiri'} target='_blank'>
              https://github.com/jinsiri
            </a>
          </li>
        </ul>
      </div>
      <div className={'absolute top-40 right-0 flex h-3/4 flex-col items-center rounded-tl-xl bg-purple-100 px-10 pt-14 text-center'}>
        <div className={'flex h-[300px] w-[300px] items-center justify-center bg-amber-400'}>
          <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/contact_qr.png`} alt={'developer.js.corn@gmail.com'} width={250} height={250} />
        </div>

        <p className={'mt-6 text-xl font-medium'}>
          카메라를 열어 <strong className={'text-purple-700'}>QR 코드를 스캔</strong>하시면 <br />
          연락처를 추가하실 수 있습니다
        </p>

        {/*        <p className={'my-4 font-black'}>OR</p>

        <a href='mailto:developer.js.corn@gmail.com' className={'text-xl underline'}>
          developer.js.corn@gmail.com
        </a>*/}
      </div>
    </section>
  );
}
