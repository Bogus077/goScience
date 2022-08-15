import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../models/Project/Project';
import { frontendRoutes } from '../../utils/router/routes';
import { AddBanner } from '../UI/AddBanner';
import { SwitchBar } from '../UI/SwitchBar';
import { ProjectsRow } from './ProjectsRow';
import styles from './ProjectsTable.module.scss';

type ProjectsTableTypes = {
  projects: Project[];
};

export const ProjectsTable = ({ projects }: ProjectsTableTypes) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(2);

  const handleAddProject = useCallback(() => {
    navigate(frontendRoutes.project.add);
  }, [navigate]);

  const getVisibleProjects = () => {
    //Активные проекты
    if (activeFilter === 1) {
      return projects.filter((pr) => !pr.archived);
    } else if (activeFilter === 2) {
      //Все проекты
      return projects;
    } else if (activeFilter === 3) {
      // Арихвные проекты
      return projects.filter((pr) => pr.archived);
    } else {
      return [];
    }
  };

  return (
    <div className={styles.projects}>
      <div className={styles.projects__type}>
        <SwitchBar
          items={[
            { label: 'Активные', active: activeFilter === 1, id: 1 },
            { label: 'Все проекты', active: activeFilter === 2, id: 2 },
            { label: 'Архивные', active: activeFilter === 3, id: 3 },
          ]}
          handleChangeActive={setActiveFilter}
        />
      </div>

      <div className={styles.projects__add}>
        <AddBanner label="Добавить проект" onClick={handleAddProject} />
      </div>

      <div className={styles.projects__table}>
        {getVisibleProjects().map((project) => (
          <ProjectsRow key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};
