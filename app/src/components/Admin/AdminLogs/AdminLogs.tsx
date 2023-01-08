import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
// eslint-disable-next-line import/named
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import React, { useCallback, useState } from 'react';
import { Log, LogsFilters } from '../../../models/Logs/logs';
import { formatDistance } from 'date-fns';
import { ru } from 'date-fns/locale';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {
  IconSearch,
  IconSquareX,
  IconPlugConnected,
  IconPlugConnectedX,
  IconChecks,
  IconBoxOff,
} from '@tabler/icons';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

type AdminLogsTypes = {
  logs: Log[];
  isLoading: boolean;
  filters: LogsFilters;
  setFilters: (filters: LogsFilters) => void;
};

export const AdminLogs = ({
  logs,
  isLoading,
  filters,
  setFilters,
}: AdminLogsTypes) => {
  const [search, setSearch] = useState<string>('');
  const [limit, setLimit] = useState<number | null>(100);
  const [users, setUsers] = useState<number>(0);
  const userIds = Array.from(
    new Map(
      logs.map((log) => {
        return [log.UserId, log.log.split(' ').slice(0, 2)];
      })
    )
  );

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch(event.target.value);
  };
  const clearSearch = useCallback(() => setSearch(''), []);

  const handleLimitChange = useCallback(
    (event: React.MouseEvent<HTMLElement>, limit: number | null) => {
      setLimit(limit);
    },
    []
  );

  const handleChangeUser = useCallback(
    (event: React.MouseEvent<HTMLElement>, users: number) => {
      setUsers(users);
    },
    []
  );

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 0.1,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'UserId',
      headerName: 'UserID',
      flex: 0.1,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'log',
      headerName: 'Логи',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        const connectRegExp = new RegExp('подключился');
        const disconnectRegExp = new RegExp('отключился');
        const editStatusOnRegExp = new RegExp('в строю');
        const editStatusOffRegExp = new RegExp('болеет');
        if (connectRegExp.test(params.row.log))
          return (
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <IconPlugConnected color="#24b26d" />
              </Grid>
              <Grid item>{params.row.log}</Grid>
            </Grid>
          );
        if (disconnectRegExp.test(params.row.log))
          return (
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <IconPlugConnectedX color="#e33f3d" />
              </Grid>
              <Grid item>{params.row.log}</Grid>
            </Grid>
          );
        if (editStatusOnRegExp.test(params.row.log))
          return (
            <Grid container alignItems="center" spacing={1}>
              <Grid item>{params.row.log}</Grid>
              <Grid item>
                <IconChecks color="#24b26d" />
              </Grid>
            </Grid>
          );
        if (editStatusOffRegExp.test(params.row.log))
          return (
            <Grid container alignItems="center" spacing={1}>
              <Grid item>{params.row.log}</Grid>
              <Grid item>
                <IconBoxOff color="#e33f3d" />
              </Grid>
            </Grid>
          );
        return <>{params.row.log}</>;
      },
    },
    {
      field: 'createdAt',
      headerName: 'Дата',
      flex: 0.4,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        const date = new Date(params.row.createdAt);
        return formatDistance(date, new Date(), {
          addSuffix: true,
          locale: ru,
        });
      },
    },
  ];

  const saveFilters = useCallback(() => {
    let newFilters: LogsFilters = { log: search, limit: limit ?? 100 };
    if (users) newFilters = { ...newFilters, UserId: users };
    setFilters(newFilters);
  }, [limit, search, setFilters, users]);

  const clearFilters = useCallback(() => {
    setFilters({});
    setSearch('');
    setLimit(100);
    setUsers(0);
  }, [setFilters]);

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Grid item width={300}>
          <TextField
            fullWidth
            id="input-with-icon-textfield"
            label=""
            value={search}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size={20} />
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
      </Grid>
      <Grid item>
        <ToggleButtonGroup
          value={limit}
          onChange={handleLimitChange}
          aria-label="plats checker"
          color="primary"
          exclusive
          size="small"
        >
          <ToggleButton value={50} aria-label="50">
            50
          </ToggleButton>
          <ToggleButton value={100} aria-label="100">
            100
          </ToggleButton>
          <ToggleButton value={250} aria-label="250">
            250
          </ToggleButton>
          <ToggleButton value={500} aria-label="500">
            500
          </ToggleButton>
          <ToggleButton value={1000} aria-label="1000">
            1000
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item>
        <ToggleButtonGroup
          value={users}
          onChange={handleChangeUser}
          aria-label="plats checker"
          color="primary"
          size="small"
          exclusive
        >
          {userIds.map((user) => (
            <ToggleButton value={user[0]} aria-label="50" key={user[0]}>
              {user[1].join(' ')}
            </ToggleButton>
          ))}
          <ToggleButton value={0} aria-label="50">
            Все
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item>
        <Button onClick={saveFilters} size="large">
          Применить фильтры
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={clearFilters} size="large" color="secondary">
          Сбросить фильтры
        </Button>
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{ padding: 1 }}>
          <DataGrid
            rows={logs}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            autoHeight={true}
            components={{ Toolbar: GridToolbar }}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  UserId: false,
                  id: false,
                },
              },
            }}
          />
        </TableContainer>
      </Grid>
    </Grid>
  );
};
