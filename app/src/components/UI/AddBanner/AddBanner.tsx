import React from 'react';
import styles from './AddBanner.module.scss';

type AddBannerTypes = {
  label: string;
  height?: number;
  onClick: () => void;
};

export const AddBanner = ({ label, height = 40, onClick }: AddBannerTypes) => {
  return (
    <div
      className={styles.banner}
      style={{ height: `${height}px` }}
      onClick={onClick}
    >
      <span>+</span>
      {label}
    </div>
  );
};
