import {
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { IconArrowLeft, IconDeviceFloppy, IconTrashX } from '@tabler/icons';
import { FormikContext, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Teacher } from '../../../models/Teacher/teacher';
import {
  editTeacherInitialValues,
  editTeacherValidationSchema,
} from '../../../models/Validations/validations';
import {
  useEditTeacherMutation,
  useGetTeachersQuery,
  useRemoveTeacherMutation,
} from '../../../redux/GSApi';
import { frontendRoutes } from '../../../utils/router/routes';
import { ConfirmModal } from '../ConfirmModal';
const rightBlock = 2;

export const AdminEditTeacher = () => {
  const { data } = useGetTeachersQuery('');
  const [editTeacher] = useEditTeacherMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const teacher = data?.find(
    (teacher) => teacher.id.toString() === id?.toString()
  );
  const [deleteTeacher, setDeleteTeacher] = useState<Teacher | null>(null);
  const [removeTeacher, { isLoading: isRemoveTeacherLoading }] =
    useRemoveTeacherMutation();

  const handleTeacherRemove = useCallback(() => {
    teacher && setDeleteTeacher(teacher);
  }, [teacher]);

  const handleTeacherRemoveAccept = async () => {
    deleteTeacher && (await removeTeacher({ id: deleteTeacher.id }));
    setDeleteTeacher(null);

    enqueueSnackbar(
      `Преподаватель ${deleteTeacher?.surname} ${deleteTeacher?.name} удалён`,
      {
        variant: 'success',
      }
    );
    navigate(frontendRoutes.admin.teachers);
  };

  const handleSubmit = useCallback(
    async (values: typeof editTeacherInitialValues) => {
      const result = await editTeacher({ ...values, id: parseInt(id ?? '0') });
      if ('data' in result) {
        enqueueSnackbar(
          `Данные преподавателя ${values.surname} ${values.name} успешно обновлены`,
          {
            variant: 'success',
          }
        );
        navigate(frontendRoutes.admin.teachers);
      } else {
        enqueueSnackbar(`Ошибка обновления данных преподавателя`, {
          variant: 'error',
        });
      }
    },
    [editTeacher, enqueueSnackbar, id, navigate]
  );

  const formik = useFormik({
    initialValues: teacher ? teacher : editTeacherInitialValues,
    validationSchema: editTeacherValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <FormikContext.Provider value={formik}>
      <Card>
        <Grid container spacing={4} padding={2}>
          <Grid item container xs={12}>
            <IconButton onClick={() => navigate(frontendRoutes.admin.teachers)}>
              <IconArrowLeft />
            </IconButton>
            <Typography variant="h4">Изменить данные преподавателя</Typography>
          </Grid>

          {/* Блок основной информации */}
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={rightBlock}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Основная информация
              </Typography>

              <Typography variant="subtitle2">
                Информация используется при генерации приказов, в которых
                необходимы данные о преподавателе
              </Typography>
            </Grid>
            <Grid item container xs={12 - rightBlock} spacing={2}>
              <Grid item width={300}>
                <TextField
                  id="surname"
                  name="surname"
                  label="Фамилия"
                  variant="outlined"
                  fullWidth
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.surname)}
                  helperText={formik.errors.surname}
                />
              </Grid>
              <Grid item width={300}>
                <TextField
                  id="name"
                  name="name"
                  label="Имя"
                  variant="outlined"
                  fullWidth
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.name)}
                  helperText={formik.errors.name}
                />
              </Grid>
              <Grid item width={300}>
                <TextField
                  id="middlename"
                  name="middlename"
                  label="Отчество"
                  variant="outlined"
                  fullWidth
                  value={formik.values.middlename}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.middlename)}
                  helperText={formik.errors.middlename}
                />
              </Grid>
              <Grid item xs={12} container spacing={2}>
                <Grid item width={300}>
                  <TextField
                    id="phone"
                    name="phone"
                    label="Телефон"
                    variant="outlined"
                    fullWidth
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={Boolean(formik.errors.phone)}
                    helperText={formik.errors.phone}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Блок Сохранения */}
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={rightBlock}></Grid>
            <Grid item container xs={12 - rightBlock} spacing={2}>
              <Grid item container spacing={2}>
                <Grid item minWidth={300}>
                  <Button
                    startIcon={<IconDeviceFloppy />}
                    fullWidth={true}
                    type="submit"
                    size="large"
                    variant="contained"
                    onClick={() => formik.handleSubmit()}
                    disabled={!formik.isValid}
                  >
                    Сохранить
                  </Button>
                </Grid>
                <Grid item minWidth={300}>
                  <Button
                    startIcon={<IconTrashX />}
                    fullWidth={true}
                    size="large"
                    variant="outlined"
                    color="error"
                    onClick={handleTeacherRemove}
                    disabled={!formik.isValid}
                  >
                    Удалить
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {deleteTeacher && (
          <ConfirmModal
            open={Boolean(deleteTeacher)}
            onAgree={handleTeacherRemoveAccept}
            onCancel={() => setDeleteTeacher(null)}
            title="Удалить преподавателя"
            isSubmitting={isRemoveTeacherLoading}
          >
            Преподаватель {deleteTeacher.surname} {deleteTeacher.name} будет
            безвозвратно удалён. Эта операция необратима
          </ConfirmModal>
        )}
      </Card>
    </FormikContext.Provider>
  );
};
