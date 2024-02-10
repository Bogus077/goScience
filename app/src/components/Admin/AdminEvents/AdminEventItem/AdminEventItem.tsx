import React, { useCallback, useState } from 'react';
import styles from './AdminEventItem.module.scss';
import { Event } from '../../../../models/Event/event';
import formatWithOptions from 'date-fns/fp/formatWithOptions';
import ru from 'date-fns/locale/ru';
import { useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../../../utils/router/routes';
import { IconFileCheck, IconTrashX } from '@tabler/icons';
import IconButton from '@mui/material/IconButton';
import { useDeleteEventMutation } from '../../../../redux/GSApi';
import { useSnackbar } from 'notistack';
import { ConfirmModal } from '../../ConfirmModal';
import { createEventDoc } from './utils';

type AdminEventItemTypes = {
  event: Event;
};

export const AdminEventItem = ({ event }: AdminEventItemTypes) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [triggerDeleteEvent, deleteEventQueryState] = useDeleteEventMutation();

  const [isDelete, setIsDelete] = useState(false);
  const handleDelete = useCallback(async () => {
    if (deleteEventQueryState.isLoading) return;

    try {
      await triggerDeleteEvent({ id: event.id }).unwrap();
      enqueueSnackbar(`Мероприятие ${event.title} успешно удалено`, {
        variant: 'success',
      });
    } catch {
      enqueueSnackbar('Ошибка удаления мероприятия', {
        variant: 'success',
      });
    }
    setIsDelete(false);
  }, [
    deleteEventQueryState.isLoading,
    enqueueSnackbar,
    event.id,
    event.title,
    triggerDeleteEvent,
  ]);

  const eventDate = formatWithOptions(
    { locale: ru },
    'd MMMM yyyy'
  )(new Date(event.startDate));
  return (
    <div className={styles.eventWrapper}>
      <div
        className={styles.eventDate}
        onClick={() =>
          navigate(`${frontendRoutes.admin.editEvent}/${event.id}`)
        }
      >
        {eventDate}
      </div>
      <div
        className={styles.title}
        onClick={() =>
          navigate(`${frontendRoutes.admin.editEvent}/${event.id}`)
        }
      >
        {event.title}
      </div>

      <div
        className={styles.address}
        onClick={() =>
          navigate(`${frontendRoutes.admin.editEvent}/${event.id}`)
        }
      >
        {event.finishAddress}
      </div>

      <div className={styles.buttons}>
        <IconButton
          aria-label="Распечатать документы"
          onClick={() => createEventDoc(event)}
        >
          <IconFileCheck />
        </IconButton>
        <IconButton
          aria-label="Удалить мероприятие"
          onClick={() => setIsDelete(true)}
        >
          <IconTrashX />
        </IconButton>
      </div>

      {/* Количество */}
      <div
        className={styles.people}
        onClick={() =>
          navigate(`${frontendRoutes.admin.editEvent}/${event.id}`)
        }
      >
        <div className={styles.people__block}>
          <div className={styles.people__title}>Взрослые</div>
          <div className={styles.people__count}>{event.Users.length}</div>
        </div>
        <div className={styles.people__block}>
          <div className={styles.people__title}>Кадеты</div>
          <div className={styles.people__count}>{event.Members.length}</div>
        </div>
      </div>

      {isDelete && (
        <ConfirmModal
          open={isDelete}
          onAgree={handleDelete}
          onCancel={() => setIsDelete(false)}
          title="Удалить мероприятие"
          isSubmitting={deleteEventQueryState.isLoading}
        >
          Вы действительно хотите удалить {event.title}?. Это действие
          необратимо.
        </ConfirmModal>
      )}
    </div>
  );
};
