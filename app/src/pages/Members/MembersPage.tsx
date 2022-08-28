import React, { useEffect } from 'react';
import { Members } from '../../components/Members';
import styles from './MembersPage.module.scss';
import { useMembers } from '../../hooks/useMembers';
import { useGetUserQuery } from '../../redux/GSApi';

export const MembersPage = () => {
  const { members, status, changeMemberStatus } = useMembers('members');
  const { isLoading } = useGetUserQuery('');

  useEffect(() => {
    document.title = 'Расход | GS';
  });

  return (
    <div className={styles.page}>
      <Members
        kids={members ?? []}
        isLoading={isLoading}
        changeMemberStatus={changeMemberStatus}
        connectionStatus={status}
      />
    </div>
  );
};
