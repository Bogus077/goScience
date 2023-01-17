import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { FormikContext, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addNotificationInitialValues,
  addNotificationValidationSchema,
} from '../../../models/Validations/validations';
import { useAddNotificationMutation } from '../../../redux/GSApi';
import { frontendRoutes } from '../../../utils/router/routes';
import { IconSquarePlus, IconArrowLeft } from '@tabler/icons';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

export const AdminAddNotification = () => {
  const [addNotification] = useAddNotificationMutation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = useCallback(
    async (values: typeof addNotificationInitialValues) => {
      const result = await addNotification(values);
      if ('data' in result) {
        enqueueSnackbar(`Уведомление успешно добавлено`, {
          variant: 'success',
        });
        navigate(`${frontendRoutes.admin.notifications}`);
      } else {
        enqueueSnackbar(`Ошибка добавления уведомления`, { variant: 'error' });
      }
    },
    [addNotification, enqueueSnackbar, navigate]
  );

  const formik = useFormik({
    initialValues: addNotificationInitialValues,
    validationSchema: addNotificationValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <FormikContext.Provider value={formik}>
      <Card>
        <Grid container spacing={4} padding={2}>
          <Grid item container xs={12}>
            <IconButton
              onClick={() => navigate(frontendRoutes.admin.notifications)}
            >
              <IconArrowLeft />
            </IconButton>
            <Typography variant="h4">Добавить уведомление</Typography>
          </Grid>

          <Grid item container spacing={2}>
            <Grid item width={300}>
              <TextField
                id="title"
                name="title"
                label="Название"
                variant="outlined"
                fullWidth
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
          </Grid>

          <Grid item container spacing={2}>
            <Grid item width={300}>
              <TextField
                id="text"
                name="text"
                label="Текст уведомления"
                variant="outlined"
                fullWidth
                value={formik.values.text}
                onChange={formik.handleChange}
                error={formik.touched.text && Boolean(formik.errors.text)}
                helperText={formik.touched.text && formik.errors.text}
                multiline
                rows={3}
              />
            </Grid>
          </Grid>

          <Grid item container spacing={2}>
            <Grid item minWidth={300}>
              <Select
                fullWidth={true}
                id="type"
                name="type"
                label="тип уведомления"
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.touched.type && Boolean(formik.errors.type)}
              >
                <MenuItem value="default">
                  <ListItemText>Стандарт</ListItemText>
                </MenuItem>
              </Select>
            </Grid>
          </Grid>

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
      </Card>
    </FormikContext.Provider>
  );
};
