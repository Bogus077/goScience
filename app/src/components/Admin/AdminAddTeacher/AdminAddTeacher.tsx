import {
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { IconArrowLeft, IconSquarePlus } from '@tabler/icons';
import { FormikContext, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addTeacherInitialValues,
  addTeacherValidationSchema,
} from '../../../models/Validations/validations';
import { useAddTeacherMutation } from '../../../redux/GSApi';
import { frontendRoutes } from '../../../utils/router/routes';

const rightBlock = 2;

export const AdminAddTeacher = () => {
  const [addTeacher] = useAddTeacherMutation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = useCallback(
    async (values: typeof addTeacherInitialValues) => {
      const result = await addTeacher(values);
      if ('data' in result) {
        enqueueSnackbar(
          `Преподаватель ${values.surname} ${values.name} добавлен`,
          {
            variant: 'success',
          }
        );
        navigate(`${frontendRoutes.admin.editTeacher}/${result.data.id}`);
      } else {
        enqueueSnackbar(`Ошибка добавления преподавателя`, {
          variant: 'error',
        });
      }
    },
    [addTeacher, enqueueSnackbar, navigate]
  );

  const formik = useFormik({
    initialValues: addTeacherInitialValues,
    validationSchema: addTeacherValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <FormikContext.Provider value={formik}>
      <Card>
        <Grid container spacing={4} padding={2}>
          <Grid item container xs={12}>
            <IconButton onClick={() => navigate(frontendRoutes.admin.teachers)}>
              <IconArrowLeft />
            </IconButton>
            <Typography variant="h4">Добавить преподавателя</Typography>
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
                  id="middleName"
                  name="middleName"
                  label="Отчество"
                  variant="outlined"
                  fullWidth
                  value={formik.values.middleName}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.middleName)}
                  helperText={formik.errors.middleName}
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
                    startIcon={<IconSquarePlus />}
                    fullWidth={true}
                    type="submit"
                    size="large"
                    variant="contained"
                    onClick={() => formik.handleSubmit()}
                    disabled={!formik.isValid}
                  >
                    Добавить
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </FormikContext.Provider>
  );
};
