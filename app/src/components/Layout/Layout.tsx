import React, { ReactElement } from 'react';
import { PanelHeader } from '../PanelHeader';
import { MainMenu } from '../UI/MainMenu';
import styles from './Layout.module.scss';

type Props = {
  children: ReactElement;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <div className={styles.layout__sideMenu}>
        <MainMenu />
      </div>
      <div className={styles.layout__main}>
        <PanelHeader />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
