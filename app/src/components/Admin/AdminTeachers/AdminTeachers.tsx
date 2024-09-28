import {
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
  TableContainer,
  Typography,
} from '@mui/material';
// eslint-disable-next-line import/named
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// eslint-disable-next-line import/no-unresolved
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import {
  IconUserPlus,
  IconUserMinus,
  IconTrashX,
  IconEdit,
  IconPencilMinus,
} from '@tabler/icons';
import { useSnackbar } from 'notistack';
import React, { useCallback, useState } from 'react';
import {
  useAddRoleToUserMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useRemoveRoleFromUserMutation,
  useRemoveUserMutation,
  useClearTeacherPasswordMutation,
} from '../../../redux/GSApi';
import { ConfirmModal } from '../ConfirmModal';
import { User } from '../../../models/User/user';
import { getUserRole } from '../../../utils/user/user';
import { useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../../utils/router/routes';

export const AdminTeachers = () => {
  const { data } = useGetUsersQuery('');
  const { data: currentUser } = useGetUserQuery('');
  const [removeRole, { isLoading: isRemoveRoleLoading }] =
    useRemoveRoleFromUserMutation();
  const [addRole, { isLoading: isAddRoleLoading }] = useAddRoleToUserMutation();
  const [removeUser] = useRemoveUserMutation();
  const [clearPassword, { isLoading: isPasswordClearLoading }] =
    useClearTeacherPasswordMutation();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [userRoleToDelete, setUserRoleToDelete] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userRoleToAdd, setUserRoleToAdd] = useState<User | null>(null);
  const [userClearPassword, setUserClearPassword] = useState<User | null>(null);

  const handleRoleRemove = useCallback(
    (user: User) => setUserRoleToDelete(user),
    []
  );

  const handleRoleAdd = useCallback((user: User) => setUserRoleToAdd(user), []);

  const handleUserDelete = useCallback(
    (user: User) => setUserToDelete(user),
    []
  );

  const handleUserRemoveAccept = useCallback(async () => {
    if (userToDelete) {
      try {
        await removeUser({ id: userToDelete.id }).unwrap();
        enqueueSnackbar(
          `Преподаватель ${userToDelete?.surname} ${userToDelete?.name} удалён`,
          {
            variant: 'success',
          }
        );
      } catch {
        enqueueSnackbar(
          `Ошибка удаления преподавателя ${userToDelete?.surname} ${userToDelete?.name}`,
          {
            variant: 'error',
          }
        );
      }
      setUserToDelete(null);
    }
  }, [enqueueSnackbar, removeUser, userToDelete]);

  const handleUserPasswordCleanAccept = useCallback(async () => {
    if (userClearPassword) {
      try {
        await clearPassword({ phone: userClearPassword.phone }).unwrap();
        enqueueSnackbar(
          `Пароль преподавателя ${userClearPassword?.surname} ${userClearPassword?.name} успешно сброшен`,
          {
            variant: 'success',
          }
        );
      } catch {
        enqueueSnackbar(
          `Ошибка сброса пароля преподавателя ${userClearPassword?.surname} ${userClearPassword?.name}`,
          {
            variant: 'error',
          }
        );
      }
      setUserClearPassword(null);
    }
  }, [enqueueSnackbar, clearPassword, userClearPassword]);

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
    userRoleToDelete,
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
        <Typography>{`${params.row.surname} ${params.row.name} ${
          params.row.middleName ?? ''
        }`}</Typography>
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
            <IconButton onClick={() => handleUserDelete(params.row)}>
              <IconTrashX color="darkRed" />
            </IconButton>
            <IconButton onClick={() => setUserClearPassword(params.row)}>
              <IconPencilMinus color="darkRed" />
            </IconButton>
            <IconButton
              onClick={() =>
                navigate(`${frontendRoutes.admin.editTeacher}/${params.row.id}`)
              }
            >
              <IconEdit />
            </IconButton>
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
          agreeButtonText="Отозвать доступ"
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

      {userToDelete && (
        <ConfirmModal
          open={Boolean(userToDelete)}
          onAgree={handleUserRemoveAccept}
          onCancel={() => setUserToDelete(null)}
          title="Удалить пользователя?"
          isSubmitting={isAddRoleLoading}
        >
          Преподаватель {userToDelete.surname} {userToDelete.name} будет
          безвозвратно удалён
        </ConfirmModal>
      )}

      {userClearPassword && (
        <ConfirmModal
          open={Boolean(userClearPassword)}
          onAgree={handleUserPasswordCleanAccept}
          onCancel={() => setUserClearPassword(null)}
          title="Сбросить пароль пользователя?"
          isSubmitting={isAddRoleLoading}
        >
          Пароль преподавателя {userClearPassword.surname}
          {userClearPassword.name} будет сброшен. Новый пароль автоматически
          установится при первом входе.
        </ConfirmModal>
      )}
    </Grid>
  );
};
