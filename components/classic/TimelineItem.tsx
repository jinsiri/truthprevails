import { motion } from 'framer-motion';
import { JSX } from 'react';

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

export function TimelineItem({ color = 'blue', date, title, description }: TimelineItemProps): JSX.Element {
  const colorMap = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
  };

  const dotColor = colorMap[color];

  return (
    <motion.div className='relative mb-10 pr-6'>
      <div className={`absolute -right-1.5 mt-1.5 h-3 w-3 rounded-full xl:mt-2.5 ${dotColor}`}></div>
      <time className='md:text-md text-sm text-gray-700 md:text-lg xl:text-xl'>{date}</time>
      <h3 className='text-lg font-semibold text-gray-900 md:text-2xl xl:text-3xl'>{title}</h3>
      <p className='text-basic md:text-md font-regular text-gray-800 xl:text-xl'>{description}</p>
    </motion.div>
  );
}
