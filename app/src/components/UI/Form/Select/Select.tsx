import React from 'react';
import { SelectTypes } from '../../../../models/Forms/forms';
import styles from './Select.module.scss';

export const Select = ({ onChange, options, optionValues }: SelectTypes) => {
  return (
    <select className={styles.select}>
      {options.map((option, key) => (
        <option key={key} value={option}>
          {optionValues[key]}
        </option>
      ))}
    </select>
  );
};
