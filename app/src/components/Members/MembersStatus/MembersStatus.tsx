import React, { useCallback } from 'react';
import classNames from 'classnames/bind';
import styles from './MembersStatus.module.scss';
import PrintIcon from '@mui/icons-material/Print';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../../utils/router/routes';
import { Stack, Tooltip } from '@mui/material';
const cx = classNames.bind(styles);

type MembersStatusTypes = {
  status: boolean;
  isLoading?: boolean;
};

export const MembersStatus = ({ status, isLoading }: MembersStatusTypes) => {
  const navigate = useNavigate();
  const handlePrint = useCallback(
    () => navigate(frontendRoutes.membersPrint),
    [navigate]
  );
  const handleAdminPanel = useCallback(
    () => navigate(frontendRoutes.admin.mainPage),
    [navigate]
  );
  const handleDashboard = useCallback(
    () => navigate(frontendRoutes.dashboard),
    [navigate]
  );

  return (
    <div className={styles.status}>
      <Stack direction="row" spacing={2}>
        <Tooltip title="Распечатать расход">
          <IconButton size="small" onClick={handlePrint}>
            <PrintIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Панель администрирования">
          <IconButton size="small" onClick={handleAdminPanel}>
            <AdminPanelSettingsIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Дашборд">
          <IconButton size="small" onClick={handleDashboard}>
            <DashboardIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>

      <div className={styles.statusDate}></div>
      <div className={styles.statusIndicator}>
        <div
          className={cx('statusIcon', {
            statusIcon_negative: !status,
            statusIcon_loading: isLoading,
          })}
        />
        <span>
          {isLoading
            ? 'Обновляю данные'
            : status
            ? 'Актуально'
            : 'Соединение потеряно. Обновите страницу, прежде чем вносить изменения в расход.'}
        </span>
      </div>
    </div>
  );
};
