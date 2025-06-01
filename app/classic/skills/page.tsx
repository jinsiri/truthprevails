'use client';

import { SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiSpring, SiSpringboot, SiNextdotjs, SiPostgresql } from 'react-icons/si';
import Image from 'next/image';
import { BsFiletypeScss } from 'react-icons/bs';
import { FaDocker, FaGit, FaGithub, FaJava, FaLinux } from 'react-icons/fa';
import { GrCertificate } from 'react-icons/gr';
import { motion } from 'framer-motion';
import ThemedImage from '@/components/ThemedImage';

const AnimatedIconList = ({ icons, startDelay = 0 }: { icons: React.ElementType[]; startDelay?: number }) => (
  <ul className='flex flex-wrap gap-2'>
    {icons.map((Icon, index) => (
      <motion.li
        key={index}
        initial={{ opacity: 0, y: 20, x: -10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{
          delay: startDelay + index * 0.075,
          duration: 0.3,
        }}
      >
        <Icon />
      </motion.li>
    ))}
  </ul>
);

const frontendIcons = [SiHtml5, SiCss3, BsFiletypeScss, SiJavascript, SiTypescript, SiReact, SiNextdotjs];
const backendIcons = [FaJava, SiSpring, SiSpringboot, SiPostgresql, FaDocker, FaLinux];
const toolsIcons = [FaGit, FaGithub];

export default function ClassicSkills() {
  return (
    <section className={'relative flex min-h-screen flex-col items-center bg-emerald-300 md:items-start md:overflow-hidden'}>
      <h2 className={'w-full text-right text-4xl font-black uppercase md:text-5xl lg:text-7xl'}>Skills_</h2>
      <motion.div
        className={'-right-10 bottom-0 mt-10 max-w-1/2 md:absolute'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <ThemedImage lightSrc={`/images/skill.webp`} darkSrc={'/images/skill_w.webp'} alt={'my skills'} width={650} height={650} priority />
      </motion.div>

      <div className={'relative z-10 mt-10 space-y-8 pl-4 text-4xl md:text-5xl lg:text-7xl xl:pl-8'}>
        <h3 className='mb-2 text-xl font-medium md:text-2xl lg:text-3xl'>Frontend</h3>
        <AnimatedIconList icons={frontendIcons} />

        <h3 className='mb-2 text-xl font-medium md:text-2xl lg:text-3xl'>Backend</h3>
        <AnimatedIconList icons={backendIcons} />

        <h3 className='mb-2 text-xl font-medium md:text-2xl lg:text-3xl'>Tools</h3>
        <AnimatedIconList icons={toolsIcons} />

        <h3 className='mb-2 text-xl font-medium md:text-2xl lg:text-3xl'>Certificate</h3>
        <motion.div
          initial={{ opacity: 0, x: -10, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-10 flex items-center space-x-2'
        >
          <GrCertificate />
          <p className='md:text-md text-sm lg:text-xl'>
            (2022. 12) SQL Developer
            <br />
            (2021. 08) 정보처리기사
          </p>
        </motion.div>
      </div>
    </section>
  );
}
