import type { ContactLink } from './types';

export const CONTACT = {
  email: 'jinsil.kwon.dev@gmail.com',
  phone: '010-3484-5519',
  phoneHref: 'tel:01034845519',
  github: 'https://github.com/jinsiri',
  blog: 'https://today-i-played.tistory.com/',
};

export const CONTACT_LINKS: ContactLink[] = [
  {
    title: 'EMAIL',
    address: `mailto:${CONTACT.email}`,
  },
  {
    title: 'GITHUB',
    address: CONTACT.github,
  },
  {
    title: 'TECH BLOG',
    address: CONTACT.blog,
  },
];
