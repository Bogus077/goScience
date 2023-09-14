import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useCallback } from 'react';
import { useGetAttendanceQuery } from '../../../../redux/GSApi';
import {
  XAxis,
  CartesianGrid,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import formatWithOptions from 'date-fns/fp/formatWithOptions';
import ru from 'date-fns/locale/ru';
import { Loader } from '../../../UI/Loader';
import { Button, Grid, Tooltip as MUITooltip } from '@mui/material';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../../../utils/router/routes';

export const AdminAttendanceWidget = () => {
  const { data, isLoading } = useGetAttendanceQuery({});
  const navigate = useNavigate();

  const dataFiltred = data?.filter((data) => data.type === 'in');
  const datesSet = new Set<string>();
  const dates = dataFiltred?.map((data) => {
    const newDate = new Date(data.createdAt);
    const keyDate = `${newDate.getFullYear()}.${newDate.getMonth()}.${newDate.getDate()}`;
    datesSet.add(keyDate);
    return {
      ...data,
      keyDate,
    };
  });

  const datesSorted = Array.from(datesSet)
    .map((date) => {
      const dateAttendance = dates?.filter((aDate) => aDate.keyDate === date);
      return {
        count: dateAttendance?.length ?? 0,
        createdAt: dateAttendance?.[0].createdAt ?? 0,
        readableDate: formatWithOptions(
          { locale: ru },
          'd MMM, EEEEEE'
        )(new Date(dateAttendance?.[0].createdAt ?? '')),
      };
    })
    .sort(
      (dateA, dateB) =>
        new Date(dateA.createdAt as string).getDate() -
        new Date(dateB.createdAt as string).getDate()
    );

  const handleKidsAttendanceLink = useCallback(
    () => navigate(frontendRoutes.admin.members),
    [navigate]
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Посещаемость
        </Typography>
        {isLoading ? (
          <Loader />
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={datesSorted}>
              <Area
                type="monotone"
                dataKey="count"
                stroke="#1976d2"
                fillOpacity={0.1}
                fill="#1976d2"
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="readableDate" />
              <YAxis />
              <Tooltip formatter={(value, name) => [value, 'Присутствовало']} />
            </AreaChart>
          </ResponsiveContainer>
        )}
        <Grid container justifyContent="flex-end">
          <Grid item sx={{ mt: 2 }}>
            <MUITooltip title="Отдельно для каждого кадета">
              <Button
                variant="outlined"
                startIcon={<EventRepeatIcon />}
                onClick={handleKidsAttendanceLink}
              >
                Отдельно по кадетам
              </Button>
            </MUITooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
