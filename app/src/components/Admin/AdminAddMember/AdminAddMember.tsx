import {
  Button,
  Card,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { FormikContext, useFormik } from 'formik';
import React, { useCallback } from 'react';
import {
  addMemberInitialValues,
  addMemberValidationSchema,
} from '../../../models/Validations/validations';
import {
  IconMars,
  IconVenus,
  IconSquarePlus,
  IconArrowLeft,
} from '@tabler/icons';
import { useAddMemberMutation } from '../../../redux/GSApi';
import { useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../../utils/router/routes';
import { useSnackbar } from 'notistack';

export const AdminAddMember = () => {
  const [addMember, { isLoading }] = useAddMemberMutation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = useCallback(
    async (values: typeof addMemberInitialValues) => {
      const result = await addMember(values);
      if ('data' in result) {
        enqueueSnackbar(`Кадет ${values.surname} ${values.name} добавлен`, {
          variant: 'success',
        });
        navigate(`${frontendRoutes.admin.editMember}/${result.data.id}`);
      } else {
        enqueueSnackbar(`Ошибка добавления кадета`, { variant: 'error' });
      }
    },
    [addMember, enqueueSnackbar, navigate]
  );

  const formik = useFormik({
    initialValues: addMemberInitialValues,
    validationSchema: addMemberValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <FormikContext.Provider value={formik}>
      <Card>
        <Grid container spacing={4} padding={2}>
          <Grid item container xs={12}>
            <IconButton onClick={() => navigate(frontendRoutes.admin.members)}>
              <IconArrowLeft />
            </IconButton>
            <Typography variant="h4">Добавить кадета</Typography>
          </Grid>

          <Grid item container spacing={2}>
            <Grid item width={300}>
              <TextField
                id="surname"
                name="surname"
                label="Фамилия"
                variant="outlined"
                fullWidth
                value={formik.values.surname}
                onChange={formik.handleChange}
                error={formik.touched.surname && Boolean(formik.errors.surname)}
                helperText={formik.touched.surname && formik.errors.surname}
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
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
          </Grid>

          <Grid item container spacing={2}>
            <Grid item minWidth={300}>
              <Select
                fullWidth={true}
                labelId="sex"
                id="sex"
                name="sex"
                label="Выберите пол"
                value={formik.values.sex}
                onChange={formik.handleChange}
                error={formik.touched.sex && Boolean(formik.errors.sex)}
              >
                <MenuItem value="male">
                  <ListItemIcon>
                    <IconMars fontSize="small" color="blue" />
                  </ListItemIcon>
                  <ListItemText>Мальчик</ListItemText>
                </MenuItem>
                <MenuItem value="female">
                  <ListItemIcon>
                    <IconVenus fontSize="small" color="pink" />
                  </ListItemIcon>
                  <ListItemText>Девочка</ListItemText>
                </MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Grid item container spacing={2}>
            <Grid item minWidth={300}>
              <Select
                fullWidth={true}
                labelId="plat"
                id="plat"
                name="plat"
                label="Выберите взвод"
                value={formik.values.plat}
                onChange={formik.handleChange}
                error={formik.touched.plat && Boolean(formik.errors.plat)}
              >
                <MenuItem value="1">1 взвод</MenuItem>
                <MenuItem value="2">2 взвод</MenuItem>
                <MenuItem value="3">3 взвод</MenuItem>
                <MenuItem value="4">4 взвод</MenuItem>
                <MenuItem value="5">Спортвзвод</MenuItem>
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
