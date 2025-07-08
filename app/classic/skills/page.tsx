'use client';

import { SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiSpring, SiSpringboot, SiNextdotjs, SiPostgresql } from 'react-icons/si';
import { BsFiletypeScss } from 'react-icons/bs';
import { FaDocker, FaGit, FaGithub, FaJava, FaLinux } from 'react-icons/fa';
import { GrCertificate } from 'react-icons/gr';
import { motion } from 'framer-motion';
import ThemedImage from '@/components/ThemedImage';
import { useState } from 'react';

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

const SkillTextList = ({ skills }: { skills: string[] }) => (
  <ul className='flex flex-wrap gap-2'>
    {skills.map((skill, index) => {
      const addComma = index < skills.length - 1 ? skill.concat(',') : skill;

      return (
        <li key={index} className={'text-base md:text-xl lg:text-2xl'}>
          {addComma}
        </li>
      );
    })}
  </ul>
);

const tabInfo = [
  { id: 'icon', text: '아이콘' },
  { id: 'text', text: '텍스트' },
];
const frontendTextList = ['Html5', 'Css3', 'SCSS', 'Javascript', 'Typescript', 'React', 'Next'];
const frontendIcons = [SiHtml5, SiCss3, BsFiletypeScss, SiJavascript, SiTypescript, SiReact, SiNextdotjs];
const backendTextList = ['Java', 'Spring', 'Springboot', 'Postgresql', 'Docker', 'Linux'];
const backendIcons = [FaJava, SiSpring, SiSpringboot, SiPostgresql, FaDocker, FaLinux];
const toolsTextList = ['Git', 'Github'];
const toolsIcons = [FaGit, FaGithub];

export default function ClassicSkills() {
  const [activeTab, setActiveTab] = useState('icon');

  return (
    <section className={'relative flex min-h-screen flex-col items-center bg-emerald-300 md:items-start md:overflow-hidden'}>
      <h2 className={'w-full text-right text-4xl font-black uppercase md:text-5xl lg:text-7xl'}>Skills_</h2>
      <motion.div
        className={'-right-10 bottom-0 mt-10 max-w-1/2 md:absolute'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <ThemedImage lightSrc={`/images/classic/skill.webp`} darkSrc={'/images/classic/skill_w.webp'} alt={'my skills'} width={650} height={650} priority />
      </motion.div>

      <div className={'relative z-10 mt-8 space-y-8 pl-4 text-4xl md:mt-0 md:text-5xl lg:text-7xl xl:pl-8'}>
        <div className='relative z-10 w-full border-b border-gray-600 text-center text-sm font-medium text-gray-500 md:text-lg xl:text-lg dark:border-gray-700'>
          <ul className='-mb-px flex w-full flex-wrap'>
            {tabInfo.map((ti, index) => (
              <li className='me-2' key={index}>
                <button
                  onClick={() => setActiveTab(ti.id)}
                  className={`inline-block rounded-t-lg border-b-2 px-4 py-2 ${
                    activeTab === ti.id
                      ? 'border-sky-700 font-bold text-sky-700 dark:border-sky-500 dark:text-sky-500'
                      : 'border-transparent text-gray-600 hover:border-gray-600 hover:text-gray-700'
                  }`}
                >
                  {ti.text}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <h3 className='mb-2 text-xl font-medium md:text-2xl lg:text-3xl'>Frontend</h3>
        {activeTab === 'icon' ? <AnimatedIconList icons={frontendIcons} /> : <SkillTextList skills={frontendTextList} />}

        <h3 className='mb-2 text-xl font-medium md:text-2xl lg:text-3xl'>Backend</h3>
        {activeTab === 'icon' ? <AnimatedIconList icons={backendIcons} /> : <SkillTextList skills={backendTextList} />}

        <h3 className='mb-2 text-xl font-medium md:text-2xl lg:text-3xl'>Tools</h3>
        {activeTab === 'icon' ? <AnimatedIconList icons={toolsIcons} /> : <SkillTextList skills={toolsTextList} />}

        <h3 className='mb-2 text-xl font-medium md:text-2xl lg:text-3xl'>Certificate</h3>
        <motion.div
          initial={{ opacity: 0, x: -10, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-10 flex items-center space-x-2 xl:mb-0'
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
