import {
  Card,
  CardContent,
  CardMedia,
  TableContainer,
  Tooltip,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
// eslint-disable-next-line import/named
import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import { formatDistance, subYears } from 'date-fns';
import formatDuration from 'date-fns/formatDuration';
import formatWithOptions from 'date-fns/fp/formatWithOptions';
import intervalToDuration from 'date-fns/intervalToDuration';
import ru from 'date-fns/locale/ru';
import React from 'react';
import { useGetMembersQuery } from '../../../../redux/GSApi';

export const AdminBirthdayWidget = () => {
  const { data } = useGetMembersQuery('');

  const columns: GridColDef[] = [
    {
      field: 'surname',
      headerName: 'Фамилия Имя',
      flex: 1,
      renderCell: (params) => `${params.row.surname} ${params.row.name}`,
    },
    {
      field: 'dob',
      headerName: 'День рождения',
      flex: 1,
      renderCell: (params) => {
        const dob = new Date(params.row.dob).getDate();
        const today = new Date().getDate();
        const isToday = dob === today;
        const isTomorrow = dob === today + 1;
        return (
          <Tooltip title={params.row.dobFormatted}>
            {isToday ? (
              <Typography
                variant="body2"
                sx={{
                  border: '1px solid',
                  p: 0.5,
                  borderRadius: 1,
                  borderColor: '#ff6633',
                }}
              >
                Сегодня
              </Typography>
            ) : isTomorrow ? (
              <Typography
                variant="body2"
                sx={{
                  border: '1px solid',
                  p: 0.5,
                  borderRadius: 1,
                  borderColor: '#ffc123',
                }}
              >
                Завтра
              </Typography>
            ) : (
              <Typography variant="body2">{params.row.daysToDob}</Typography>
            )}
          </Tooltip>
        );
      },
    },
    {
      field: 'years',
      headerName: 'Исполнится',
      flex: 1,
      renderCell: (params) =>
        formatDuration(
          intervalToDuration({
            start: subYears(
              new Date(params.row.dob ?? '').setHours(23, 59, 59),
              1
            ),
            end: new Date(),
          }),
          {
            format: ['years'],
            locale: ru,
          }
        ),
    },
  ];

  const kids = data
    ?.filter((kid) => {
      const today = new Date(new Date().setHours(0, 0));
      const date = new Date(
        new Date(
          new Date(kid.dob ?? '').setFullYear(today.getFullYear())
        ).setHours(23, 59)
      );
      const birthDuration = intervalToDuration({
        start: today,
        end: date,
      });
      return kid.dob && (birthDuration.months ?? 2) < 1 && today < date;
    })
    .map((kid) => {
      const date = new Date(kid.dob ?? '');
      const dobFormatted = formatWithOptions(
        { locale: ru },
        'd MMMM yyyy'
      )(date);
      const nextDob = date.setFullYear(new Date().getFullYear());
      const daysToDob = formatDistance(date, new Date(), {
        locale: ru,
        addSuffix: true,
      });
      return {
        ...kid,
        dobFormatted,
        nextDob,
        daysToDob,
      };
    })
    .sort((a, b) => (a.nextDob > b.nextDob ? 1 : -1));

  return (
    <Card>
      <CardMedia
        component="img"
        height="250"
        image="/img/birthday.webp"
        alt="birthday"
      />
      <CardContent>
        <Typography variant="h5">Ближайшие дни рождения</Typography>
        <TableContainer component="div" sx={{ padding: 1 }}>
          <DataGrid
            rows={kids ?? []}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[20]}
            autoHeight={true}
            hideFooter={true}
          />
        </TableContainer>
      </CardContent>
    </Card>
  );
};
