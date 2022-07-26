import React, { useEffect } from 'react';
import { CreateKid } from '../../components/Kid/CreateKid';
import { PageLoader } from '../../components/UI/PageLoader';
import { useGetUsersClassesQuery } from '../../redux/GSApi';

export const CreateKidPage = () => {
  const { data: classes, isLoading } = useGetUsersClassesQuery('');
  useEffect(() => {
    document.title = 'Добавить ученика | GS';
  });

  return !classes || isLoading ? (
    <PageLoader />
  ) : (
    <CreateKid classes={classes} />
  );
};
