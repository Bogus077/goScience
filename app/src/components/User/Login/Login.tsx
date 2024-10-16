import React, { useCallback, useEffect, useMemo } from 'react';
import { UserSteps } from '../UserSteps';
import { UserStep } from '../../../models/User/steps';
import styles from './Login.module.scss';
import { InputText } from '../../UI/Form/InputText';
import { FormikContext, useFormik } from 'formik';
import { getFormikBaseProps } from '../../../utils/formik/baseProps';
import { InputPhone } from '../../UI/Form/InputPhone';
import loginBookImg from '../../../assets/img/loginbook.jpg';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import {
  authInitialValues,
  loginValidationSchema,
} from '../../../models/Validations/validations';
import { useCheckPhoneMutation, useLoginMutation } from '../../../redux/GSApi';
import { AuthorizationRequest } from '../../../models/User/auth';
import { FetchError } from '../../../models/Api/errors';
import { useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../../utils/router/routes';
import { VALIDATION_ERRORS } from '../../../models/Validations/errors';
import { Link } from '@mui/material';

export const Login = () => {
  const navigate = useNavigate();
  const [logIn, { isLoading, isError, error }] = useLoginMutation();
  const [checkPhone, { isLoading: isCheckPhoneLoading }] =
    useCheckPhoneMutation();

  const handleSubmit = async (values: AuthorizationRequest) => {
    if (isLoading) {
      return;
    }
    const result = await logIn(values);
    if ('data' in result && result.data) {
      navigate(frontendRoutes.members);
    }
  };

  const formik = useFormik({
    initialValues: authInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: handleSubmit,
    ...getFormikBaseProps(),
  });

  const steps: UserStep[] = useMemo(
    () => [
      {
        title: 'Номер телефона',
        description:
          'Используйте номер телефона, который указывали при регистрации.',
        link: {
          title: 'У меня ещё нет аккаунта',
          url: frontendRoutes.user.registration,
        },
        img: loginBookImg,
        buttons: {
          nextButton: {
            available:
              formik.errors.phone !== undefined ||
              formik.values.phone === '' ||
              formik.values.phone.search(/_/) !== -1 ||
              isCheckPhoneLoading
                ? false
                : true,
            title: 'Дальше',
            isLoading: isCheckPhoneLoading,
          },
          prevButton: {
            handleClick: () => navigate(frontendRoutes.members),
            title: 'Отмена',
          },
        },
        errors: formik.errors.phone ? [formik.errors.phone] : [],
      },

      {
        title: 'Пароль',
        description:
          'Введите пароль, выбранный при регистрации. Если вы его не помните, обратитесь к Владиславу Андреевичу',
        link: {
          title: 'Восстановить пароль (отключено)',
          url: '',
        },
        img: loginBookImg,
        buttons: {
          nextButton: {
            available:
              formik.errors.password !== undefined ||
              formik.values.password === ''
                ? false
                : true,
            title: 'Войти',
            handleClick: formik.handleSubmit,
            isLoading: isLoading,
          },
          prevButton: {
            title: 'Назад',
          },
        },
        errors: formik.errors.password ? [formik.errors.password] : [],
      },
    ],
    [
      formik.errors.password,
      formik.errors.phone,
      formik.handleSubmit,
      formik.values.password,
      formik.values.phone,
      isCheckPhoneLoading,
      isLoading,
      navigate,
    ]
  );

  const handleCheckPhone = useCallback(async () => {
    await formik.validateField('phone');
    if (formik.errors.phone === undefined && formik.values.phone !== '') {
      const result = await checkPhone({ phone: formik.values.phone });

      if ('data' in result && !result.data.phoneExist) {
        formik.setFieldError('phone', VALIDATION_ERRORS.PHONE.IS_NOT_EXISTS);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    checkPhone,
    formik.validateField,
    formik.values.phone,
    formik.errors.phone,
  ]);

  useEffect(() => {
    if (
      formik.errors.phone === undefined &&
      formik.values.phone !== '' &&
      formik.values.phone.search(/_/) === -1
    )
      handleCheckPhone();
  }, [formik.errors.phone, formik.values.phone, handleCheckPhone]);

  useEffect(() => {
    if (isError && error && 'data' in error) {
      const errorData = error as FetchError;
      errorData.data.errorMessage === 'Invalid password'
        ? formik.setFieldError('password', VALIDATION_ERRORS.PASSWORD.WRONG)
        : formik.setFieldError(
            'password',
            VALIDATION_ERRORS.SERVER.UNTYPED_ERROR
          );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError]);

  return (
    <div className={styles.login}>
      <FormikContext.Provider value={formik}>
        <div className={styles.androidDownload}>
          <InstallMobileIcon />
          <a
            className={styles.androidDownload__link}
            href="/download/kkAvangard.apk"
            target="_blank"
          >
            Скачать android-приложение
          </a>
        </div>
        <UserSteps steps={steps}>
          <div>
            <InputPhone
              name="phone"
              placeholder="+7 987 654 32 10"
              label="Номер телефона"
            />
          </div>

          <div>
            <InputText
              name="password"
              label="Пароль"
              placeholder="*****"
              type="password"
              onBlur={() => formik.validateField('password')}
            />
          </div>
        </UserSteps>
      </FormikContext.Provider>
    </div>
  );
};
