import React from 'react';
import classNames from 'classnames/bind';
import styles from './ProjectChooser.module.scss';
import { Project } from '../../../models/Project/Project';
const cx = classNames.bind(styles);

type ProjectChooserTypes = {
  projects: Project[];
  type?: 'single' | 'multiple';
  active: number[];
  setActive: React.Dispatch<React.SetStateAction<number[]>>;
};

export const ProjectChooser = ({
  projects,
  type = 'single',
  active,
  setActive,
}: ProjectChooserTypes) => {
  const handleClick = (id: number) => {
    if (active.includes(id)) {
      const next = active.filter((kidId) => kidId !== id);
      setActive(next);
    } else {
      const next = type === 'single' ? [id] : [...active, id];
      setActive(next);
    }
  };

  return (
    <div className={styles.chooser}>
      {projects.map((project) => (
        <div
          className={cx('chooser__item', {
            chooser__item_active: active.includes(project.id ?? 0),
          })}
          key={project.id}
          onClick={() => handleClick(project.id ?? 0)}
        >
          {project.label}
        </div>
      ))}
    </div>
  );
};
