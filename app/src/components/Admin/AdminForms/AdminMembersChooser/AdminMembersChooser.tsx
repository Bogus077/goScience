import React, { useCallback } from 'react';
import { Member } from '../../../../models/members/members';
import { useGetMembersQuery } from '../../../../redux/GSApi';
import { Loader } from '../../../UI/Loader';
import Grid from '@mui/material/Grid';
import { getPlat } from '../../../../utils/members/members';
import { AdminMembersChooserPlat } from './AdminMembersChooserPlat';

type AdminMembersChooserTypes = {
  addedMembers: number[];
  onMembersListChange: (members: number[]) => void;
};

export const AdminMembersChooser = ({
  addedMembers,
  onMembersListChange,
}: AdminMembersChooserTypes) => {
  const { data: members, isLoading } = useGetMembersQuery('');

  const isMemberActive = useCallback(
    (member: Member) => {
      return addedMembers.includes(member.id);
    },
    [addedMembers]
  );

  const handleChangeMembers = useCallback(
    (member: Member) => {
      if (isMemberActive(member)) {
        onMembersListChange(addedMembers.filter((t) => t !== member.id));
      } else {
        onMembersListChange([...addedMembers, member.id]);
      }
    },
    [isMemberActive, onMembersListChange, addedMembers]
  );

  const plats = [
    getPlat(members ?? [], 1),
    getPlat(members ?? [], 2),
    getPlat(members ?? [], 3),
    getPlat(members ?? [], 4),
    getPlat(members ?? [], 5),
  ];

  return isLoading ? (
    <Loader />
  ) : (
    <Grid container spacing={3}>
      {plats.map((plat, key) => (
        <Grid item key={key} xs>
          <AdminMembersChooserPlat
            plat={key + 1}
            members={plat}
            isMemberActive={isMemberActive}
            handleChangeMembers={handleChangeMembers}
          />
        </Grid>
      ))}
    </Grid>
  );
};
