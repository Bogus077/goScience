import { FormikContext, useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import {
  createKidInitialValues,
  createKidValidationSchema,
} from '../../../models/Validations/validations';
import { Layout } from '../../Layout';
import { EditForm } from '../../UI/EditForm';
import { Button } from '../../UI/Form/Button';
import { InputPhone } from '../../UI/Form/InputPhone';
import { InputText } from '../../UI/Form/InputText';
import formImg from '../../../assets/img/reading.png';
import styles from './CreateKid.module.scss';
import { SwitchBar } from '../../UI/SwitchBar';
import { Class } from '../../../models/Class/class';
import { useCreateKidMutation } from '../../../redux/GSApi';
import { useNavigate } from 'react-router-dom';
import { frontendRoutes } from '../../../utils/router/routes';
import { FetchError } from '../../../models/Api/errors';
import { PageLoader } from '../../UI/PageLoader';

type CreateKidTypes = {
  classes: Class[];
};

export const CreateKid = ({ classes }: CreateKidTypes) => {
  const navigate = useNavigate();
  const [activeClass, setActiveClass] = useState(classes[0].id);
  const [fetchError, setFetchError] = useState<string | undefined>(undefined);

  const [createKids, { isLoading: isCreateKidLoading, isError, error }] =
    useCreateKidMutation();

  const handleSubmit = useCallback(
    async (values: typeof createKidInitialValues) => {
      setFetchError(undefined);
      if (isCreateKidLoading) {
        return;
      }

      let newKid = {
        name: values.name,
        surname: values.surname,
        ClassId: activeClass,
      };

      if (values.phone) newKid = { ...newKid, ...{ phone: values.phone } };
      const result = await createKids([newKid]);

      if ('data' in result) {
        navigate(frontendRoutes.settings.class);
      }
    },
    [activeClass, createKids, isCreateKidLoading, navigate]
  );

  const formik = useFormik({
    initialValues: createKidInitialValues,
    validationSchema: createKidValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleBack = useCallback(() => {
    navigate(frontendRoutes.settings.class);
  }, [navigate]);

  useEffect(() => {
    if (isError && error && 'data' in error) {
      const errorData = error as FetchError;
      if (errorData.data.errorMessage === 'Телефон уже зарегистрирован') {
        formik.setFieldError('phone', errorData.data.errorMessage);
      } else {
        setFetchError(errorData.data.errorMessage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError]);

  return (
    <Layout>
      {isCreateKidLoading ? (
        <PageLoader />
      ) : (
        <EditForm title="Добавить ученика" img={formImg}>
          <FormikContext.Provider value={formik}>
            <div className={styles.form}>
              <div className={styles.form__class}>
                <SwitchBar
                  items={[
                    ...classes.map((group) => {
                      return {
                        label: group.label,
                        active: activeClass === group.id,
                        id: group.id,
                      };
                    }),
                  ]}
                  handleChangeActive={setActiveClass}
                />
              </div>
              <InputText name="name" placeholder="Иван" label="Имя" />
              <InputText name="surname" placeholder="Иванов" label="Фамилия" />
              <InputPhone
                name="phone"
                placeholder="+7 (___) ___ __ __"
                label="Номер телефона"
              />
              {fetchError && (
                <div className={styles.form__error}>{fetchError}</div>
              )}
              <Button label="Добавить" onClick={formik.handleSubmit} />
              <Button type="warning" label="Отменить" onClick={handleBack} />
            </div>
          </FormikContext.Provider>
        </EditForm>
      )}
    </Layout>
  );
};
