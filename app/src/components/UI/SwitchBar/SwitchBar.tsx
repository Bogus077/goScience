import React from 'react';
import classNames from 'classnames/bind';
import styles from './SwitchBar.module.scss';
const cx = classNames.bind(styles);

type SwitchBarTypes = {
  items: { label: string; active: boolean; id: number }[];
  handleChangeActive: React.Dispatch<React.SetStateAction<number>>;
  onAdd?: () => void;
};

export const SwitchBar = ({
  items,
  handleChangeActive,
  onAdd,
}: SwitchBarTypes) => {
  const handleClick = (active: boolean, id: number) => {
    if (!active) {
      handleChangeActive(id);
    }
  };

  return (
    <div className={styles.bar}>
      {items.map((item) => (
        <div
          className={cx('bar__item', {
            bar__item_active: item.active,
          })}
          key={item.id}
          onClick={() => handleClick(item.active, item.id)}
        >
          <span>{item.label}</span>
        </div>
      ))}

      {onAdd && (
        <div className={cx('bar__item')} onClick={onAdd}>
          +
        </div>
      )}
    </div>
  );
};
