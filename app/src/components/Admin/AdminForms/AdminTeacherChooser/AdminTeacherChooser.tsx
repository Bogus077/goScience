import { Button, Grid } from '@mui/material';
import React, { useCallback } from 'react';
import { useGetUsersQuery } from '../../../../redux/GSApi';
import { Loader } from '../../../UI/Loader';
import { User } from '../../../../models/User/user';

type AdminTeacherChooserTypes = {
  addedTeachers: number[];
  onTeachersListChange: (teachers: number[]) => void;
};

export const AdminTeacherChooser = ({
  addedTeachers,
  onTeachersListChange,
}: AdminTeacherChooserTypes) => {
  const { data, isLoading } = useGetUsersQuery('');
  const hiddenUsers = ['Администрация', 'Tester', 'Тамаров'];

  const isTeacherActive = useCallback(
    (teacher: User) => {
      return addedTeachers.includes(teacher.id);
    },
    [addedTeachers]
  );

  const handleChangeTeachers = useCallback(
    (teacher: User) => {
      if (isTeacherActive(teacher)) {
        onTeachersListChange(addedTeachers.filter((t) => t !== teacher.id));
      } else {
        onTeachersListChange([...addedTeachers, teacher.id]);
      }
    },
    [isTeacherActive, onTeachersListChange, addedTeachers]
  );

  return isLoading ? (
    <Loader />
  ) : (
    <Grid container spacing={1}>
      {data
        ?.filter((teacher) => !hiddenUsers.includes(teacher.surname))
        .map((teacher) => (
          <Grid item key={teacher.id}>
            <Button
              onClick={() => handleChangeTeachers(teacher)}
              variant={isTeacherActive(teacher) ? 'contained' : 'outlined'}
            >{`${teacher.surname} ${teacher.name}`}</Button>
          </Grid>
        ))}
    </Grid>
  );
};
