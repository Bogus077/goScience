import React from 'react';
import styles from './AdminEvents.module.scss';
import { Event } from '../../../models/Event/event';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { IconSquarePlus } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../../utils/router/routes';
import { AdminEventItem } from './AdminEventItem';

type AdminEventsTypes = {
  events: Event[];
};

export const AdminEvents = ({ events }: AdminEventsTypes) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} display="flex" justifyContent="end">
        <Button
          startIcon={<IconSquarePlus />}
          size="medium"
          variant="contained"
          onClick={() => navigate(frontendRoutes.admin.addEvent)}
        >
          Добавить мероприятие
        </Button>
      </Grid>

      {/* Мероприятия */}
      <Grid item container xs={12} spacing={5}>
        {[...events]
          .sort((a, b) => {
            if (new Date(a.startDate) > new Date(b.startDate)) {
              return -1;
            } else {
              return 1;
            }
          })
          .map((event) => (
            <Grid item key={event.id}>
              <AdminEventItem event={event} />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};
