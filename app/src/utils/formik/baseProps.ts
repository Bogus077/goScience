import type { FormikSharedConfig } from 'formik/dist/types';

export const getFormikBaseProps = (): FormikSharedConfig => ({
  validateOnChange: true,
  validateOnBlur: true,
});
