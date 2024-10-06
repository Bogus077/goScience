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

export const sortByPosition = (a: Member, b: Member) => {
  if (a.position && b.position) {
    return a.position > b.position ? 1 : -1;
  } else if (a.position || b.position) {
    return a.position ? 1 : -1;
  } else {
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
  }
};

export const sortByDate = (a: Date, b: Date) => {
  if (a > b) {
    return 1;
  } else if (b > a) {
    return -1;
  } else {
    return 0;
  }
};
