import {
  Button,
  Grid,
  IconButton,
  Link,
  Paper,
  TableContainer,
  Tooltip,
  Typography,
} from '@mui/material';
// eslint-disable-next-line import/named
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// eslint-disable-next-line import/no-unresolved
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { IconEdit, IconSquarePlus, IconTrashX } from '@tabler/icons';
import { useSnackbar } from 'notistack';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Teacher } from '../../../models/Teacher/teacher';
import {
  useGetTeachersQuery,
  useRemoveTeacherMutation,
} from '../../../redux/GSApi';
import { frontendRoutes } from '../../../utils/router/routes';
import { ConfirmModal } from '../ConfirmModal';

export const AdminTeachers = () => {
  const { data } = useGetTeachersQuery('');
  const [removeTeacher, { isLoading: isRemoveTeacherLoading }] =
    useRemoveTeacherMutation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);

  const handleTeacherEdit = useCallback(
    (id: number) => navigate(`${frontendRoutes.admin.editTeacher}/${id}`),
    [navigate]
  );

  const handleTeacherRemove = useCallback(
    // eslint-disable-next-line no-console
    (teacher: Teacher) => setTeacherToDelete(teacher),
    []
  );

  const handleTeacherRemoveAccept = useCallback(
    // eslint-disable-next-line no-console
    async () => {
      const result =
        teacherToDelete?.id &&
        (await removeTeacher({ id: teacherToDelete.id }));
      setTeacherToDelete(null);
      if ((result as { error: FetchBaseQueryError }).error) {
        enqueueSnackbar(
          `Ошибка удаления преподавателя: ${
            (result as { error: FetchBaseQueryError }).error.data
          }`,
          {
            variant: 'error',
          }
        );
      } else {
        enqueueSnackbar(
          `Преподаватель ${teacherToDelete?.surname} ${teacherToDelete?.name} удалён`,
          {
            variant: 'success',
          }
        );
      }
    },
    [
      enqueueSnackbar,
      removeTeacher,
      teacherToDelete?.id,
      teacherToDelete?.name,
      teacherToDelete?.surname,
    ]
  );

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'ФИО',
      flex: 1,
      renderCell: (params) => (
        <Link
          onClick={() => handleTeacherEdit(params.row.id)}
          align="left"
        >{`${params.row.surname} ${params.row.name} ${params.row.middlename}`}</Link>
      ),
    },
    {
      field: 'phone',
      headerName: 'Телефон',
      flex: 1,
      renderCell: (params) => <Typography>{params.row.phone}</Typography>,
    },
    {
      field: 'edit',
      headerName: ' ',
      renderCell: (params) => (
        <Tooltip title="Редактировать">
          <IconButton
            onClick={() => {
              handleTeacherEdit(params.row.id);
            }}
          >
            <IconEdit size={20} />
          </IconButton>
        </Tooltip>
      ),
      align: 'center',
      width: 50,
      sortable: false,
    },
    {
      field: 'remove',
      headerName: ' ',
      renderCell: (params) => (
        <Tooltip title="Удалить">
          <IconButton
            onClick={() => {
              handleTeacherRemove(params.row);
            }}
          >
            <IconTrashX size={20} />
          </IconButton>
        </Tooltip>
      ),
      width: 50,
      align: 'center',
      sortable: false,
    },
  ];

  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item>
        <Button
          startIcon={<IconSquarePlus />}
          variant="contained"
          onClick={() => navigate(frontendRoutes.admin.addTeacher)}
        >
          Добавить преподавателя
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{ padding: 1 }}>
          <DataGrid
            rows={data ?? []}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            autoHeight={true}
          />
        </TableContainer>
      </Grid>
      {teacherToDelete && (
        <ConfirmModal
          open={Boolean(teacherToDelete)}
          onAgree={handleTeacherRemoveAccept}
          onCancel={() => setTeacherToDelete(null)}
          title="Удалить преподавателя"
          isSubmitting={isRemoveTeacherLoading}
        >
          Преподаватель {teacherToDelete.surname} {teacherToDelete.name} будет
          безвозвратно удалён. Эта операция необратима
        </ConfirmModal>
      )}
    </Grid>
  );
};
