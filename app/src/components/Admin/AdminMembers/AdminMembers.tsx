import {
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Switch,
  TableContainer,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import {
  useGetMembersQuery,
  useRemoveMemberMutation,
} from '../../../redux/GSApi';
import {
  IconMars,
  IconVenus,
  IconEdit,
  IconTrashX,
  IconSquarePlus,
  IconSearch,
  IconSquareX,
} from '@tabler/icons';
import styles from './AdminMembers.module.scss';
import { AdminMembersSkeleton } from './AdminMembersSkeleton';
// eslint-disable-next-line import/named
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { AdminPlatChecker } from './AdminPlatChecker';
import { useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../../utils/router/routes';
import { useSnackbar } from 'notistack';
import { Member } from '../../../models/members/members';
import { ConfirmModal } from '../ConfirmModal';
import ru from 'date-fns/locale/ru';
import formatWithOptions from 'date-fns/fp/formatWithOptions';

export const AdminMembers = () => {
  const [deleteMember, setDeleteMember] = useState<Member | null>(null);
  const { data, isLoading: isGetMembersLoading } = useGetMembersQuery('');
  const [removeMember, { isLoading: isRemoveMemberLoading }] =
    useRemoveMemberMutation();
  const isLoading = useMemo(
    () => isGetMembersLoading || isRemoveMemberLoading,
    [isGetMembersLoading, isRemoveMemberLoading]
  );
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>('');

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };

  function getMemberSex(field: GridRenderCellParams<string>) {
    return field.value === 'male' ? (
      <IconMars color="blue" />
    ) : (
      <IconVenus color="pink" />
    );
  }

  function getMemberStatus(field: GridRenderCellParams<boolean>) {
    return field.value ? (
      <FormControlLabel
        disabled
        control={<Switch color="success" checked={true} size="small" />}
        label="В корпусе"
      />
    ) : (
      <FormControlLabel
        disabled
        control={<Switch color="error" size="small" />}
        label="Отсутствует"
      />
    );
  }

  const handleMemberEdit = (field: GridRenderCellParams<string>) => {
    navigate(`${frontendRoutes.admin.editMember}/${field.row.id}`);
  };
  const handleMemberRemove = (field: GridRenderCellParams<string>) => {
    setDeleteMember(field.row);
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
  };

  const columns: GridColDef[] = [
    {
      field: 'surname',
      headerName: 'Фамилия Имя',
      flex: 1,
      renderCell: (params) => `${params.row.surname} ${params.row.name}`,
    },
    {
      field: 'plat',
      headerName: 'Взвод',
      flex: 0.5,
      renderCell: (params) =>
        params.row.plat === 5 ? 'Спортвзвод' : `${params.row.plat} взвод`,
    },
    {
      field: 'dob',
      headerName: 'Дата рождения',
      flex: 0.5,
      renderCell: (params) => {
        const date = new Date(params.row.dob);
        return params.row.dob
          ? formatWithOptions({ locale: ru }, 'd MMMM yyyy')(date)
          : '';
      },
    },
    {
      field: 'sex',
      headerName: ' ',
      renderCell: getMemberSex,
      align: 'center',
      flex: 0.3,
    },
    {
      field: 'status',
      headerName: ' ',
      renderCell: getMemberStatus,
      align: 'center',
      flex: 1.5,
    },
    {
      field: 'contact',
      headerName: 'Контакты',
      flex: 1,
      renderCell: (params) => {
        const contact =
          params.row.MemberContacts[0]?.name ||
          params.row.MemberContacts[0]?.phone
            ? `${params.row.MemberContacts[0]?.phone} ${params.row.MemberContacts[0]?.name}`
            : '';

        return (
          <Tooltip title={<Typography variant="body2">{contact}</Typography>}>
            <Typography variant="body2">{contact}</Typography>
          </Tooltip>
        );
      },
    },
    {
      field: 'address',
      headerName: 'Адрес',
      flex: 1,
      renderCell: (params) => {
        const address = params.row.MemberContacts[0]?.address
          ? params.row.MemberContacts[0]?.address
          : '';

        return (
          <Tooltip title={<Typography variant="body2">{address}</Typography>}>
            <Typography variant="body2">{address}</Typography>
          </Tooltip>
        );
      },
    },
    {
      field: 'edit',
      headerName: ' ',
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            handleMemberEdit(params);
          }}
        >
          <IconEdit size={20} />
        </IconButton>
      ),
      align: 'center',
      flex: 0.3,
      sortable: false,
    },
    {
      field: 'remove',
      headerName: ' ',
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            handleMemberRemove(params);
          }}
        >
          <IconTrashX size={20} />
        </IconButton>
      ),
      flex: 0.3,
      align: 'center',
      sortable: false,
    },
  ];

  const [plats, setPlats] = useState<number[]>([1, 2, 3, 4, 5]);
  const handlePlatsChange = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: number[]
  ) => {
    const newFormatsSet = new Set(newFormats);
    setPlats(Array.from(newFormatsSet));
  };

  const rows = useMemo(() => {
    let result =
      [...(data ?? [])]
        ?.filter((member) => !member.isDeleted)
        .filter((member) => plats.includes(member.plat))
        .sort((a, b) => a.id - b.id) ?? [];

    if (search) {
      const searchRegExp = new RegExp(search);
      result = result.filter(
        (member) =>
          searchRegExp.test(member.name) ||
          searchRegExp.test(member.surname) ||
          searchRegExp.test(member.plat.toString())
      );
    }
    return result;
  }, [data, plats, search]);

  const clearSearch = useCallback(() => setSearch(''), []);

  return (
    <div className={styles.members}>
      {isLoading ? (
        <AdminMembersSkeleton />
      ) : (
        <div className={styles.table}>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <AdminPlatChecker plats={plats} onChange={handlePlatsChange} />
            </Grid>
            <Grid item width={300}>
              <TextField
                fullWidth
                id="input-with-icon-textfield"
                label=""
                value={search}
                size="medium"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch />
                    </InputAdornment>
                  ),
                  endAdornment: search && (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="clear"
                        onClick={clearSearch}
                        edge="end"
                      >
                        <IconSquareX />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                color="primary"
                onChange={handleSearchChange}
              />
            </Grid>
            <Grid item justifyContent="flex-end" justifyItems="flex-end">
              <Button
                startIcon={<IconSquarePlus />}
                variant="contained"
                onClick={() => navigate(frontendRoutes.admin.addMember)}
              >
                Добавить кадета
              </Button>
            </Grid>

            <Grid item xs={12}>
              <TableContainer component={Paper} sx={{ padding: 1 }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={20}
                  rowsPerPageOptions={[20]}
                  autoHeight={true}
                />
              </TableContainer>
            </Grid>
          </Grid>
        </div>
      )}
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
    </div>
  );
};
