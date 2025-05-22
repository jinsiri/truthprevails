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
    <div className='relative mb-10 pl-6'>
      <div className={`absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white dark:border-gray-900 ${dotColor}`}></div>
      <time className='md:text-md text-sm text-gray-500 lg:text-lg xl:text-xl dark:text-gray-400'>{date}</time>
      <h3 className='text-lg font-semibold text-gray-900 md:text-xl lg:text-2xl dark:text-white'>{title}</h3>
      <p className='text-basic lg:text-md text-gray-600 md:text-sm xl:text-lg dark:text-gray-300'>{description}</p>
    </div>
  );
}
