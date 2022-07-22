import { object, string, bool, number } from 'yup';
import { VALIDATION_ERRORS } from './errors';
import { VALIDATION_REGEXP } from './regexps';

/**
 * Схема валидации формы входа
 */
export const loginValidationSchema = object({
  phone: string()
    .matches(VALIDATION_REGEXP.phone, VALIDATION_ERRORS.PHONE)
    .required(VALIDATION_ERRORS.REQUIRED),
  password: string()
    .min(5, VALIDATION_ERRORS.AUTH.SHORT_PASSWORD)
    .required(VALIDATION_ERRORS.REQUIRED),
});
