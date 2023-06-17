import {
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IconArrowLeft, IconSquarePlus } from '@tabler/icons';
import { FormikContext, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addEventInitialValues,
  addEventValidationSchema,
} from '../../../models/Validations/validations';
import { frontendRoutes } from '../../../utils/router/routes';
import { AdminTeacherChooser } from '../AdminForms/AdminTeacherChooser';

const rightBlock = 2;

export const AdminAddEvent = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = useCallback(
    // eslint-disable-next-line no-console
    (values: typeof addEventInitialValues) => console.log(values),
    []
  );

  const formik = useFormik({
    initialValues: addEventInitialValues,
    validationSchema: addEventValidationSchema,
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
                  id="title"
                  name="title"
                  label="Название мероприятия"
                  variant="outlined"
                  fullWidth
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.title)}
                  helperText={formik.errors.title}
                />
              </Grid>
              <Grid item xs={12} container spacing={2}>
                <Grid item width={300}>
                  <DatePicker
                    label="Дата мероприятия"
                    value={formik.values.eventDate}
                    onChange={(newValue) => {
                      formik.setFieldValue('eventDate', newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={Boolean(formik.errors.eventDate)}
                        // helperText={formik.errors.eventDate}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Блок настроек документа */}
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={rightBlock}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Настройки документа
              </Typography>

              <Typography variant="subtitle2">
                Подготовка документа к печати
              </Typography>
            </Grid>
            <Grid item container xs={12 - rightBlock} spacing={2}>
              <Grid item width={300}>
                <TextField
                  id="orderNumber"
                  name="orderNumber"
                  label="Номер приказа"
                  variant="outlined"
                  fullWidth
                  value={formik.values.orderNumber}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.orderNumber)}
                  helperText={formik.errors.orderNumber ?? 'Можно не указывать'}
                />
              </Grid>
              <Grid item xs={12} container spacing={2}>
                <Grid item width={300}>
                  <DatePicker
                    label="Дата приказа"
                    value={formik.values.orderDate}
                    onChange={(newValue) => {
                      formik.setFieldValue('orderDate', newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={Boolean(formik.errors.orderDate)}
                        // helperText={formik.errors.eventDate}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Блок сопровождающих */}
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={rightBlock}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Сопровождающие
              </Typography>

              <Typography variant="subtitle2">
                Педагоги, которые будут сопровождать детей во время мероприятия
              </Typography>
            </Grid>
            <Grid item container xs={12 - rightBlock} spacing={2}>
              <Grid item width={300}>
                <AdminTeacherChooser />
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
