import { object, ref, string } from 'yup';
import { VALIDATION_ERRORS } from './errors';
import { VALIDATION_REGEXP } from './regexps';

export const authInitialValues = {
  phone: '',
  password: '',
};

/**
 * Схема валидации формы входа
 */
export const loginValidationSchema = object({
  phone: string()
    .matches(VALIDATION_REGEXP.phone, VALIDATION_ERRORS.PHONE.INCORRECT)
    .required(VALIDATION_ERRORS.REQUIRED),
  password: string()
    .min(5, VALIDATION_ERRORS.PASSWORD.SHORT)
    .required(VALIDATION_ERRORS.REQUIRED),
});

export const signUpInitialValues = {
  phone: '',
  password: '',
  password_confirm: '',
  name: '',
  surname: '',
  classLabel: '',
};

/**
 * Схема валидации формы регистрации
 */
export const signUpValidationSchema = object({
  phone: string()
    .matches(VALIDATION_REGEXP.phone, VALIDATION_ERRORS.PHONE.INCORRECT)
    .required(VALIDATION_ERRORS.REQUIRED),
  password: string()
    .min(6, VALIDATION_ERRORS.PASSWORD.SHORT)
    .required(VALIDATION_ERRORS.REQUIRED),
  password_confirm: string()
    .required(VALIDATION_ERRORS.REQUIRED)
    .oneOf([ref('password'), null], VALIDATION_ERRORS.PASSWORD.NOT_EQUAL),
  name: string().required(VALIDATION_ERRORS.REQUIRED),
  surname: string().required(VALIDATION_ERRORS.REQUIRED),
  classLabel: string().required(VALIDATION_ERRORS.REQUIRED),
});

export const addKidInitialValues = {
  name: '',
  surname: '',
};

/**
 * Схема валидации таблица настроек класса
 */
export const editKidValidationSchema = object({
  phone: string().matches(
    VALIDATION_REGEXP.phone,
    VALIDATION_ERRORS.PHONE.INCORRECT
  ),
  name: string().required(VALIDATION_ERRORS.REQUIRED),
  surname: string().required(VALIDATION_ERRORS.REQUIRED),
});

export const createKidInitialValues = {
  name: '',
  surname: '',
  phone: '',
};

export const createKidValidationSchema = editKidValidationSchema;
