import React, { useEffect } from 'react';
import { ClassSettings } from '../components/ClassSettings';
import { Layout } from '../components/Layout';
import { PageLoader } from '../components/UI/PageLoader';
import { useGetUsersClassesQuery } from '../redux/GSApi';

export const ClassSettingsPage = () => {
  const { data, isLoading } = useGetUsersClassesQuery('');
  useEffect(() => {
    document.title = 'Настройки класса | GS';
  });

  return (
    <Layout>
      {!data || isLoading ? <PageLoader /> : <ClassSettings classes={data} />}
    </Layout>
  );
};
