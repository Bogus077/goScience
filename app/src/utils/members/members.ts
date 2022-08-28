import { Member } from '../../models/members/members';

export const getPlat = (kids: Member[], plat: number) => {
  return kids.filter((kid) => kid.plat === plat);
};

export const sortBySurname = (a: Member, b: Member) => {
  if (a.surname > b.surname) {
    return 1;
  } else if (b.surname > a.surname) {
    return -1;
  } else {
    if (a.name > b.name) {
      return 1;
    } else if (b.name > a.name) {
      return -1;
    } else {
      return 0;
    }
  }
};
