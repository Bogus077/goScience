import React, { ReactElement, useState } from 'react';
import styles from './AdminLayout.module.scss';
import classNames from 'classnames/bind';
import { AdminSidebar } from '../AdminSidebar';
import { AdminLogo } from '../AdminLogo';
import { IconMenu2 } from '@tabler/icons';
import { createTheme, IconButton, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
const cx = classNames.bind(styles);

type AdminLayoutTypes = {
  children: ReactElement | ReactElement[];
};

const theme = createTheme({
  typography: {
    fontFamily: "'Exo2', sans-serif",
  },
});

export const AdminLayout = ({ children }: AdminLayoutTypes) => {
  const [open, setOpen] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <div className={styles.layout}>
          <div className={styles.header}>
            <div className={styles.header__sidebar}>
              <AdminLogo />
              <div className={styles.sidebarBtn}>
                <IconButton onClick={() => setOpen((prev) => !prev)}>
                  <IconMenu2 />
                </IconButton>
              </div>
            </div>
            User
          </div>

          <div className={styles.main}>
            <div className={cx('sidebar', { sidebar_hidden: !open })}>
              <AdminSidebar />
            </div>
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
};
