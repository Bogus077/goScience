// eslint-disable-next-line import/no-unresolved
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Event } from '../../../../models/Event/event';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import formatWithOptions from 'date-fns/fp/formatWithOptions';
import ru from 'date-fns/locale/ru';

export function createEventDoc(event: Event) {
  const orderDate = formatWithOptions(
    { locale: ru },
    'd MMMM yyyy'
  )(new Date(event.orderDate ?? ''));

  const startDate = formatWithOptions(
    { locale: ru },
    'd MMMM yyyy'
  )(new Date(event.startDate ?? ''));

  const membersTable = event.Members.map((kid, index) => {
    const dob = formatWithOptions(
      { locale: ru },
      'd MMMM yyyy'
    )(new Date(kid.dob ?? ''));
    const contact = kid.MemberContacts[0].name ?? 'НЕТ ДАННЫХ';
    const phone = kid.MemberContacts[0].phone ?? 'НЕТ ДАННЫХ';
    return [
      {
        text: index + 1,
        style: 'tableText',
        alignment: 'center',
      },
      {
        text: `${kid.surname} ${kid.name} ${kid.middleName ?? ''}`,
        style: 'tableText',
      },
      {
        text: dob,
        style: 'tableText',
      },
      {
        text: contact,
        style: 'tableText',
      },
      {
        text: phone,
        style: 'tableText',
      },
    ];
  });

  const usersTable = event.Users.map((user, index) => {
    return [
      {
        text: index + 1,
        style: 'tableText',
        alignment: 'center',
      },
      {
        text: `${user.surname} ${user.name} ${user.middleName ?? ''}`,
        style: 'tableText',
      },
      {
        text: user.phone,
        style: 'tableText',
      },
    ];
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  const docDefinition = {
    content: [
      {
        text: 'МУНИЦИПАЛЬНОЕ АВТОНОМНОЕ УЧРЕЖДЕНИЕ ДОПОЛНИТЕЛЬНОГО ОБРАЗОВАНИЯ',
        style: 'pageHeader',
        alignment: 'center',
      },
      {
        text: 'МУНИЦИПАЛЬНЫЙ УЧЕБНО-МЕТОДИЧЕСКИЙ ЦЕНТР ВОЕННО-ПАТРИОТИЧЕСКОГО ВОСПИТАНИЯ',
        style: 'pageHeader',
        alignment: 'center',
      },
      {
        text: '«АВАНГАРД-САМАРА»',
        style: 'pageHeader',
        alignment: 'center',
      },
      {
        text: 'СТРУКТУРНОЕ ПОДРАЗДЕЛЕНИЕ «КАДЕТСКИЙ КОРПУС»',
        style: 'pageHeader',
        alignment: 'center',
        margin: [0, 10, 0, 0],
      },

      {
        text: 'ПРИКАЗ',
        alignment: 'center',
        fontSize: 16,
        bold: true,
        margin: [0, 50, 0, 0],
      },

      {
        text: `от ${orderDate} г.`,
        margin: [0, 10, 0, 0],
      },
      {
        text: `№ ${event.orderNumber ?? ''}/од`,
        alignment: 'right',
        bold: true,
        margin: [0, -10, 0, 0],
      },

      {
        text: 'Об участии в мероприятии.',
        bold: true,
        margin: [0, 10, 0, 0],
      },
      {
        text: 'с целью военно-патриотического воспитания кадет',
        italics: true,
        margin: [0, 10, 0, 0],
      },
      {
        text: 'ПРИКАЗЫВАЮ:',
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 0],
      },

      {
        text: `1. Организовать выезд кадет МАУ Центр «Авангард-Самара» ${startDate} г. на мероприятие "${event.title}" по адресу: ${event.finishAddress}.`,
        margin: [0, 10, 0, 0],
        alignment: 'justify',
      },
      {
        text: 'Список кадет в приложении №2.',
        bold: true,
      },
      {
        text: `2. Назначить сопровождающего и ответственного за жизнь и здоровье детей на время мероприятия: ${
          event.Users[0]?.surname
        } ${event.Users[0]?.name} ${
          event.Users[0]?.middleName ?? ''
        } (Приложение №1)`,
        alignment: 'justify',
      },
      {
        text: `3. Сопровождающему провести с кадетами инструктаж о правилах поведения в пути следования и во время мероприятия.`,
        alignment: 'justify',
      },
      {
        text: '4. Контроль за исполнением приказа оставляю за собой.',
      },

      // Подпись
      {
        text: `Руководитель структурного подразделения`,
        margin: [0, 60, 0, 0],
      },
      {
        text: `МАУ Центр "Авангард-Самара"`,
      },
      {
        text: `"Кадетский корпус"`,
      },
      {
        text: `_______________________ А.С.Ларионов`,
        margin: [0, -10, 0, 0],
        alignment: 'right',
      },

      // =========================
      // =========================
      // ВТОРАЯ СТРАНИЦА
      // =========================
      // =========================
      // Список сопровождающих
      {
        text: 'Приложение 1',
        style: 'subheader',
        alignment: 'right',
        pageBreak: 'before',
      },
      {
        text: `к приказу от ${orderDate}г. № ${event.orderNumber ?? '___'}/од`,
        alignment: 'right',
        fontSize: 10,
        margin: [0, 0, 0, 10],
      },
      {
        text: 'Список сопровождающих',
        style: 'header',
        fontSize: 10,
        alignment: 'center',
        bold: true,
        margin: [0, 0, 0, 10],
      },
      {
        table: {
          alignment: 'center',
          headerRows: 1,
          widths: [25, '*', '*', '*', '*'],

          body: [
            [
              { text: '№', style: 'subheader', alignment: 'center' },
              { text: 'ФИО', style: 'subheader', alignment: 'center' },
              {
                text: 'Номер телефона',
                style: 'subheader',
                alignment: 'center',
              },
            ],
            ...usersTable,
          ],
        },
      },

      // Список кадет
      {
        text: 'Приложение 2',
        style: 'subheader',
        alignment: 'right',
      },
      {
        text: `к приказу от ${orderDate}г. № ${event.orderNumber ?? '___'}/од`,
        alignment: 'right',
        fontSize: 10,
        margin: [0, 0, 0, 10],
      },
      {
        text: 'Список кадет',
        fontSize: 10,
        alignment: 'center',
        bold: true,
      },
      {
        text: 'структурного подразделения',
        fontSize: 10,
        alignment: 'center',
      },
      {
        text: 'МАУ Центр "Авангард-Самара" г.о. Самара "Кадетский корпус"',
        fontSize: 10,
        alignment: 'center',
      },
      {
        text: `выезд ${startDate}г.`,
        fontSize: 10,
        alignment: 'center',
        margin: [0, 0, 0, 10],
      },
      {
        table: {
          headerRows: 1,
          widths: [25, '*', '*', '*', '*'],

          body: [
            [
              { text: '№', style: 'subheader', alignment: 'center' },
              { text: 'ФИО', style: 'subheader', alignment: 'center' },
              {
                text: 'Дата рождения',
                style: 'subheader',
                alignment: 'center',
              },
              {
                text: 'ФИО родителя',
                style: 'subheader',
                alignment: 'center',
              },
              {
                text: 'Номер телефона родителей',
                style: 'subheader',
                alignment: 'center',
              },
            ],
            ...membersTable,
          ],
        },
      },

      // Подпись
      {
        text: `Руководитель структурного подразделения`,
        margin: [0, 20, 0, 0],
      },
      {
        text: `МАУ Центр "Авангард-Самара"`,
      },
      {
        text: `"Кадетский корпус"`,
      },
      {
        text: `_______________________ А.С.Ларионов`,
        margin: [0, -10, 0, 0],
        alignment: 'right',
      },
    ],
    styles: {
      pageHeader: {
        bold: true,
        fontSize: 8,
      },
      subheader: {
        bold: true,
        fontSize: 10,
      },
      subtitle: {
        alignment: 'center',
        fontSize: 14,
      },
      anotherStyle: {
        italics: true,
        alignment: 'right',
        fontSize: 14,
      },
      tableText: {
        fontSize: 10,
      },
    },
    defaultStyle: {
      fontSize: 12,
    },
  };

  pdfMake.createPdf(docDefinition as TDocumentDefinitions).open();
  return;
}
