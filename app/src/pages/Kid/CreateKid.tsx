import React from 'react';
import { CreateKid } from '../../components/Kid/CreateKid';
import { PageLoader } from '../../components/UI/PageLoader';
import { useGetUsersClassesQuery } from '../../redux/GSApi';

export const CreateKidPage = () => {
  const { data: classes, isLoading } = useGetUsersClassesQuery('');

  return !classes || isLoading ? (
    <PageLoader />
  ) : (
    <CreateKid classes={classes} />
  );
};
