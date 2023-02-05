export type Attendance = {
  id: number;
  MemberId: number;
  type: 'in' | 'out';
  createdAt: string;
};

export type GetAttendanceResponse = Attendance[];
