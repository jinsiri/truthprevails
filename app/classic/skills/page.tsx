import { SiReact, SiJavascript, SiTypescript, SiNodeDotJs, SiHtml5, SiCss3, SiSpring, SiSpringboot, SiNextdotjs, SiPostgresql } from 'react-icons/si';
import Image from 'next/image';
import { BsFiletypeScss } from 'react-icons/bs';
import { FaDocker, FaGit, FaGithub, FaJava, FaLinux } from 'react-icons/fa';
import { GrCertificate } from 'react-icons/gr';

export default function ClassicSkills() {
  return (
    <section className={'relative h-screen overflow-hidden bg-emerald-300'}>
      <h2 className={'text-right text-4xl font-black uppercase md:text-5xl lg:text-7xl'}>Skills_</h2>
      <Image
        className={'absolute -right-10 bottom-0 max-w-1/2'}
        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/skill.png`}
        alt={'my skills'}
        width={650}
        height={650}
      />
      <div className={'relative z-10 mt-10 space-y-8 pl-4 text-4xl md:text-5xl lg:text-7xl xl:pl-8'}>
        <h3 className={'mb-2 text-xl font-medium md:text-2xl lg:text-3xl'}>Frontend</h3>
        <ul className={'flex gap-2'}>
          <li>
            <SiHtml5 />
          </li>
          <li>
            <SiCss3 />
          </li>
          <li>
            <BsFiletypeScss />
          </li>
          <li>
            <SiJavascript />
          </li>
          <li>
            <SiTypescript />
          </li>
          <li>
            <SiReact />
          </li>
          <li>
            <SiNextdotjs />
          </li>
        </ul>

        <h3 className={'mb-2 text-xl font-medium md:text-2xl lg:text-3xl'}>Backend</h3>
        <ul className={'flex gap-2'}>
          <li>
            <FaJava />
          </li>
          <li>
            <SiSpring />
          </li>
          <li>
            <SiSpringboot />
          </li>
          <li>
            <SiPostgresql />
          </li>
          <li>
            <FaDocker />
          </li>
          <li>
            <FaLinux />
          </li>
        </ul>

        <h3 className={'mb-2 text-xl font-medium md:text-2xl lg:text-3xl'}>Tools</h3>
        <ul className={'flex gap-2'}>
          <li>
            <FaGit />
          </li>
          <li>
            <FaGithub />
          </li>
          <li></li>
        </ul>

        <h3 className={'mb-2 text-xl font-medium md:text-2xl lg:text-3xl'}>Certificate</h3>
        <div className={'flex items-center space-x-2'}>
          <GrCertificate />
          <p className={'md:text-md text-sm lg:text-xl'}>
            (2022. 12) SQL Developer
            <br />
            (2021. 08) 정보처리기사
          </p>
        </div>
      </div>
    </section>
  );
}
