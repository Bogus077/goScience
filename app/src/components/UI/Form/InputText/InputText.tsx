import { useField } from 'formik';
import React, { useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './InputText.module.scss';
import { IconCross } from '../../Icons/Forms/IconCross';
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
  autoFocus?: boolean;
};

export const InputText = ({
  label,
  name,
  placeholder,
  type,
  required,
  disabled,
  onBlur,
  autoFocus,
}: InputTextTypes) => {
  const [field, { error }] = useField<string>(name);

  const isInvalid = useMemo(() => {
    return Boolean(error);
  }, [error]);

  return (
    <div className={cx('input', { input_invalid: isInvalid })}>
      {label && <span className={styles.input__label}>{label}</span>}
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        onBlur={onBlur}
        autoFocus={autoFocus}
      />
      {isInvalid && (
        <div
          className={cx('input__validateIcon', {
            input__validateIcon_up: !label,
          })}
        >
          <IconCross />
        </div>
      )}
      {isInvalid && (
        <span
          className={cx('input__error', {
            input__error_up: !label,
          })}
        >
          {error}
        </span>
      )}
    </div>
  );
};
