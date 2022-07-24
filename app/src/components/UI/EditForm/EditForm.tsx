import React, { ReactElement } from 'react';
import styles from './EditForm.module.scss';

type EditFormTypes = {
  children: ReactElement;
  title: string;
  img?: string;
};

export const EditForm = ({ children, title, img }: EditFormTypes) => {
  return (
    <div className={styles.form}>
      <div className={styles.form__header}>{title}</div>
      <div className={styles.form__content}>
        <>
          {img && (
            <div
              className={styles.form__img}
              style={{ backgroundImage: `url(${img})` }}
            />
          )}
          {children}
        </>
      </div>
    </div>
  );
};
