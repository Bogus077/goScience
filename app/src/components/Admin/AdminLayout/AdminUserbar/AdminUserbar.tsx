import Chip from '@mui/material/Chip';
import React from 'react';
import { IconUserCircle, IconSettings, IconBell } from '@tabler/icons';
import { useGetUserQuery } from '../../../../redux/GSApi';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { CircularProgress, Popover } from '@mui/material';
import { AdminNotifBar } from './AdminNotifBar';

export const AdminUserbar = () => {
  const { data: user, isLoading } = useGetUserQuery('');
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const notifications = 0;

  const handleNotifOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isNotifOpen = Boolean(anchorEl);

  if (isLoading) return <CircularProgress size={30} />;

  return (
    <Grid container justifyContent="flex-end" alignItems="center" spacing={2}>
      <Grid item>
        <IconButton aria-label="notif" onClick={handleNotifOpen}>
          <Badge badgeContent={notifications} color="primary">
            <IconBell />
          </Badge>
        </IconButton>
      </Grid>
      <Grid item>
        <Chip
          icon={<IconUserCircle />}
          label={`${user?.surname} ${user?.name}`}
          variant="outlined"
          color="primary"
          onDelete={() => {}}
          deleteIcon={<IconSettings />}
        />
      </Grid>
      <Popover
        id="popover"
        open={isNotifOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <AdminNotifBar />
      </Popover>
    </Grid>
  );
};
