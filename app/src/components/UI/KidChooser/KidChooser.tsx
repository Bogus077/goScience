import React from 'react';
import { Kid } from '../../../models/Kid/kid';
import classNames from 'classnames/bind';
import styles from './KidChooser.module.scss';
const cx = classNames.bind(styles);

type KidChooserTypes = {
  kids: Kid[];
  type?: 'single' | 'multiple';
  active: number[];
  setActive: React.Dispatch<React.SetStateAction<number[]>>;
};

export const KidChooser = ({
  kids,
  type = 'single',
  active,
  setActive,
}: KidChooserTypes) => {
  const handleClick = (id: number) => {
    if (active.includes(id)) {
      const next = active.filter((kidId) => kidId !== id);
      setActive(next);
    } else {
      const next = type === 'single' ? [id] : [...active, id];
      setActive(next);
    }
  };

  return (
    <div className={styles.chooser}>
      {kids.map((kid) => (
        <div
          className={cx('chooser__item', {
            chooser__item_active: active.includes(kid.id ?? 0),
          })}
          key={kid.id}
          onClick={() => handleClick(kid.id ?? 0)}
        >{`${kid.surname} ${kid.name.slice(0, 1)}.`}</div>
      ))}
    </div>
  );
};
