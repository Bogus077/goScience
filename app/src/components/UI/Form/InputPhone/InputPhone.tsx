import { useField } from 'formik';
import React, { useMemo } from 'react';
import classNames from 'classnames/bind';
import InputMask from 'react-input-mask';
import styles from './InputPhone.module.scss';
import { IconCross } from '../../Icons/Forms/IconCross';
import { IconPhone } from '../../Icons/Forms/IconPhone';
const cx = classNames.bind(styles);

type InputTextTypes = {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: () => void;
  onBlur?: () => void;
};

export const InputPhone = ({
  label,
  name,
  placeholder,
  type,
  required,
  disabled,
  onBlur,
}: InputTextTypes) => {
  const [field, { error }] = useField<string>(name);

  const isInvalid = useMemo(() => {
    return Boolean(error);
  }, [error]);

  return (
    <div className={cx('input', { input_invalid: isInvalid })}>
      {label && <span className={styles.input__label}>{label}</span>}
      <InputMask
        {...field}
        mask="+9 (999) 999 99 99"
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        onBlur={onBlur}
      />
      {isInvalid && (
        <div className={styles.input__validateIcon}>
          <IconCross />
        </div>
      )}
      <div className={styles.input__icon}>
        <IconPhone />
      </div>
      {isInvalid && <span className={styles.input__error}>{error}</span>}
    </div>
  );
};
