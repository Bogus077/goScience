import React, { ReactElement } from 'react';
import { useGetUserQuery } from '../../redux/GSApi';
import { PanelHeader } from '../PanelHeader';
import { MainMenu } from '../UI/MainMenu';
import { PageLoader } from '../UI/PageLoader';
import styles from './Layout.module.scss';
import { MainMenuMobile } from '../UI/MainMenuMobile';

type Props = {
  children: ReactElement;
};

export const Layout = ({ children }: Props) => {
  const { data, isLoading } = useGetUserQuery('');

  return (
    <div className={styles.layout}>
      {!data || isLoading ? (
        <PageLoader />
      ) : (
        <>
          <div className={styles.layout__sideMenu}>
            <div className={styles.layout__sideMenu_mobile}>
              <MainMenuMobile user={data} />
            </div>
            <div className={styles.layout__sideMenu_desktop}>
              <MainMenu user={data} />
            </div>
          </div>
          <div className={styles.layout__main}>
            <PanelHeader />
            <div className={styles.content}>{children}</div>
          </div>
        </>
      )}
    </div>
  );
};
