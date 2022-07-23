import { FormikContext, useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Kid } from '../../../../../models/Kid/kid';
import { IconCheck } from '../../../Icons/Forms/IconCheck';
import { IconCross } from '../../../Icons/Forms/IconCross';
import { InputText } from '../../InputText';
import styles from './AddKidsTableRow.module.scss';

type AddKidsTableRowTypes = {
  kids: Kid[];
  index: number;
  setKids: React.Dispatch<React.SetStateAction<Kid[]>>;
};

export const AddKidsTableRow = ({
  kids,
  index,
  setKids,
}: AddKidsTableRowTypes) => {
  const kid = kids[index];
  const formik = useFormik({
    initialValues: kid,
    onSubmit: () => {},
  });

  useEffect(() => {
    if (
      formik.values.name !== '' &&
      formik.values.surname !== '' &&
      (kid.name !== formik.values.name || kid.surname !== formik.values.surname)
    ) {
      const prevKids = kids.filter((_, i) => i < index);
      const nextKids = kids.filter((_, i) => i > index);
      setKids([...prevKids, formik.values, ...nextKids]);
    }
  }, [
    formik.values,
    formik.values.name,
    formik.values.surname,
    index,
    kid.name,
    kid.surname,
    kids,
    setKids,
  ]);

  const isValid = formik.values.name !== '' && formik.values.surname !== '';

  return (
    <FormikContext.Provider value={formik}>
      <div className={styles.row}>
        <div className={styles.col}>{index + 1}</div>
        <div className={styles.col}>
          <InputText name="name" placeholder="Имя" onBlur={() => {}} />
        </div>
        <div className={styles.col}>
          <InputText name="surname" placeholder="Фамилия" onBlur={() => {}} />
        </div>
        {isValid ? <IconCheck /> : <IconCross />}
      </div>
    </FormikContext.Provider>
  );
};
