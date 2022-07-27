import React, { useEffect, useRef, useState } from 'react';
import { User } from '../../models/User/user';
import classNames from 'classnames/bind';
import styles from './ClassChanger.module.scss';
import { useChangeUserClassMutation } from '../../redux/GSApi';
import { Loader } from '../UI/Loader';
const cx = classNames.bind(styles);

type ClassChangerTypes = {
  userClass: string;
  classes: User['Classes'];
};

export const ClassChanger = ({ userClass, classes }: ClassChangerTypes) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [changeClass, { isLoading: isLoading }] = useChangeUserClassMutation();

  const handleChange = (id: number) => {
    changeClass({ id });
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const rootEl = useRef(document.createElement('div'));
  useEffect(() => {
    //Обрабатываем клик вне компонента
    const onClick = (e: MouseEvent) =>
      rootEl?.current?.contains(e.target as Node) || handleClose();
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div
      className={styles.class}
      onClick={isModalOpen ? handleClose : handleOpen}
      ref={rootEl}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <span className={styles.class__name}>{userClass}</span>
          <div className={styles.class__menu}>
            <span>класс</span> <div className={styles.triangle} />
          </div>
        </>
      )}
      <div
        className={cx('modal', {
          modal_closed: isModalOpen === false,
          modal_opened: isModalOpen,
        })}
      >
        {classes.map((c) => (
          <div
            className={styles.modal__item}
            key={c.id}
            onClick={() => handleChange(c.id)}
          >
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
};
