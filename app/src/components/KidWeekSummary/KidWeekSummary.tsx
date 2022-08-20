import React, { useState } from 'react';
import { IconEye } from '../UI/Icons/IconEye';
import { Stars } from '../UI/Questionary/Stars';
import classNames from 'classnames/bind';
import styles from './KidWeekSummary.module.scss';
const cx = classNames.bind(styles);

export const KidWeekSummary = () => {
  const [visible, setVisible] = useState(true);

  const [difficultyMark, setDifficultyMark] = useState(0);
  const difficultyMarkText = [
    'Очень тяжело',
    'Тяжело',
    'Нормально',
    'Легко',
    'Очень легко',
  ];

  const [teacherMark, setTeacherMark] = useState(0);
  const teacherMarkText = [
    'Обычно совсем не понятно',
    'Иногда понятно',
    'Обычно всё понятно',
    'Понимаю почти всегда',
    'Всегда всё понятно',
  ];

  const [selfMark, setSelfrMark] = useState(0);
  const selfMarkText = [
    'Намного хуже, чем обычно',
    'Хуже, чем обычно',
    'Как обычно',
    'Лучше, чем обычно',
    'Намного лучше, чем обычно',
  ];

  return (
    <div className={styles.sum}>
      <div className={styles.header}>
        <div
          className={cx('header__eye', {
            header__eye_inactive: !visible,
          })}
          onClick={() => setVisible(!visible)}
        >
          <div>
            <IconEye />
          </div>
          <span>
            {visible
              ? 'Если кто-то подглядывает, нажми сюда'
              : 'Нажми ещё раз, чтобы вернуть'}
          </span>
        </div>
      </div>

      <div className={styles.sum__section}>
        <div className={styles.sum__header}>
          1. Насколько тебе тяжело на самоподготовке?
        </div>
        <div className={styles.sum__stars}>
          <Stars
            mark={difficultyMark}
            setMark={setDifficultyMark}
            markText={difficultyMarkText}
          />
          <div
            className={cx('hider', {
              hider_active: !visible,
            })}
          >
            Тут ничего нет
          </div>
        </div>
      </div>

      <div className={styles.sum__section}>
        <div className={styles.sum__header}>
          2. Понятны ли объяснения педагога на самоподготовке?
        </div>
        <div className={styles.sum__stars}>
          <Stars
            mark={teacherMark}
            setMark={setTeacherMark}
            markText={teacherMarkText}
          />
          <div
            className={cx('hider', {
              hider_active: !visible,
            })}
          >
            ¯\_(ツ)_/¯
          </div>
        </div>
      </div>

      <div className={styles.sum__section}>
        <div className={styles.sum__header}>
          3. Оцени свои старания в учёбе за прошедшую неделю
        </div>
        <div className={styles.sum__stars}>
          <Stars
            mark={selfMark}
            setMark={setSelfrMark}
            markText={selfMarkText}
          />
          <div
            className={cx('hider', {
              hider_active: !visible,
            })}
          >
            И тут пусто...
          </div>
        </div>
      </div>
    </div>
  );
};
