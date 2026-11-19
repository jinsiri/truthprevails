import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { EducationEntry } from '@/features/portfolio/types';

interface JobPanelProps {
  entry: EducationEntry;
  inheritedSkills?: string[];
  className?: string;
}

const fadeIn = (delay: number) => ({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay } });

export default function JobPanel({ entry, inheritedSkills = [], className }: JobPanelProps) {
  return (
    <motion.div {...fadeIn(0)} className={clsx('border-4 border-black bg-[#232838]/95 p-1 text-white shadow-[4px_4px_0_rgba(0,0,0,0.35)]', className)}>
      <span className='absolute -top-4 left-3 border-2 border-black bg-yellow-300 px-2 py-0.5 text-xs font-bold whitespace-nowrap text-black'>
        {entry.previousJob ? 'CLASS CHANGE!' : 'JOB'}
      </span>
      <div className='border-2 border-white/25 px-3 pt-3.5 pb-2 md:pt-4 md:pb-3'>
        <p className='flex items-center gap-2 text-base whitespace-nowrap md:text-xl'>
          {entry.previousJob && (
            <>
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: 0.45 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className='line-through decoration-2'
              >
                {entry.previousJob}
              </motion.span>
              <span aria-hidden className='text-yellow-300'>
                ▶
              </span>
            </>
          )}
          <motion.span {...fadeIn(entry.previousJob ? 0.6 : 0.2)} className={clsx('font-bold', entry.textClass)}>
            {entry.job}
          </motion.span>
        </p>
        <motion.div {...fadeIn(entry.previousJob ? 0.9 : 0.4)} className='mt-2 border-t border-white/20 pt-2 text-xs leading-relaxed md:text-sm'>
          <p className={entry.textClass}>획득 스킬: {entry.skillSet.join(' · ')}</p>
          {inheritedSkills.length > 0 && <p className='mt-0.5 text-white/80'>계승 스킬: {inheritedSkills.join(' · ')}</p>}
        </motion.div>
      </div>
    </motion.div>
  );
}
