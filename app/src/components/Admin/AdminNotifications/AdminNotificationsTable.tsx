import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
// eslint-disable-next-line import/named
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import formatDistance from 'date-fns/formatDistance';
import formatWithOptions from 'date-fns/fp/formatWithOptions';
import ru from 'date-fns/locale/ru';
import React, { useState } from 'react';
import { Notification } from '../../../models/Notifications/Notifications';
import { IconTrashX } from '@tabler/icons';
import { useRemoveNotificationMutation } from '../../../redux/GSApi';
import { useSnackbar } from 'notistack';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';

type AdminNotificationsTableTypes = {
  notifications: Notification[];
};

export const AdminNotificationsTable = ({
  notifications,
}: AdminNotificationsTableTypes) => {
  const [deleteNotification, setDeleteNotification] =
    useState<Notification | null>(null);

  const [removeNotification, { isLoading: isremoveNotificationLoading }] =
    useRemoveNotificationMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleNotificationRemove = (field: GridRenderCellParams<string>) => {
    setDeleteNotification(field.row);
  };

  const handleNotificationRemoveAccept = async () => {
    deleteNotification &&
      (await removeNotification({ id: deleteNotification.id }));
    setDeleteNotification(null);

    enqueueSnackbar(`Уведомление удалено`, {
      variant: 'success',
    });
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 0.1,
    },
    {
      field: 'title',
      headerName: 'Название',
      flex: 1,
    },
    {
      field: 'text',
      headerName: 'Текст уведомления',
      flex: 1,
    },
    {
      field: 'type',
      headerName: 'Тип уведомления',
      flex: 0.4,
    },
    {
      field: 'createdAt',
      headerName: 'Дата',
      flex: 0.4,
      renderCell: (params) => {
        const date = new Date(params.row.createdAt);
        return (
          <Tooltip
            title={
              <Typography variant="body2">
                {formatWithOptions(
                  { locale: ru },
                  'd MMMM yyyy || HH:mm'
                )(date)}
              </Typography>
            }
          >
            <Typography variant="body2">
              {formatDistance(date, new Date(), {
                addSuffix: true,
                locale: ru,
              })}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      field: 'remove',
      headerName: ' ',
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            handleNotificationRemove(params);
          }}
        >
          <IconTrashX size={20} />
        </IconButton>
      ),
      flex: 0.3,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
    },
  ];

  return (
    <TableContainer component={Paper} sx={{ padding: 1 }}>
      <DataGrid
        rows={notifications}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        autoHeight={true}
        initialState={{
          sorting: {
            sortModel: [{ field: 'id', sort: 'desc' }],
          },
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
      />
      {deleteNotification && (
        <ConfirmModal
          open={Boolean(deleteNotification)}
          onAgree={handleNotificationRemoveAccept}
          onCancel={() => setDeleteNotification(null)}
          title="Удалить уведомление"
          isSubmitting={isremoveNotificationLoading}
        >
          Уведомление будет безвозвратно удалено. Эта операция необратима
        </ConfirmModal>
      )}
    </TableContainer>
  );
};
