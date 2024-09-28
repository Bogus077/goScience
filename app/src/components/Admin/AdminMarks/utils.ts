import { Row } from 'read-excel-file/types';

type ExcelDataType = string[][];

/**
 * Получение списка кадет, содержащихся в документе
 */
function getKidList({ data }: { data: ExcelDataType }) {
  const kidList: string[] = [];
  const kidListStartIndex = data.findIndex((row) => row[0] == '1');

  // Перебор всех строк и поиск фамилий
  for (let index = kidListStartIndex; index <= data.length; index++) {
    const row = data[index];
    if (row && typeof row[0] === 'number') {
      kidList.push(row[1] as string);
    } else {
      break;
    }
  }

  return kidList;
}

/**
 * Получить список дисциплин
 */
function getSubjectsList({ data }: { data: ExcelDataType }) {
  const subjectsList = new Set<string>();

  // Перебор всех строк и поиск фамилий
  for (let index = 0; index <= data.length; index++) {
    const row = data[index];
    if (row && /Предмет/gi.test(row[0] as string)) {
      const subject = (row[0] as string).replace('Предмет : ', '');
      subjectsList.add(subject);
    }
  }

  return Array.from(subjectsList);
}

/**
 * Получить оценки ученика по предмету
 */
function getKidSubjectMarks({
  data,
  kid,
  subject,
  kidIndex,
}: {
  data: ExcelDataType;
  kid: string;
  subject: string;
  kidIndex: number;
}) {
  const SUBJECT_KIDLIST_OFFSET = 4;
  const subjectIndexes = data
    .map((row, index) => {
      if (row[0] === `Предмет : ${subject}`) {
        return index;
      }
    })
    .filter((index) => index) as number[];

  const kidMarksWithDates: {
    mark: string | number;
    month: string;
    date: string;
  }[] = [];

  // Даты
  subjectIndexes.map((subjectIndex) => {
    const kidSubjectRow = [
      ...data[subjectIndex + SUBJECT_KIDLIST_OFFSET + kidIndex],
    ].splice(2);

    const monthRow = [...data[subjectIndex + 2]].splice(2);
    const datesRow = [...data[subjectIndex + 3]].splice(2);
    let currentMonth = monthRow[0];

    kidSubjectRow.map((mark, index) => {
      if (monthRow[index]) {
        currentMonth = monthRow[index];
      }

      kidMarksWithDates.push({
        mark: isNaN(parseFloat(mark)) ? mark : parseFloat(mark),
        month: currentMonth,
        date: datesRow[index] ?? null,
      });
    });
  });

  return kidMarksWithDates.filter((row) => row.mark);
}

/**
 * Получить оценки ученика по всем предметам
 */
function getKidMarks({
  data,
  kid,
  subjectsList,
  kidList,
}: {
  data: ExcelDataType;
  kid: string;
  subjectsList: string[];
  kidList: string[];
}) {
  const kidIndex = kidList.findIndex((kidInList) => kidInList === kid);

  const subjectsMarks = subjectsList.map((subject) => {
    const kidSubjectMarks = getKidSubjectMarks({
      data,
      kid,
      subject,
      kidIndex,
    });
    const marks = kidSubjectMarks
      .map((subject) => subject.mark)
      .filter((mark) => mark !== 'Н') as number[];
    const average =
      marks.length > 0
        ? (marks.reduce((a, b) => a + b, 0) / marks.length).toFixed(1)
        : '-';

    return {
      subject,
      marks: kidSubjectMarks.filter((mark) => mark.mark !== 'Н'),
      average,
    };
  });

  return subjectsMarks;
}

export function getMarks({ excel }: { excel: Row[] | null }) {
  if (!excel) return null;

  const data = excel as unknown as ExcelDataType;

  // Получить список кадет в документе
  const kidList = getKidList({ data });

  // Получить список дисциплин
  const subjectsList = getSubjectsList({ data });

  // Получить оценки
  const marks = kidList.map((kid) => ({
    kid,
    subjects: getKidMarks({ data, subjectsList, kidList, kid }),
  }));

  return marks;
}
