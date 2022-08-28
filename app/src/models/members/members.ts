export type Member = {
  id: number;
  name: string;
  surname: string;
  sex: 'male' | 'female';
  plat: number;
  status: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GetMembersResponse = Member[];

export type ChangeMemberStatusRequest = {
  id: number;
  status: boolean;
};

export type ChangeMemberStatusResponse = Member[];
