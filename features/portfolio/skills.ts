import { SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiSpring, SiSpringboot, SiNextdotjs, SiPostgresql } from 'react-icons/si';
import { BsFiletypeScss } from 'react-icons/bs';
import { FaDocker, FaGit, FaGithub, FaJava, FaLinux } from 'react-icons/fa';

export const tabInfo = [
  { id: 'icon', text: '아이콘' },
  { id: 'text', text: '텍스트' },
];
export const frontendTextList = [
  'HTML5',
  'CSS3',
  'SCSS/SASS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Recoil',
  'Redux',
  'Zustand',
  'TanStack Query',
  '웹 접근성',
  'Cross Browsing',
];
export const frontendIcons = [SiHtml5, SiCss3, BsFiletypeScss, SiJavascript, SiTypescript, SiReact, SiNextdotjs];
export const backendTextList = ['Java', 'Spring Boot', 'Spring Data JPA', 'PostgreSQL', 'Supabase'];
export const backendIcons = [FaJava, SiSpring, SiSpringboot, SiPostgresql, FaDocker, FaLinux];
export const toolsTextList = ['Linux', 'Docker', 'Git', 'Vercel', 'Figma'];
export const toolsIcons = [FaGit, FaGithub];
