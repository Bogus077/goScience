export type Teacher = {
  id: number;
  name: string;
  surname: string;
  middleName: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

export type GetTeachersResponse = Teacher[];
export type RemoveTeacherRequest = { id: number };

export type AddTeacherRequest = Pick<
  Teacher,
  'name' | 'surname' | 'middleName' | 'phone'
>;
export type AddTeachersResponse = Teacher;

export type EditTeacherRequest = AddTeacherRequest & { id: number };
export type EditTeacherResponse = Teacher;
export type ChangeTeacherPasswordRequest = { password: string; phone: string };
export type ClearTeacherPasswordRequest = { phone: string };
