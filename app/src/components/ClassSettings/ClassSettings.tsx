import React, { useState } from 'react';
import { Class } from '../../models/Class/class';
import { SwitchBar } from '../UI/SwitchBar';
import styles from './ClassSettings.module.scss';

type ClassSettingsTypes = {
  classes: Class[];
};

export const ClassSettings = ({ classes }: ClassSettingsTypes) => {
  const [activeClass, setActiveClass] = useState(classes[0].id);

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
    </div>
  );
};
