import React from 'react';
import styles from './Versions.module.scss';
import { VersionItem } from './VersionItem';

export const Versions = () => {
  return (
    <div className={styles.main}>
      <VersionItem version="1.0.1" />
    </div>
  );
};
