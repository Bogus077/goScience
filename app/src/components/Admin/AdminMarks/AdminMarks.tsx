import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React, {
  LegacyRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import readXlsxFile, { Row } from 'read-excel-file';
import { getMarks } from './utils';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import styles from './AdminMarks.module.scss';
import { AdminMarksItem } from './AdminMarksItem';
import { AdminMarksAverage } from './AdminMarksItem/AdminMarksAverage';
import ButtonGroup from '@mui/material/ButtonGroup';
import isSameDay from 'date-fns/isSameDay';
import { months } from './AdminMarksItem/AdminMarksItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';

export const AdminMarks = () => {
  const [excel, setExcel] = useState<Row[] | null>(null);
  const [averageFilter, setAverageFilter] = useState(99);

  // Высота меню
  const [menuHeight, setMenuHeight] = useState(0);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setMenuHeight(menuRef?.current?.clientHeight ?? 0);
  });

  // Загрузка файла
  const handleDeliveryFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files === null || event.target.files.length !== 1) {
      return;
    }

    readXlsxFile(event.target.files[0]).then((rows) => {
      setExcel(rows);
    });
  };

  const kids = useMemo(() => getMarks({ excel }), [excel]);
  const kidsFiltered = useMemo(() => {
    return kids
      ?.map((kid) => {
        const subjects = kid.subjects.filter((subject) =>
          subject.average === '-'
            ? true
            : parseFloat(subject.average) < averageFilter
        );

        return { ...kid, isVisible: subjects.length > 0, subjects };
      })
      .filter((kid) => kid.isVisible);
  }, [kids, averageFilter]);

  const todayMarks = useMemo(() => {
    const today = new Date();
    const yesterday = new Date(new Date().setDate(today.getDate() - 1));

    return kids
      ?.map((kid) => {
        const result: {
          kid: string;
          marks: {
            subject: string;
            mark: string | number;
            month: string;
            date: string;
            isToday: boolean;
          }[];
        } = { kid: kid.kid, marks: [] };

        kid.subjects.map((subject) =>
          subject.marks.map((mark) => {
            const month = months[mark.month as string];
            const date = new Date(
              `${today.getFullYear()}-${month}-${mark.date}`
            );
            const isToday = isSameDay(today, date);
            const isYesterday = isSameDay(yesterday, date);

            if (isToday || isYesterday) {
              result.marks.push({ ...mark, subject: subject.subject, isToday });
            }
          })
        );

        return result;
      })
      .filter((kid) => kid.marks.length > 0);
  }, [kids, averageFilter]);

  const handleClickScroll = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button component="label" variant="contained">
          <input
            type="file"
            accept=".xls,.xlsx"
            hidden
            onChange={handleDeliveryFileUpload}
          />
          Загрузить классный журнал (excel)
        </Button>
      </Grid>

      {!excel ? (
        <div className={styles.info}>
          Загрузите отчёт "Распечатка классного журнала", чтобы увидеть оценки.
          <br />
          Обратите внимание, что АСУ РСО выдаёт отчёт в формате xls (это старый
          файл экселя, который похоронили ещё в 2007). Вам необходимо
          пересохранить этот отчёт в формате xlsx (Открываем файл в экселе -
          файл - сохранить как - Книга Excel (*.xlsx))
        </div>
      ) : (
        <div className={styles.wrapper}>
          {/* Меню */}
          <div className={styles.menu} ref={menuRef}>
            {kidsFiltered?.map((kid) => (
              <div
                key={kid.kid}
                className={styles.menu__kid}
                onClick={() => handleClickScroll(kid.kid.split(' ').join('-'))}
              >
                {kid.kid}
              </div>
            ))}
          </div>

          {/* Новые оценки */}
          <Accordion sx={{ mb: 3 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <div className={styles.todayMarks__header}>Новые оценки</div>
              <div className={styles.todayMarks__subheader}>
                оценки, полученные за последние 2 дня
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className={styles.todayMarks}>
                {todayMarks?.length === 0 ? (
                  <>Нет новых оценок за последние 2 дня</>
                ) : (
                  todayMarks?.map((item) => (
                    <div className={styles.todayMarks__row} key={item.kid}>
                      <div className={styles.todayMarks__name}>{item.kid}</div>
                      <div className={styles.todayMarks__marks}>
                        {item.marks.map((mark) => (
                          <AdminMarksItem
                            mark={mark}
                            key={`${mark.date} - ${mark.month} - ${mark.subject}`}
                            description={mark.subject}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </AccordionDetails>
          </Accordion>

          {/* Фильтры */}
          <div className={styles.filters}>
            <ButtonGroup variant="outlined" aria-label="Фильтрация по оценкам">
              <Button
                onClick={() => setAverageFilter(2.5)}
                variant={averageFilter >= 2.5 ? 'contained' : 'outlined'}
              >
                Двойки
              </Button>
              <Button
                onClick={() => setAverageFilter(3.5)}
                variant={averageFilter >= 3.5 ? 'contained' : 'outlined'}
              >
                Тройки
              </Button>
              <Button
                onClick={() => setAverageFilter(4.5)}
                variant={averageFilter >= 4.5 ? 'contained' : 'outlined'}
              >
                Четверки
              </Button>
              <Button
                onClick={() => setAverageFilter(99)}
                variant={averageFilter >= 5 ? 'contained' : 'outlined'}
              >
                Все оценки
              </Button>
            </ButtonGroup>
          </div>

          <div className={styles.kidList}>
            {/* Список детей и их оценок */}
            {kidsFiltered?.map((kid) => (
              <div className={styles.subjects__wrapper} key={kid.kid}>
                <div className={styles.kidname__wrapper}>
                  <div
                    className={styles.kidname}
                    style={{
                      top: menuHeight + 20,
                    }}
                  >
                    {kid.kid}
                  </div>
                </div>

                <div
                  className={styles.subjects}
                  id={kid.kid.split(' ').join('-')}
                  style={{
                    scrollMarginTop: menuHeight,
                  }}
                >
                  {kid.subjects.map((subject) => (
                    <div
                      key={`${kid}-${subject.subject}`}
                      className={styles.subjects__row}
                    >
                      <div className={styles.average}>
                        <AdminMarksAverage average={subject.average} />
                      </div>
                      <div className={styles.subjects__name}>
                        {subject.subject}
                      </div>
                      <div className={styles.marks}>
                        {subject.marks.map((mark) => (
                          <AdminMarksItem
                            key={`${mark.date}-${mark.month}-${mark.mark}-${kid.kid}`}
                            mark={mark}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Grid>
  );
};
