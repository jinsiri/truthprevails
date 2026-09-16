export interface EducationEntry {
  date: string;
  title: string;
  description: string;
  gameDescription?: string;
  color: 'blue' | 'purple' | 'yellow';
  skillSet: string[];
  spotKey: string;
  textClass: string;
}

export interface Experience {
  title: string;
  data: { label: string; value: string | string[] }[];
}
export interface Project {
  date: string;
  title: string;
  description: string;
  stack: string;
}
export interface ContactLink {
  title: string;
  address: string;
}
