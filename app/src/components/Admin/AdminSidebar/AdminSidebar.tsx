import React from 'react';
import styles from './AdminSidebar.module.scss';
import { AdminSidebarContainer } from './AdminSidebarContainer';
import {
  IconHome2,
  IconUsers,
  IconCalendarEvent,
  IconFileCheck,
  IconMailbox,
  IconLockSquareRounded,
  IconHistory,
  IconUserCircle,
  IconBell,
} from '@tabler/icons';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { frontendRoutes } from '../../../utils/router/routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../../../redux/GSApi';
import { isUserAdmin } from '../../../utils/user/user';

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user } = useGetUserQuery('');
  const isAdmin = user && isUserAdmin(user);

  return (
    <div className={styles.sidebar}>
      <AdminSidebarContainer title="Панель управления">
        <List component="nav">
          <ListItemButton
            selected={false}
            onClick={() => navigate(frontendRoutes.admin.mainPage)}
          >
            <ListItemIcon>
              <IconHome2 />
            </ListItemIcon>
            <ListItemText primary="Главная" />
          </ListItemButton>

          <ListItemButton
            selected={
              new RegExp(frontendRoutes.admin.members).test(
                location.pathname
              ) ||
              new RegExp(frontendRoutes.admin.addMember).test(location.pathname)
            }
            onClick={() => navigate(frontendRoutes.admin.members)}
          >
            <ListItemIcon>
              <IconUsers />
            </ListItemIcon>
            <ListItemText primary="Кадеты" />
          </ListItemButton>

          <ListItemButton selected={false}>
            <ListItemIcon>
              <IconCalendarEvent />
            </ListItemIcon>
            <ListItemText primary="Мероприятия" secondary="в разработке" />
            <IconLockSquareRounded />
          </ListItemButton>

          <ListItemButton selected={false}>
            <ListItemIcon>
              <IconFileCheck />
            </ListItemIcon>
            <ListItemText primary="Документы" secondary="в разработке" />
            <IconLockSquareRounded />
          </ListItemButton>

          <ListItemButton selected={false}>
            <ListItemIcon>
              <IconMailbox />
            </ListItemIcon>
            <ListItemText primary="Почта" secondary="в разработке" />
            <IconLockSquareRounded />
          </ListItemButton>
        </List>
      </AdminSidebarContainer>

      {isAdmin && (
        <AdminSidebarContainer title="Технический раздел">
          <List component="nav">
            <ListItemButton
              selected={new RegExp(frontendRoutes.admin.logs).test(
                location.pathname
              )}
              onClick={() => navigate(frontendRoutes.admin.logs)}
            >
              <ListItemIcon>
                <IconHistory />
              </ListItemIcon>
              <ListItemText primary="Логи" />
              <IconLockSquareRounded />
            </ListItemButton>

            <ListItemButton selected={false}>
              <ListItemIcon>
                <IconUserCircle />
              </ListItemIcon>
              <ListItemText primary="Пользователи" />
              <IconLockSquareRounded />
            </ListItemButton>

            <ListItemButton
              selected={new RegExp(frontendRoutes.admin.notifications).test(
                location.pathname
              )}
              onClick={() => navigate(frontendRoutes.admin.notifications)}
            >
              <ListItemIcon>
                <IconBell />
              </ListItemIcon>
              <ListItemText primary="Уведомления" />
              <IconLockSquareRounded />
            </ListItemButton>
          </List>
        </AdminSidebarContainer>
      )}
    </div>
  );
};
