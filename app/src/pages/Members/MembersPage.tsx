import React, { useEffect, useState } from 'react';
import { Members } from '../../components/Members';
import styles from './MembersPage.module.scss';
import { useMembers } from '../../hooks/useMembers';
import { useGetUserQuery } from '../../redux/GSApi';
import { ConfirmModal } from '../../components/UI/ConfirmModal';
import { useParams } from 'react-router-dom';
import { MembersPrint } from '../../components/MembersPrint';

export const MembersPage = () => {
  const { members, status, changeMemberStatus, error } = useMembers('members');
  const [isModalOpen, setModalOpen] = useState<string | undefined>(error);
  const { isLoading } = useGetUserQuery('');
  const { version } = useParams();

  useEffect(() => setModalOpen(error), [error]);

  useEffect(() => {
    document.title = 'Расход | GS';
  });

  return (
    <div className={styles.page}>
      {version === 'print' ? (
        <MembersPrint kids={members ?? []} />
      ) : (
        <Members
          kids={members ?? []}
          isLoading={isLoading}
          changeMemberStatus={changeMemberStatus}
          connectionStatus={status}
        />
      )}
      <ConfirmModal
        isOpen={Boolean(isModalOpen)}
        titleText="Ошибка соединения"
        message={error ?? ''}
        type="negative"
        onAccept={() => {}}
        onReject={() => setModalOpen(undefined)}
      />
    </div>
  );
};
