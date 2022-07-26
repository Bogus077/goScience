import React, { useCallback, useEffect, useState } from 'react';
import { FormikContext, useFormik } from 'formik';
import { Kid } from '../../../../models/Kid/kid';
import { editKidValidationSchema } from '../../../../models/Validations/validations';
import { InputPhone } from '../../../UI/Form/InputPhone';
import { InputText } from '../../../UI/Form/InputText';
import { IconCheck } from '../../../UI/Icons/Forms/IconCheck';
import { IconCross } from '../../../UI/Icons/Forms/IconCross';
import classNames from 'classnames/bind';
import styles from './ClassSettingRow.module.scss';
import {
  useRemoveKidMutation,
  useUpdateKidMutation,
} from '../../../../redux/GSApi';
import { Loader } from '../../../UI/Loader';
import { ConfirmModal } from '../../../UI/ConfirmModal';
const cx = classNames.bind(styles);

type ClassSettingRowTypes = {
  kid: Kid;
};

export const ClassSettingRow = ({ kid }: ClassSettingRowTypes) => {
  const [isEdited, setIsEdited] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const [updateKid, { isLoading }] = useUpdateKidMutation();
  const [removeKid, { isLoading: isRemoveLoading }] = useRemoveKidMutation();

  const initialValues = {
    name: kid.name,
    surname: kid.surname,
    phone: kid.phone ?? '',
  };

  const handleSubmit = useCallback(
    async (values: typeof initialValues) => {
      if (isLoading) {
        return;
      }

      let updatingKid = {
        id: kid.id ?? 999999,
        name: values.name,
        surname: values.surname,
      };

      if (values.phone) {
        updatingKid = { ...updatingKid, ...{ phone: values.phone } };
      }

      await updateKid(updatingKid);
    },
    [isLoading, kid.id, updateKid]
  );

  const handleRemove = useCallback(async () => {
    if (isRemoveLoading) return;
    await removeKid({ id: kid.id ?? 999999 });
    setModalOpen(false);
  }, [isRemoveLoading, kid.id, removeKid]);

  const formik = useFormik({
    initialValues,
    validationSchema: editKidValidationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const edited = !(
      kid.name === formik.values.name &&
      kid.surname === formik.values.surname &&
      (kid.phone ?? '') === formik.values.phone
    );

    if (edited !== isEdited) setIsEdited(edited);
  }, [
    formik.values.name,
    formik.values.phone,
    formik.values.surname,
    isEdited,
    kid.name,
    kid.phone,
    kid.surname,
  ]);

  return (
    <div className={styles.row}>
      <FormikContext.Provider value={formik}>
        <div className={styles.col}>
          <InputText name="name" placeholder="Имя" disabled={isLoading} />
        </div>
        <div className={styles.col}>
          <InputText
            name="surname"
            placeholder="Фамилия"
            disabled={isLoading}
          />
        </div>
        <div className={styles.col}>
          <InputPhone
            name="phone"
            placeholder="+7 (___) ___ __ __"
            disabled={isLoading}
          />
        </div>
        {isLoading ? (
          <div className={cx('col', 'col__button')}>
            <Loader />
          </div>
        ) : (
          <div
            className={cx('col', 'col__button', {
              col_disabled:
                !isEdited ||
                formik.errors.name ||
                formik.errors.surname ||
                formik.errors.phone,
            })}
            onClick={() => {
              !isEdited ||
              formik.errors.name ||
              formik.errors.surname ||
              formik.errors.phone
                ? // eslint-disable-next-line no-console
                  console.log('error')
                : formik.handleSubmit();
            }}
          >
            <IconCheck
              disabled={Boolean(
                !isEdited ||
                  formik.errors.name ||
                  formik.errors.surname ||
                  formik.errors.phone
              )}
            />
            <span className={styles.col__do}>
              {isEdited ? 'Сохранить' : 'Сохранено'}
            </span>
          </div>
        )}
        {isRemoveLoading ? (
          <Loader />
        ) : (
          <div
            className={cx('col', 'col__button')}
            onClick={() => setModalOpen(true)}
          >
            <IconCross />
            <span className={styles.col__do}>Удалить</span>
          </div>
        )}
      </FormikContext.Provider>
      <ConfirmModal
        isOpen={isModalOpen}
        titleText="Удалить ученика"
        message={`Вы действительно хотите удалить ученика: ${kid.name} ${kid.surname}? Это действие необратимо.`}
        type="negative"
        acceptText="Удалить"
        rejectText="Отменить"
        onAccept={handleRemove}
        onReject={() => setModalOpen(false)}
      />
    </div>
  );
};
