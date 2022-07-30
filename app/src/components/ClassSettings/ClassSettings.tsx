import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Class } from '../../models/Class/class';
import { frontendRoutes } from '../../utils/router/routes';
import { AddBanner } from '../UI/AddBanner';
import { SwitchBar } from '../UI/SwitchBar';
import styles from './ClassSettings.module.scss';
import { ClassSettingsTable } from './ClassSettingsTable';

type ClassSettingsTypes = {
  classes: Class[];
};

export const ClassSettings = ({ classes }: ClassSettingsTypes) => {
  const navigate = useNavigate();
  const [activeClass, setActiveClass] = useState(classes[0].id);
  const userClass = useMemo(
    () => classes.find((group) => group.id === activeClass) ?? classes[0],
    [activeClass, classes]
  );

  const handleAddKid = useCallback(() => {
    navigate(frontendRoutes.kid.add);
  }, [navigate]);

  return (
    <div className={styles.settings}>
      <SwitchBar
        items={[
          ...classes.map((group) => {
            return {
              label: group.label,
              active: activeClass === group.id,
              id: group.id,
            };
          }),
        ]}
        handleChangeActive={setActiveClass}
        onAdd={() => {}}
      />
      <div className={styles.settings__item}>
        <AddBanner label="Добавить ученика" onClick={handleAddKid} />
      </div>
      <div className={styles.settings__item}>
        <ClassSettingsTable userClass={userClass} />
      </div>
    </div>
  );
};
