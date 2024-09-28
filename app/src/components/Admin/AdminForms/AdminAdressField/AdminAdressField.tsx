/* eslint-disable import/named */
import { useField, useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {
  AddressSuggestions,
  DaDataSuggestion,
  DaDataAddress,
} from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styles from './AdminAddressField.module.scss';

const DADATA_API = process.env.REACT_APP_DADATA_KEY ?? '';

type InputTextTypes = {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: () => void;
  onBlur?: () => void;
  defaultValue?: string;
  helperText?: string;
  isError?: boolean;
};

export const AdminAddressField = ({
  label,
  name,
  placeholder = 'Новый адрес',
  type,
  required,
  disabled,
  onBlur,
  defaultValue,
  helperText,
  isError,
}: InputTextTypes) => {
  const [field] = useField<string>(name);
  const [value, setValue] = useState<
    DaDataSuggestion<DaDataAddress> | undefined
  >((field.value ?? '') as unknown as DaDataSuggestion<DaDataAddress>);
  const { setFieldValue } = useFormikContext();
  const suggestionsRef = useRef<AddressSuggestions>(null);

  useEffect(() => {
    setFieldValue(name, value?.value ?? '');
  }, [name, setFieldValue, value]);

  useEffect(() => {
    if (field.value) suggestionsRef.current?.setInputValue(field.value);
  }, [field.value]);

  return (
    <Grid container spacing={2}>
      {label && (
        <Grid item sx={{ marginLeft: 2 }}>
          <Typography variant="caption" color={isError ? 'error' : 'grey'}>
            {label}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12} sx={{ marginTop: -2 }} className={styles.input}>
        <AddressSuggestions
          ref={suggestionsRef}
          delay={500}
          token={DADATA_API}
          value={value}
          onChange={setValue}
          httpCache={true}
          inputProps={{ placeholder }}
        />
      </Grid>
      {/* {defaultValue && <Grid item>{defaultValue}</Grid>} */}
      {helperText && (
        <Grid item sx={{ marginTop: -2, marginLeft: 2 }}>
          <Typography variant="caption" color={isError ? 'error' : 'grey'}>
            {helperText}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
