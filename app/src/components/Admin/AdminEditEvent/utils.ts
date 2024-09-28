import { addEventInitialValues } from '../../../models/Validations/validations';
import { Event } from '../../../models/Event/event';

export function transformEventToFormValues(
  event: Event
): typeof addEventInitialValues {
  return {
    title: event.title,
    startDate: event.startDate,
    startAddress: event.startAddress,
    finishAddress: event.finishAddress,
    orderDate: event.orderDate,
    orderNumber: event.orderNumber,
    members: event.Members.map((member) => member.id),
    users: event.Users.map((user) => user.id),
  };
}
