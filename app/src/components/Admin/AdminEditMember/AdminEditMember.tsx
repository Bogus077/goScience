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
import React, { useCallback, useState } from 'react';
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
  useGetMembersQuery,
  useRemoveMemberMutation,
} from '../../../redux/GSApi';
import { useNavigate, useParams } from 'react-router-dom';
import { frontendRoutes } from '../../../utils/router/routes';
import { useSnackbar } from 'notistack';
import { Member } from '../../../models/members/members';
import { ConfirmModal } from '../ConfirmModal';

export const AdminEditMember = () => {
  const { data } = useGetMembersQuery('');
  const [editMember] = useEditMemberMutation();
  const navigate = useNavigate();
  const { id } = useParams();
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
      const result = await editMember({ ...values, id: parseInt(id ?? '0') });
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

  const formik = useFormik({
    initialValues: member ?? editMemberInitialValues,
    validationSchema: editMemberValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

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
