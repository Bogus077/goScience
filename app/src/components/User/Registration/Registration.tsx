import { FormikContext, useFormik } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpRequest } from '../../../models/User/signUp';
import {
  addKidInitialValues,
  signUpInitialValues,
  signUpValidationSchema,
} from '../../../models/Validations/validations';
import {
  useCheckPhoneMutation,
  useCreateClassMutation,
  useCreateKidMutation,
  useSignUpMutation,
} from '../../../redux/GSApi';
import { getFormikBaseProps } from '../../../utils/formik/baseProps';
import { frontendRoutes } from '../../../utils/router/routes';
import loginBookImg from '../../../assets/img/loginbook.jpg';
import styles from './Registration.module.scss';
import { UserStep } from '../../../models/User/steps';
import { VALIDATION_ERRORS } from '../../../models/Validations/errors';
import { UserSteps } from '../UserSteps';
import { InputPhone } from '../../UI/Form/InputPhone';
import { InputText } from '../../UI/Form/InputText';
import { AddKidsTable } from '../../UI/Form/AddKidsTable';
import { KidRow } from '../../../models/Kid/kid';

export const Registration = () => {
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();
  const [createClass] = useCreateClassMutation();
  const [checkPhone, { isLoading: isCheckPhoneLoading }] =
    useCheckPhoneMutation();
  const [createKids] = useCreateKidMutation();
  const [kids, setKids] = useState<KidRow[]>([addKidInitialValues]);

  const handleSubmit = async (
    values: SignUpRequest & { password_confirm: string; classLabel: string }
  ) => {
    if (isLoading) {
      return;
    }
    const signUpResponse = await signUp(values);
    if ('data' in signUpResponse && signUpResponse.data) {
      const createClassResponse = await createClass({
        label: values.classLabel,
        userId: signUpResponse.data.id,
      });

      if ('data' in createClassResponse && createClassResponse.data) {
        const createKidsResponse = await createKids(
          kids
            .filter((kid) => kid.name !== '' && kid.surname !== '')
            .map((kid) => {
              return { ...kid, ClassId: createClassResponse.data.id };
            })
        );

        if ('data' in createKidsResponse && createKidsResponse.data) {
          navigate(frontendRoutes.members);
        }
      }
    }
  };

  const formik = useFormik({
    initialValues: signUpInitialValues,
    validationSchema: signUpValidationSchema,
    onSubmit: handleSubmit,
    ...getFormikBaseProps(),
  });

  const steps: UserStep[] = useMemo(
    () => [
      //Первый шаг: номер телефона
      {
        title: 'Номер телефона',
        description:
          'Используйте настоящий номер телефона. Он будет необходим для входа на сайт.',
        link: {
          title: 'У меня уже есть аккаунт',
          url: frontendRoutes.user.login,
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

      //Второй шаг: пароль и подтверждение
      {
        title: 'Пароль',
        description:
          'Придумайте пароль. Он должен содержать не менее 6 символов.',
        img: loginBookImg,
        buttons: {
          nextButton: {
            available:
              formik.errors.password !== undefined ||
              formik.values.password === '' ||
              formik.errors.password_confirm !== undefined ||
              formik.values.password_confirm === ''
                ? false
                : true,
            title: 'Дальше',
          },
          prevButton: {
            title: 'Назад',
          },
        },
        errors: formik.errors.password ? [formik.errors.password] : [],
      },

      //Третий шаг: Имя и фамилия
      {
        title: 'Имя и фамилия',
        description:
          'С формальностями покончено - давайте знакомиться! Имя и фамилия будут видны другим пользователям.',
        img: loginBookImg,
        buttons: {
          nextButton: {
            available:
              formik.errors.name !== undefined ||
              formik.values.name === '' ||
              formik.errors.surname !== undefined ||
              formik.values.surname === ''
                ? false
                : true,
            title: 'Дальше',
          },
          prevButton: {
            title: 'Назад',
          },
        },
        errors: [formik.errors.name, formik.errors.surname].filter(
          (e) => e !== undefined
        ),
      },

      //Четвертый шаг: класс
      {
        title: 'Класс',
        description:
          'У каждого педагога должен быть свой класс. Давайте как-нибудь обзовём Ваш.',
        img: loginBookImg,
        buttons: {
          nextButton: {
            available:
              formik.errors.classLabel !== undefined ||
              formik.values.classLabel === ''
                ? false
                : true,
            title: 'Дальше',
          },
          prevButton: {
            title: 'Назад',
          },
        },
        errors: [formik.errors.classLabel, formik.errors.classLabel].filter(
          (e) => e !== undefined
        ),
      },

      //Пятый шаг шаг: подтверждение регистрации
      {
        title: 'Подтверждение регистрации',
        description:
          'Осталось проверить правильность заполненных полей, и можно приступать к работе!',
        img: loginBookImg,
        buttons: {
          nextButton: {
            available: true,
            title: 'Дальше',
            handleClick: formik.handleSubmit,
            isLoading: isLoading,
          },
          prevButton: {
            title: 'Назад',
          },
        },
        errors: [formik.errors.name, formik.errors.surname].filter(
          (e) => e !== undefined
        ),
      },
    ],
    [
      formik.errors.classLabel,
      formik.errors.name,
      formik.errors.password,
      formik.errors.password_confirm,
      formik.errors.phone,
      formik.errors.surname,
      formik.handleSubmit,
      formik.values.classLabel,
      formik.values.name,
      formik.values.password,
      formik.values.password_confirm,
      formik.values.phone,
      formik.values.surname,
      isCheckPhoneLoading,
      isLoading,
      navigate,
    ]
  );

  const handleCheckPhone = useCallback(async () => {
    await formik.validateField('phone');
    if (formik.errors.phone === undefined && formik.values.phone !== '') {
      const result = await checkPhone({ phone: formik.values.phone });

      if ('data' in result && result.data.phoneExist) {
        formik.setFieldError(
          'phone',
          VALIDATION_ERRORS.PHONE.IS_ALREADY_EXISTS
        );
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

  // TODO: скорректировать обработку ошибок
  // useEffect(() => {
  //   if (isError && error && 'data' in error) {
  //     const errorData = error as FetchError;
  //     errorData.data.errorMessage === 'Invalid password'
  //       ? formik.setFieldError('password', VALIDATION_ERRORS.PASSWORD.WRONG)
  //       : formik.setFieldError(
  //           'password',
  //           VALIDATION_ERRORS.SERVER.UNTYPED_ERROR
  //         );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [error, isError]);

  return (
    <div className={styles.login}>
      <FormikContext.Provider value={formik}>
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
            <InputText
              name="password_confirm"
              label="Подтверждение пароля"
              placeholder="*****"
              type="password"
              onBlur={() => formik.validateField('password_confirm')}
            />
          </div>
          <div>
            <InputText
              name="name"
              label="Имя"
              placeholder="Иван"
              type="text"
              onBlur={() => formik.validateField('name')}
            />
            <InputText
              name="surname"
              label="Фамилия"
              placeholder="Иванов"
              type="text"
              onBlur={() => formik.validateField('surname')}
            />
          </div>
          <div>
            <InputText
              name="classLabel"
              label="Класс"
              placeholder="5А"
              type="text"
              onBlur={() => formik.validateField('classLabel')}
            />
            <AddKidsTable kids={kids} setKids={setKids} />
          </div>
          <div>Страница подтверждения</div>
        </UserSteps>
      </FormikContext.Provider>
    </div>
  );
};
