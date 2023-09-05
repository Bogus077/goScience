type MemberContacts = {
  id: number;
  name?: string;
  phone?: string;
  address?: string;
};

export type Member = {
  id: number;
  name: string;
  surname: string;
  dob?: Date;
  sex: 'male' | 'female';
  plat: number;
  status: boolean;
  email: string;
  password: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  MemberContacts: MemberContacts[];
};

export type GetMembersResponse = Member[];
export type GetMemberResponse = Member;

export type AddMemberRequest = {
  name: string;
  surname: string;
  plat: number;
  sex: string;
};

export type AddMemberResponse = Member;

export type EditMemberRequest = {
  id: number;
  name: string;
  surname: string;
  plat: number;
  sex: string;
};

export type EditMemberResponse = Member;

export type RemoveMemberRequest = {
  id: number;
};

export type ChangeMemberStatusRequest = {
  id: number;
  status: boolean;
};

export type ChangeMemberStatusResponse = Member[];
