import React, { useMemo, useState } from 'react';
import { Class } from '../../models/Class/class';
import { SwitchBar } from '../UI/SwitchBar';
import styles from './ClassSettings.module.scss';
import { ClassSettingsTable } from './ClassSettingsTable';

type ClassSettingsTypes = {
  classes: Class[];
};

export const ClassSettings = ({ classes }: ClassSettingsTypes) => {
  const [activeClass, setActiveClass] = useState(classes[0].id);
  const userClass = useMemo(
    () => classes.find((group) => group.id === activeClass) ?? classes[0],
    [activeClass, classes]
  );

  return (
    <div className={styles.settings}>
      <SwitchBar
        items={[
          ...classes.map((group) => {
            return { class: group, active: activeClass === group.id };
          }),
        ]}
        handleChangeActive={setActiveClass}
      />
      <div className={styles.settings__item}>
        <ClassSettingsTable userClass={userClass} />
      </div>
    </div>
  );
};
