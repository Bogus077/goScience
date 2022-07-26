import React from 'react';
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
  return (
    <Popup onClose={onReject} isOpen={isOpen}>
      <div className={styles.modal}>
        <div className={styles.modal__header}>
          {titleText}
          <div className={styles.modal__close} onClick={onReject}>
            <IconCross />
          </div>
        </div>
        <div className={styles.modal__message}>{message}</div>
        {acceptText && rejectText && (
          <div className={styles.modal__confirm}>
            <div className={styles.modal__confirm_negative} onClick={onReject}>
              {rejectText}
            </div>
            <div
              className={cx('modal__confirm_positive', {
                modal__confirm_positive_red: type === 'negative',
                modal__confirm_positive_green: type === 'positive',
              })}
              onClick={onAccept}
            >
              {acceptText}
            </div>
          </div>
        )}
      </div>
    </Popup>
  );
};
