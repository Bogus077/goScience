/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../../models/Project/Project';
import {
  useArchiveProjectMutation,
  useRemoveProjectMutation,
} from '../../../redux/GSApi';
import { frontendRoutes } from '../../../utils/router/routes';
import { Badge } from '../../UI/Badge';
import { ConfirmModal } from '../../UI/ConfirmModal';
import { Loader } from '../../UI/Loader';
import { Submenu } from '../../UI/Submenu';
import styles from './ProjectsRow.module.scss';
import { ProjectTask } from './ProjectTask';

type ProjectsRowTypes = {
  project: Project;
};

export const ProjectsRow = ({ project }: ProjectsRowTypes) => {
  const navigate = useNavigate();
  const [archiveModal, setArchiveModal] = useState(false);
  const [removeModal, setRemoveModal] = useState(false);

  const [archiveProject, { isLoading: isArchiveLoading }] =
    useArchiveProjectMutation();
  const [removeProject, { isLoading: isRemoveLoading }] =
    useRemoveProjectMutation();

  const handleArchive = useCallback(() => {
    archiveProject({ ProjectId: project.id });
    setArchiveModal(false);
  }, [archiveProject, project.id]);

  const handleRemove = useCallback(() => {
    removeProject({ ProjectId: project.id });
    setRemoveModal(false);
  }, [project.id, removeProject]);

  return (
    <div className={styles.row}>
      <p id={project.id.toString()} />
      <div className={styles.row__header}>
        <Badge
          type={project.archived ? 'disable' : 'positive'}
          text={project.archived ? 'В архиве' : 'Активен'}
        />
        <div className={styles.row__title} title={project.label}>
          {project.label}
        </div>
        <div className={styles.row__submenu}>
          <Submenu
            links={[
              {
                title: 'Изменить проект',
                onClick: () =>
                  navigate(`${frontendRoutes.project.edit}/${project.id}`),
              },
              {
                title: 'Заархивировать проект',
                onClick: () => setArchiveModal(true),
              },
              {
                title: 'Удалить проект',
                onClick: () => setRemoveModal(true),
              },
              {
                title: 'Добавить задачу',
                onClick: () => navigate(`${frontendRoutes.project.addTask}`),
              },
            ]}
          />
        </div>
      </div>

      <div className={styles.row__tasks}>
        {isRemoveLoading || isArchiveLoading ? (
          <Loader />
        ) : (
          project.ProjectTasks.map((task) => (
            <ProjectTask key={task.id} task={task} />
          ))
        )}
      </div>

      <ConfirmModal
        isOpen={archiveModal}
        titleText="Архивировать проект"
        message={`Вы действительно хотите заархивировать проект: ${project.label}? Это действие необратимо.`}
        type="negative"
        acceptText="Архивировать"
        rejectText="Отменить архивацию"
        onAccept={handleArchive}
        onReject={() => setArchiveModal(false)}
      />

      <ConfirmModal
        isOpen={removeModal}
        titleText="Удалить проект"
        message={`Вы действительно хотите удалить проект: ${project.label}? Это действие необратимо.`}
        type="negative"
        acceptText="Удалить"
        rejectText="Отменить удаление"
        onAccept={handleRemove}
        onReject={() => setRemoveModal(false)}
      />
    </div>
  );
};
