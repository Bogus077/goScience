import {
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  TableContainer,
  Typography,
} from '@mui/material';
// eslint-disable-next-line import/named
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// eslint-disable-next-line import/no-unresolved
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { IconUserPlus, IconUserMinus } from '@tabler/icons';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import {
  useAddRoleToUserMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useRemoveRoleFromUserMutation,
} from '../../../redux/GSApi';
import { ConfirmModal } from '../ConfirmModal';
import { User } from '../../../models/User/user';
import { getUserRole } from '../../../utils/user/user';

export const AdminTeachers = () => {
  const { data } = useGetUsersQuery('');
  const { data: currentUser } = useGetUserQuery('');
  const [removeRole, { isLoading: isRemoveRoleLoading }] =
    useRemoveRoleFromUserMutation();
  const [addRole, { isLoading: isAddRoleLoading }] = useAddRoleToUserMutation();
  const { enqueueSnackbar } = useSnackbar();

  const [userRoleToDelete, setUserRoleToDelete] = useState<User | null>(null);
  const [userRoleToAdd, setUserRoleToAdd] = useState<User | null>(null);

  const handleRoleRemove = useCallback(
    (user: User) => setUserRoleToDelete(user),
    []
  );

  const handleRoleAdd = useCallback((user: User) => setUserRoleToAdd(user), []);

  const handleRoleRemoveAccept = useCallback(async () => {
    const result =
      userRoleToDelete?.id &&
      (await removeRole({ UserId: userRoleToDelete.id, RoleId: 2 }));
    setUserRoleToDelete(null);
    if ((result as { error: FetchBaseQueryError }).error) {
      enqueueSnackbar(
        `Ошибка отзыва доступа: ${
          (result as { error: FetchBaseQueryError }).error.data
        }`,
        {
          variant: 'error',
        }
      );
    } else {
      enqueueSnackbar(
        `Доступ преподавателя ${userRoleToDelete?.surname} ${userRoleToDelete?.name} успешно отозван`,
        {
          variant: 'success',
        }
      );
    }
  }, [
    enqueueSnackbar,
    removeRole,
    userRoleToDelete?.id,
    userRoleToDelete?.name,
    userRoleToDelete?.surname,
  ]);

  const handleRoleAddAccept = useCallback(async () => {
    const result =
      userRoleToAdd?.id &&
      (await addRole({ UserId: userRoleToAdd.id, RoleId: 2 }));
    setUserRoleToAdd(null);
    if ((result as { error: FetchBaseQueryError }).error) {
      enqueueSnackbar(
        `Ошибка выдачи доступа: ${
          (result as { error: FetchBaseQueryError }).error.data
        }`,
        {
          variant: 'error',
        }
      );
    } else {
      enqueueSnackbar(
        `Доступ успешно выдан преподавателю: ${userRoleToAdd?.surname} ${userRoleToAdd?.name}`,
        {
          variant: 'success',
        }
      );
    }
  }, [
    addRole,
    enqueueSnackbar,
    userRoleToAdd?.id,
    userRoleToAdd?.name,
    userRoleToAdd?.surname,
  ]);

  const columns: GridColDef<User>[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'name',
      headerName: 'ФИО',
      flex: 1,
      renderCell: (params) => (
        <Typography>{`${params.row.surname} ${params.row.name}`}</Typography>
      ),
    },
    {
      field: 'phone',
      headerName: 'Телефон',
      flex: 1,
      renderCell: (params) => <Typography>{params.row.phone}</Typography>,
    },
    {
      field: 'role',
      headerName: 'Роли',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={2}>
          {params.row.Roles.map((role) => (
            <Chip label={getUserRole(role)} key={role.id} />
          ))}
        </Stack>
      ),
    },
    {
      field: 'roleActions',
      headerName: 'Действия',
      flex: 1,
      renderCell: (params) =>
        currentUser?.id !== params.row.id &&
        (currentUser?.Roles.map((role) => role.name).includes('head') ||
          currentUser?.Roles.map((role) => role.name).includes('admin')) && (
          <Stack direction="row" spacing={2}>
            {params.row.Roles.map((role) => role.name).includes('officer') ? (
              <Button
                startIcon={<IconUserMinus />}
                variant="outlined"
                onClick={() => handleRoleRemove(params.row)}
                color="error"
              >
                Отозвать доступ
              </Button>
            ) : (
              <Button
                startIcon={<IconUserPlus />}
                variant="outlined"
                onClick={() => handleRoleAdd(params.row)}
                color="success"
              >
                Выдать доступ
              </Button>
            )}
          </Stack>
        ),
    },
  ];

  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{ padding: 1 }}>
          <DataGrid
            rows={data?.filter((user) => user.surname !== 'Tester') ?? []}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            autoHeight={true}
          />
        </TableContainer>
      </Grid>
      {userRoleToDelete && (
        <ConfirmModal
          open={Boolean(userRoleToDelete)}
          onAgree={
            userRoleToDelete.id === 1
              ? () => setUserRoleToDelete(null)
              : handleRoleRemoveAccept
          }
          onCancel={() => setUserRoleToDelete(null)}
          title={
            userRoleToDelete.id === 1 ? 'Не надо так делать' : 'Отозвать доступ'
          }
          isSubmitting={isRemoveRoleLoading}
          agreeButtonText="Отмена"
        >
          {userRoleToDelete.id === 1
            ? 'Отозвать доступ у админа? За вами уже выехали. Оставайтесь на месте'
            : `Доступ преподавателя ${userRoleToDelete.surname}
          ${userRoleToDelete.name} будет отозван`}
        </ConfirmModal>
      )}

      {userRoleToAdd && (
        <ConfirmModal
          open={Boolean(userRoleToAdd)}
          onAgree={handleRoleAddAccept}
          onCancel={() => setUserRoleToAdd(null)}
          title="Выдать доступ"
          isSubmitting={isAddRoleLoading}
        >
          Преподавателю {userRoleToAdd.surname} {userRoleToAdd.name} будет выдан
          доступ к расходу
        </ConfirmModal>
      )}
    </Grid>
  );
};
