import React, { useCallback, useMemo } from 'react';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Button, Paper } from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { useGetMembersQuery } from '../../../redux/GSApi';
import formatWithOptions from 'date-fns/fp/formatWithOptions';
import ru from 'date-fns/locale/ru';

export const AdminAddDoc = () => {
  const { data } = useGetMembersQuery('');
  const members = data?.slice(0, 10) ?? [];
  const membersTable = members.map((kid, index) => {
    const dob = formatWithOptions(
      { locale: ru },
      'd MMMM yyyy'
    )(new Date(kid.dob ?? ''));
    const contact = kid.MemberContacts[0].name ?? 'НЕТ ДАННЫХ';
    const phone = kid.MemberContacts[0].phone ?? 'НЕТ ДАННЫХ';
    return [index + 1, `${kid.surname} ${kid.name}`, dob, contact, phone];
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  const docDefinition = useMemo(() => {
    return {
      content: [
        { text: 'Приложение 1', style: 'subheader' },
        {
          text: 'Список сопровождающих',
          style: 'subtitle',
          margin: [0, 0, 0, 10],
        },
        { text: 'Приложение 2', style: 'subheader' },
        { text: 'Список детей', style: 'subtitle', margin: [0, 0, 0, 10] },
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: [25, '*', '*', '*', '*'],

            body: [
              ['№', 'ФИО', 'Дата рождения', 'Контакты', 'Телефон контакта'],
              ...membersTable,
            ],
          },
        },
      ],
      styles: {
        subheader: {
          bold: true,
        },
        subtitle: {
          alignment: 'center',
        },
        anotherStyle: {
          italics: true,
          alignment: 'right',
        },
      },
      defaultStyle: {
        fontSize: 10,
      },
    };
  }, [membersTable]);

  const handleCreate = useCallback(
    () => pdfMake.createPdf(docDefinition as TDocumentDefinitions).open(),
    [docDefinition]
  );

  return (
    <Paper>
      <Button onClick={handleCreate}>Создать документ</Button>
    </Paper>
  );
};
