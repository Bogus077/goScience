import TextField from '@mui/material/TextField';
import { useField } from 'formik';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Autocomplete from '@mui/material/Autocomplete';

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
};

export const AdminAddressField = ({
  label,
  name,
  placeholder,
  type,
  required,
  disabled,
  onBlur,
}: InputTextTypes) => {
  const { enqueueSnackbar } = useSnackbar();
  const [field] = useField<string>(name);
  const [options, setOptions] = useState<string[]>([]);

  const getDaData = useCallback(
    async (value: string) =>
      await axios({
        method: 'post',
        url: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
        data: {
          query: value,
          locations: [
            {
              region_iso_code: 'RU-SAM',
            },
          ],
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${DADATA_API}`,
        },
      })
        .then(function (response) {
          const options = response.data.suggestions.map(
            (item: { value: string }) => item.value
          );
          setOptions(options);
        })
        .catch(function (error) {
          enqueueSnackbar(error.response?.statusText ?? error.message, {
            variant: 'error',
          });
        }),
    [enqueueSnackbar]
  );

  const onChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (e: React.ChangeEvent<any>) => {
      field.onChange(e);
      const value = e.target.value;

      await getDaData(value);
    },
    [field, getDaData]
  );

  return (
    <Autocomplete
      {...field}
      fullWidth
      disablePortal
      options={options}
      onInputChange={onChange}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label={label} multiline rows={3} />
      )}
    />
  );
};
