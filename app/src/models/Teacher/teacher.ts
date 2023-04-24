export type Teacher = {
  id: number;
  name: string;
  surname: string;
  middlename: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

export type GetTeachersResponse = Teacher[];
export type RemoveTeacherRequest = { id: number };

export type AddTeacherRequest = Pick<
  Teacher,
  'name' | 'surname' | 'middlename' | 'phone'
>;
export type AddTeachersResponse = Teacher;

export type EditTeacherRequest = AddTeacherRequest & { id: number };
export type EditTeacherResponse = Teacher;
