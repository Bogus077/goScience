import {
  Button,
  Card,
  Chip,
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
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addEventInitialValues,
  addEventValidationSchema,
} from '../../../models/Validations/validations';
import { frontendRoutes } from '../../../utils/router/routes';
import { AdminTeacherChooser } from '../AdminForms/AdminTeacherChooser';
import { AdminMembersChooser } from '../AdminForms/AdminMembersChooser';
import {
  useCreateEventMutation,
  useGetAddressListQuery,
} from '../../../redux/GSApi';

const rightBlock = 2;

export const AdminAddEvent = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [triggerCreateEvent, createEventQueryState] = useCreateEventMutation();
  const { data: addressList, isLoading } = useGetAddressListQuery();

  const handleSubmit = useCallback(
    async (values: typeof addEventInitialValues) => {
      if (createEventQueryState.isLoading) return;

      try {
        await triggerCreateEvent({
          ...values,
          Users: values.users,
          Members: values.members,
        }).unwrap();
        enqueueSnackbar(`Мероприятие ${values.title} успешно добавлено`, {
          variant: 'success',
        });
        navigate(frontendRoutes.admin.events);
      } catch {
        enqueueSnackbar(`Ошибка создания нового мероприятия`, {
          variant: 'error',
        });
      }
    },
    [
      createEventQueryState.isLoading,
      enqueueSnackbar,
      navigate,
      triggerCreateEvent,
    ]
  );

  const formik = useFormik({
    initialValues: addEventInitialValues,
    validationSchema: addEventValidationSchema,
    onSubmit: handleSubmit,
  });

  const onTeachersListChange = useCallback(
    (teachers: number[]) => {
      formik.setFieldValue('users', teachers);
    },
    [formik]
  );

  const onMembersListChange = useCallback(
    (members: number[]) => {
      formik.setFieldValue('members', members);
    },
    [formik]
  );

  const setStartAddress = useCallback(
    (address: string) => {
      formik.setFieldValue('startAddress', address);
    },
    [formik]
  );

  const setFinishAddress = useCallback(
    (address: string) => {
      formik.setFieldValue('finishAddress', address);
    },
    [formik]
  );

  const teachers = useMemo(() => formik.values.users, [formik.values.users]);
  const members = useMemo(() => formik.values.members, [formik.values.members]);

  return (
    <FormikContext.Provider value={formik}>
      <Card>
        <Grid container spacing={4} padding={2}>
          <Grid item container xs={12}>
            <IconButton onClick={() => navigate(frontendRoutes.admin.events)}>
              <IconArrowLeft />
            </IconButton>
            <Typography variant="h4">Добавить мероприятие</Typography>
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
                Информация используется при генерации приказов о&nbsp;выезде
                на&nbsp;мероприятие
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
                    value={formik.values.startDate}
                    onChange={(newValue) => {
                      formik.setFieldValue('startDate', newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={Boolean(formik.errors.startDate)}
                        // helperText={formik.errors.eventDate}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} container spacing={2} direction="column">
                <Grid item width={600}>
                  <TextField
                    id="startAddress"
                    name="startAddress"
                    label="Адрес отправления"
                    variant="outlined"
                    fullWidth
                    value={formik.values.startAddress}
                    onChange={formik.handleChange}
                    error={Boolean(formik.errors.startAddress)}
                    helperText={
                      formik.errors.startAddress ??
                      'Укажите адрес, откуда будут выезжать участники. Скорее всего, это адрес кадетского корпуса'
                    }
                  />
                </Grid>
                <Grid item container spacing={1} sx={{ mt: -2, mb: 3 }}>
                  {addressList?.map((address) => (
                    <Grid item key={address}>
                      <Chip
                        label={address}
                        onClick={() => setStartAddress(address)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12} container spacing={2} direction="column">
                <Grid item width={600}>
                  <TextField
                    id="finishAddress"
                    name="finishAddress"
                    label="Адрес назначения"
                    variant="outlined"
                    fullWidth
                    value={formik.values.finishAddress}
                    onChange={formik.handleChange}
                    error={Boolean(formik.errors.finishAddress)}
                    helperText={
                      formik.errors.finishAddress ??
                      'Укажите адрес, где будет проходить мероприятие'
                    }
                  />
                </Grid>
                <Grid item container spacing={1} sx={{ mt: -2 }}>
                  {addressList?.map((address) => (
                    <Grid item key={address}>
                      <Chip
                        label={address}
                        onClick={() => setFinishAddress(address)}
                      />
                    </Grid>
                  ))}
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
                  helperText={
                    formik.errors.orderNumber ?? 'Только цифры, например "55"'
                  }
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
              <Grid item>
                <AdminTeacherChooser
                  addedTeachers={teachers}
                  onTeachersListChange={onTeachersListChange}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Блок участников */}
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={rightBlock}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Участники
              </Typography>

              <Typography variant="subtitle2">
                Список кадет, участвующих в мероприятии
              </Typography>
              <Typography variant="subtitle2">
                {`Выбрано: ${formik.values.members.length}`}
              </Typography>
            </Grid>
            <Grid item container xs={12 - rightBlock} spacing={2}>
              <Grid item>
                <AdminMembersChooser
                  addedMembers={members}
                  onMembersListChange={onMembersListChange}
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
                    disabled={
                      !formik.isValid || createEventQueryState.isLoading
                    }
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
