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
  // eslint-disable-next-line import/named
  SxProps,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { FormikContext, useFormik } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import {
  editMemberInitialValues,
  editMemberValidationSchema,
} from '../../../models/Validations/validations';
import {
  IconMars,
  IconVenus,
  IconDeviceFloppy,
  IconArrowLeft,
  IconTrashX,
} from '@tabler/icons';
import {
  useEditMemberMutation,
  useGetAttendanceQuery,
  useGetMembersQuery,
  useRemoveMemberMutation,
} from '../../../redux/GSApi';
import { useNavigate, useParams } from 'react-router-dom';
import { frontendRoutes } from '../../../utils/router/routes';
import { useSnackbar } from 'notistack';
import { Member } from '../../../models/members/members';
import { ConfirmModal } from '../ConfirmModal';
import { AdminAddressField } from '../AdminForms/AdminAdressField/AdminAdressField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ru from 'date-fns/locale/ru';
import intervalToDuration from 'date-fns/intervalToDuration';
import formatDuration from 'date-fns/formatDuration';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import {
  PickersDay,
  // eslint-disable-next-line import/named
  PickersDayProps,
} from '@mui/x-date-pickers/PickersDay/PickersDay';
import { isSameDay } from 'date-fns';
import { Loader } from '../../UI/Loader';
import { Cell, Pie, PieChart, Tooltip as ChartTooltip } from 'recharts';

const rightBlock = 2;

const styles: { [key: string]: SxProps } = {
  dayIn: {
    borderRadius: 1,
    border: '1px solid #24b26d',
  },
  dayOut: {
    borderRadius: 1,
    border: '1px solid #e33f3d',
  },
};

export const AdminEditMember = () => {
  const { data } = useGetMembersQuery('');
  const [editMember] = useEditMemberMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: attendance, isLoading: isAttendanceLoading } =
    useGetAttendanceQuery({ kid: id });
  const { enqueueSnackbar } = useSnackbar();
  const member = data?.find(
    (member) => member.id.toString() === id?.toString()
  );
  const [deleteMember, setDeleteMember] = useState<Member | null>(null);
  const [removeMember, { isLoading: isRemoveMemberLoading }] =
    useRemoveMemberMutation();

  const handleMemberRemove = () => {
    member && setDeleteMember(member);
  };
  const handleMemberRemoveAccept = async () => {
    deleteMember && (await removeMember({ id: deleteMember.id }));
    setDeleteMember(null);

    enqueueSnackbar(
      `Кадет ${deleteMember?.surname} ${deleteMember?.name} удалён`,
      {
        variant: 'success',
      }
    );
    navigate(frontendRoutes.admin.members);
  };

  const handleSubmit = useCallback(
    async (values: typeof editMemberInitialValues) => {
      const result = await editMember({
        ...values,
        id: parseInt(id ?? '0'),
        contactAddress:
          values.contactAddress === ''
            ? member?.MemberContacts[0]?.address
            : values.contactAddress,
      });
      if ('data' in result) {
        enqueueSnackbar(
          `Данные кадета ${values.surname} ${values.name} успешно обновлены`,
          {
            variant: 'success',
          }
        );
        navigate(frontendRoutes.admin.members);
      } else {
        enqueueSnackbar(`Ошибка обновления данных кадета`, {
          variant: 'error',
        });
      }
    },
    [editMember, enqueueSnackbar, id, navigate]
  );

  const memberToInputValues = useCallback((member: Member) => {
    return {
      ...member,
      contactName: member.MemberContacts[0]?.name ?? '',
      contactPhone: member.MemberContacts[0]?.phone ?? '',
      contactAddress: member.MemberContacts[0]?.address ?? '',
      position: member.position ?? '',
      dob: member.dob as Date,
      middleName: member.middleName ?? '',
    };
  }, []);

  const formik = useFormik({
    initialValues: member
      ? memberToInputValues(member)
      : editMemberInitialValues,
    validationSchema: editMemberValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  const renderDay = useCallback(
    (date: Date, selected: Date[], props: PickersDayProps<Date>) => {
      const kidAtt = attendance?.find((att) =>
        isSameDay(new Date(att.createdAt), date)
      );
      const isIn = kidAtt?.type === 'in';
      const isOut = kidAtt?.type === 'out';
      return (
        <Tooltip
          title={
            isIn
              ? 'Присутствовал(а)'
              : isOut
              ? 'Болел(а)'
              : 'Данные отсутствуют'
          }
          key={date.toDateString()}
        >
          <PickersDay
            {...props}
            sx={isIn ? styles.dayIn : isOut ? styles.dayOut : {}}
          />
        </Tooltip>
      );
    },
    [attendance]
  );

  const attendanceCount = useMemo(() => {
    return [
      {
        name: 'Присутствовал(а)',
        count: attendance?.filter((att) => att.type === 'in').length,
        color: '#24b26d',
      },
      {
        name: 'Отсутствовал(а)',
        count: attendance?.filter((att) => att.type === 'out').length,
        color: '#e33f3d',
      },
    ];
  }, [attendance]);

  return (
    <FormikContext.Provider value={formik}>
      <Card>
        <Grid container spacing={4} padding={2}>
          <Grid item container xs={12}>
            <IconButton onClick={() => navigate(frontendRoutes.admin.members)}>
              <IconArrowLeft />
            </IconButton>
            <Typography variant="h4">Изменить данные кадета</Typography>
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
                Общая информация об учащемся
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
                    error={Boolean(formik.errors.sex)}
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
                    error={Boolean(formik.errors.plat)}
                  >
                    <MenuItem value="1">1 взвод</MenuItem>
                    <MenuItem value="2">2 взвод</MenuItem>
                    <MenuItem value="3">3 взвод</MenuItem>
                    <MenuItem value="4">4 взвод</MenuItem>
                    <MenuItem value="5">5 взвод</MenuItem>
                  </Select>
                </Grid>
              </Grid>

              <Grid item width={300}>
                <TextField
                  id="position"
                  name="position"
                  label="Должность"
                  variant="outlined"
                  fullWidth
                  value={formik.values.position}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.position)}
                  helperText={formik.errors.position}
                />
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
                  label="ФИО родителя"
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
                  label="Телефон"
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
                    label="Адрес проживания"
                    defaultValue={member?.MemberContacts[0]?.address}
                  />
                </Grid>
              </Grid>
              <Grid item width={300}>
                <TextField
                  id="email"
                  name="email"
                  label="Эл. почта"
                  variant="outlined"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.email)}
                  helperText={formik.errors.email}
                />
              </Grid>
              <Grid item width={300}>
                <TextField
                  id="password"
                  name="password"
                  label="Пароль"
                  variant="outlined"
                  fullWidth
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={Boolean(formik.errors.password)}
                  helperText={formik.errors.password}
                />
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

          {/* Блок посещаемость */}
          <Grid item container xs={12} spacing={2}>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={rightBlock}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Посещаемость
              </Typography>

              <Typography variant="subtitle2">
                История посещаемости кадета. Отметка о присутствии выставляется
                ежедневно в 20:00
              </Typography>
            </Grid>
            <Grid item container xs={12 - rightBlock} spacing={10}>
              <Grid item>
                {isAttendanceLoading ? (
                  <Loader />
                ) : (
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    label="Week picker"
                    value={new Date()}
                    onChange={() => {}}
                    renderDay={renderDay}
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="'Week of' MMM d"
                  />
                )}
              </Grid>
              <Grid item>
                <PieChart width={730} height={250}>
                  <Pie
                    data={attendanceCount}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    fill="#8884d8"
                    legendType="circle"
                    innerRadius={50}
                  >
                    {attendanceCount.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    formatter={(value, name) => [value, `${name} дней`]}
                  />
                </PieChart>
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
                    onClick={handleMemberRemove}
                    disabled={!formik.isValid}
                  >
                    Удалить
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>

      {deleteMember && (
        <ConfirmModal
          open={Boolean(deleteMember)}
          onAgree={handleMemberRemoveAccept}
          onCancel={() => setDeleteMember(null)}
          title="Удалить кадета"
          isSubmitting={isRemoveMemberLoading}
        >
          Кадет {deleteMember.surname} {deleteMember.name} будет безвозвратно
          удалён. Эта операция необратима
        </ConfirmModal>
      )}
    </FormikContext.Provider>
  );
};
