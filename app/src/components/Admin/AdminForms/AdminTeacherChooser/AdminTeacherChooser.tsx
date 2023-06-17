import { Button, Grid } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { Teacher } from '../../../../models/Teacher/teacher';
import { useGetTeachersQuery } from '../../../../redux/GSApi';
import { Loader } from '../../../UI/Loader';

type AdminTeacherChooserTypes = {
  addedTeachers?: number[];
};

export const AdminTeacherChooser = ({
  addedTeachers,
}: AdminTeacherChooserTypes) => {
  const { data, isLoading } = useGetTeachersQuery('');
  const [teachers, setTeachers] = useState(addedTeachers ?? []);

  const isTeacherActive = useCallback(
    (teacher: Teacher) => {
      return teachers.includes(teacher.id);
    },
    [teachers]
  );

  const handleChangeTeachers = useCallback(
    (teacher: Teacher) => {
      if (isTeacherActive(teacher)) {
        setTeachers(teachers.filter((t) => t !== teacher.id));
      } else {
        setTeachers([...teachers, teacher.id]);
      }
    },
    [isTeacherActive, teachers]
  );

  return isLoading ? (
    <Loader />
  ) : (
    <Grid container direction="column">
      {data?.map((teacher) => (
        <Button
          onClick={() => handleChangeTeachers(teacher)}
          variant={isTeacherActive(teacher) ? 'contained' : 'outlined'}
          key={teacher.id}
        >{`${teacher.surname} ${teacher.name} ${teacher.middlename}`}</Button>
      ))}
    </Grid>
  );
};
