import React from 'react';
import styles from './MembersPage.module.scss';
import { useGetUserQuery } from '../../redux/GSApi';
import { Loader } from '../../components/UI/Loader';
import { MembersPage } from './MembersPage';

export function MembersPageWrapper() {
  const { data: user, isLoading } = useGetUserQuery('');

  return isLoading ? (
    <div className={styles.wrapper}>
      <Loader />
    </div>
  ) : (
    <MembersPage />
  );
}
