import React, { useState } from 'react';
import { IconCross } from '../Icons/Forms/IconCross';
import { Popup } from '../Popup';
import classNames from 'classnames/bind';
import styles from './ConfirmModal.module.scss';
const cx = classNames.bind(styles);

type ConfirmModalTypes = {
  isOpen?: boolean;
  titleText: string;
  message: string;
  type?: 'negative' | 'positive';
  acceptText?: string;
  rejectText?: string;
  onAccept: () => void;
  onReject: () => void;
};

export const ConfirmModal = ({
  isOpen,
  titleText,
  message,
  type = 'negative',
  acceptText,
  rejectText,
  onAccept,
  onReject,
}: ConfirmModalTypes) => {
  const [isClosed, setClosed] = useState(false);

  const handleReject = () => {
    setClosed(true);
    setTimeout(() => {
      onReject();
      setClosed(false);
    }, 150);
  };

  const handleAccept = () => {
    setClosed(true);
    setTimeout(() => {
      onAccept();
      setClosed(false);
    }, 150);
  };

  return (
    <Popup onClose={onReject} isOpen={isOpen}>
      <div
        className={cx('modal', {
          modal_closed: isClosed,
        })}
      >
        <div className={styles.modal__header}>
          {titleText}
          <div className={styles.modal__close} onClick={handleReject}>
            <IconCross />
          </div>
        </div>
        <div className={styles.modal__message}>{message}</div>
        {acceptText && rejectText && (
          <div className={styles.modal__confirm}>
            <div
              className={styles.modal__confirm_negative}
              onClick={handleReject}
            >
              {rejectText}
            </div>
            <div
              className={cx('modal__confirm_positive', {
                modal__confirm_positive_red: type === 'negative',
                modal__confirm_positive_green: type === 'positive',
              })}
              onClick={handleAccept}
            >
              {acceptText}
            </div>
          </div>
        )}
      </div>
    </Popup>
  );
};
