import {
  Button,
  Card,
  Divider,
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
import { AdminAddressField } from '../AdminForms/AdminAdressField/AdminAdressField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import formatDuration from 'date-fns/formatDuration';
import intervalToDuration from 'date-fns/intervalToDuration';
import ru from 'date-fns/locale/ru';

const rightBlock = 2;

export const AdminAddMember = () => {
  const [addMember] = useAddMemberMutation();
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
                Все поля обязательны для заполнения
              </Typography>
            </Grid>
            <Grid item container xs={12 - rightBlock} spacing={2}>
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
                    error={
                      formik.touched.surname && Boolean(formik.errors.surname)
                    }
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
                <Grid item width={300}>
                  <TextField
                    id="middleName"
                    name="middleName"
                    label="Отчество"
                    variant="outlined"
                    fullWidth
                    value={formik.values.middleName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.middleName &&
                      Boolean(formik.errors.middleName)
                    }
                    helperText={
                      formik.touched.middleName && formik.errors.middleName
                    }
                  />
                </Grid>
              </Grid>

              <Grid item container spacing={2}>
                <Grid item minWidth={300}>
                  <DatePicker
                    label="Дата рождения"
                    value={formik.values.dob}
                    onChange={(newValue) => {
                      formik.setFieldValue('dob', newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={Boolean(formik.errors.dob)}
                        helperText={
                          !isNaN(Date.parse(formik.values.dob?.toString())) &&
                          formatDuration(
                            intervalToDuration({
                              start: new Date(formik.values.dob),
                              end: new Date(),
                            }),
                            {
                              format: ['years'],
                              locale: ru,
                            }
                          )
                        }
                      />
                    )}
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
                    <MenuItem value="5">5 взвод</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Блок родители и адреса */}
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={rightBlock}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Контакты
              </Typography>

              <Typography variant="subtitle2">
                Информация используется при генерации приказов, в которых
                необходимы данные о родителях ребёнка и их контакты
              </Typography>
            </Grid>
            <Grid item container xs={12 - rightBlock} spacing={2}>
              <Grid item width={300}>
                <TextField
                  id="contactName"
                  name="contactName"
                  label="ФИО родителя (необязательное поле)"
                  variant="outlined"
                  fullWidth
                  value={formik.values.contactName}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.contactName)}
                  helperText={formik.errors.contactName}
                />
              </Grid>
              <Grid item width={300}>
                <TextField
                  id="contactPhone"
                  name="contactPhone"
                  label="Телефон (необязательное поле)"
                  variant="outlined"
                  fullWidth
                  value={formik.values.contactPhone}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.contactPhone)}
                  helperText={formik.errors.contactPhone}
                />
              </Grid>
              <Grid item xs={12} container spacing={2}>
                <Grid item width={600}>
                  <AdminAddressField
                    name="contactAddress"
                    label="Адрес проживания (необязательное поле)"
                    placeholder="Адрес проживания (необязательное поле)"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Блок медицины */}
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={rightBlock}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Особенности здоровья
              </Typography>

              <Typography variant="subtitle2">
                Информация о состоянии здоровья
              </Typography>
            </Grid>
            <Grid item container xs={12 - rightBlock} spacing={2}>
              <Grid item width={300}>
                <TextField
                  id="allergy"
                  name="allergy"
                  label="Аллергия"
                  variant="outlined"
                  fullWidth
                  value={formik.values.allergy}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.allergy)}
                  helperText={formik.errors.allergy}
                />
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
