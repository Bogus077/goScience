import { FormikContext, useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Kid } from '../../models/Kid/kid';
import { Team } from '../../models/Teams/teams';
import {
  createTeamInitialValues,
  createTeamValidationSchema,
} from '../../models/Validations/validations';
import { useUpdateTeamMutation } from '../../redux/GSApi';
import { frontendRoutes } from '../../utils/router/routes';
import { Button } from '../UI/Form/Button';
import { InputText } from '../UI/Form/InputText';
import { KidChooser } from '../UI/KidChooser';
import { Loader } from '../UI/Loader';
import styles from './UpdateTeam.module.scss';

type UpdateTeamTypes = {
  kids: Kid[];
  team: Team;
};

export const UpdateTeam = ({ kids, team }: UpdateTeamTypes) => {
  const navigate = useNavigate();
  const [activeKids, setActiveKids] = useState<number[]>(
    team.Kids.map((kid) => kid.id ?? 0)
  );
  //TODO обработка ошибок
  const [errors] = useState<string[]>([]);

  const [updateTeam, { isLoading }] = useUpdateTeamMutation();

  const handleSubmit = useCallback(
    async (values: typeof createTeamInitialValues) => {
      const newTeam = {
        ...values,
        kids: activeKids,
        id: team.id,
      };
      const result = await updateTeam(newTeam);
      if ('data' in result) {
        navigate(frontendRoutes.plan.team);
      }
    },
    [activeKids, navigate, team.id, updateTeam]
  );

  const formik = useFormik({
    initialValues: { ...createTeamInitialValues, label: team.label },
    validationSchema: createTeamValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleBack = useCallback(() => {
    navigate(frontendRoutes.plan.team);
  }, [navigate]);

  return (
    <FormikContext.Provider value={formik}>
      <div className={styles.form}>
        <div className={styles.form__header}>Изменить команду</div>

        <div className={styles.form__content}>
          <InputText
            name="label"
            placeholder="Команда 1"
            label="Название команды"
          />
        </div>
        <div className={styles.form__content}>
          <KidChooser
            kids={kids}
            active={activeKids}
            setActive={setActiveKids}
            type="multiple"
          />
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.form__navigate}>
            {errors.length > 0 &&
              errors.map((error, key) => (
                <div className={styles.form__error} key={key}>
                  {error}
                </div>
              ))}
            {activeKids.length > 0 && (
              <Button
                type="submit"
                label="Сохранить"
                onClick={formik.handleSubmit}
              />
            )}
            <Button type="warning" label="Отменить" onClick={handleBack} />
          </div>
        )}
      </div>
    </FormikContext.Provider>
  );
};
