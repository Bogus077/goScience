import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useRef } from 'react';
import { useGetAttendanceQuery } from '../../../../redux/GSApi';
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  YAxis,
  Tooltip,
} from 'recharts';
import formatWithOptions from 'date-fns/fp/formatWithOptions';
import ru from 'date-fns/locale/ru';
import { Loader } from '../../../UI/Loader';
import { Button, Grid, Tooltip as MUITooltip } from '@mui/material';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';

export const AdminAttendanceWidget = () => {
  const { data, isLoading } = useGetAttendanceQuery('');

  const cardWidth = useRef<HTMLDivElement>(null);

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

  const datesSorted = Array.from(datesSet).map((date) => {
    const dateAttendance = dates?.filter((aDate) => aDate.keyDate === date);
    return {
      count: dateAttendance?.length ?? 0,
      createdAt: dateAttendance?.[0].createdAt ?? 0,
      readableDate: formatWithOptions(
        { locale: ru },
        'd MMMM yyyy, EEEEEE'
      )(new Date(dateAttendance?.[0].createdAt ?? '')),
    };
  });

  return (
    <Card ref={cardWidth}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Посещаемость
        </Typography>
        {isLoading ? (
          <Loader />
        ) : (
          <LineChart
            width={(cardWidth.current?.clientWidth ?? 400) - 40}
            height={400}
            data={datesSorted}
          >
            <Line type="monotone" dataKey="count" stroke="#1976d2" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="readableDate" />
            <YAxis />
            <Tooltip formatter={(value, name) => [value, 'Присутствовало']} />
          </LineChart>
        )}
        <Grid container justifyContent="flex-end">
          <Grid item sx={{ mt: 2 }}>
            <MUITooltip title="В разработке">
              <Button variant="outlined" startIcon={<EventRepeatIcon />}>
                Отдельно по кадетам
              </Button>
            </MUITooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
