export const frontendRoutes = {
  admin: {
    mainPage: '/admin',
    members: '/admin/members',
    addMember: '/admin/addMember',
    editMember: '/admin/editMember',
  },
  kidWeekStats: '/stats',
  dashboard: '/dashboard',
  members: '/',
  membersPrint: '/print',
  plan: {
    index: '/plan',
    study: '/plan/study',
    motivation: '/plan/motivation',
    discipline: '/plan/discipline',
    team: '/plan/team',
    createTeam: '/plan/team/create',
    updateTeam: '/plan/team/update',
  },
  user: {
    login: '/login',
    registration: '/registration',
  },
  settings: {
    class: '/settings',
  },
  kid: {
    add: '/kid/add',
  },
  tasks: {
    add: '/task/add',
  },
  project: {
    add: '/project/add',
    edit: '/project/edit',
    addTask: '/project/createTask',
    editTask: '/project/updateTask',
  },
};
