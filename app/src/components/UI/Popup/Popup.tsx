import React, { ReactElement } from 'react';
import { Portal } from './Potral';
import styles from './Popup.module.scss';

export type PopupTypes = {
  children: ReactElement;
  onClose: () => void;
  isOpen?: boolean;
  popupWindowRef?: React.MutableRefObject<HTMLDivElement>;
};

export const Popup = (props: PopupTypes) => {
  const { children, onClose, isOpen, popupWindowRef } = props;

  return isOpen ? (
    <Portal>
      <div className={styles.popup} ref={popupWindowRef}>
        <div className={styles.popup__overlay} onClick={onClose} />
        <div className={styles.popup__content}>{children}</div>
      </div>
    </Portal>
  ) : (
    <></>
  );
};
