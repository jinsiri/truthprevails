export const SkillTextList = ({ skills }: { skills: string[] }) => (
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
