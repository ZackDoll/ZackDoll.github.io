import Reveal from '../../components/Reveal';
import SectionHeader from '../../components/SectionHeader';
import styles from './Skills.module.css';

const SKILL_GROUPS = [
  {
    title: 'Project Experience With',
    skills: ['Python', 'JavaScript', 'React', 'Node.js', 'HTML/CSS', 'TensorFlow', 'PyTorch', 'OpenCV', 'AWS'],
  },
  {
    title: 'Familiar With',
    skills: ['Express.js', 'MongoDB', 'PostgreSQL', 'C++', 'Java'],
  },
  {
    title: 'Currently Learning',
    skills: ['TypeScript', 'Docker', 'GraphQL', 'OAuth'],
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <SectionHeader number="02" title="Skills & Technologies" />
      <div className={styles.skillsContainer}>
        {SKILL_GROUPS.map((group) => (
          <div className={styles.skillCategory} key={group.title}>
            <Reveal as="h3" className={styles.skillCategoryTitle}>{group.title}</Reveal>
            <div className={styles.skillList}>
              {group.skills.map((skill, i) => (
                <Reveal as="span" className={styles.skillCell} key={skill} delay={60 + i * 30}>
                  <span className={styles.skillItem}>{skill}</span>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
