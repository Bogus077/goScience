import React, { ReactElement } from 'react';
import { MainMenu } from '../UI/MainMenu';
import styles from './Layout.module.scss';

type Props = {
  children: ReactElement;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <MainMenu />
      <div className={styles.layout__main}>{children}</div>
    </div>
  );
};
