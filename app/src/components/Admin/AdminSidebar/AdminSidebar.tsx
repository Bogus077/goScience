import React from 'react';
import styles from './AdminSidebar.module.scss';
import { AdminSidebarContainer } from './AdminSidebarContainer';
import {
  IconHome2,
  IconUsers,
  IconCalendarEvent,
  IconMailbox,
  IconLockSquareRounded,
  IconHistory,
  IconUserCircle,
  IconBell,
  IconSchool,
  IconNotes,
} from '@tabler/icons';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { frontendRoutes } from '../../../utils/router/routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '../../../redux/GSApi';
import { isUserAdmin, isUserAdminOrHead } from '../../../utils/user/user';

export const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user } = useGetUserQuery('');
  const isAdmin = user && isUserAdmin(user);
  const isAdminOrHead = user && isUserAdminOrHead(user);

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

          <ListItemButton
            onClick={() => navigate(frontendRoutes.admin.events)}
            selected={new RegExp(frontendRoutes.admin.events).test(
              location.pathname
            )}
          >
            <ListItemIcon>
              <IconCalendarEvent />
            </ListItemIcon>
            <ListItemText primary="Мероприятия" />
          </ListItemButton>

          {isAdminOrHead && (
            <ListItemButton
              onClick={() => navigate(frontendRoutes.admin.teachers)}
              selected={new RegExp(frontendRoutes.admin.teachers).test(
                location.pathname
              )}
            >
              <ListItemIcon>
                <IconSchool />
              </ListItemIcon>
              <ListItemText primary="Преподаватели" />
            </ListItemButton>
          )}

            <ListItemButton
              onClick={() => navigate(frontendRoutes.admin.marks.marks)}
              selected={new RegExp(frontendRoutes.admin.marks.marks).test(
                location.pathname
              )}
            >
              <ListItemIcon>
                <IconNotes />
              </ListItemIcon>
              <ListItemText primary="Оценки" />
            </ListItemButton>

          <ListItemButton
            selected={false}
            href="https://biz.mail.ru/login/kk-a.ru"
            target="_blank"
          >
            <ListItemIcon>
              <IconMailbox />
            </ListItemIcon>
            <ListItemText primary="Почта" />
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
            </ListItemButton>
          </List>
        </AdminSidebarContainer>
      )}
    </div>
  );
};
