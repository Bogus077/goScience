import { Role, User } from '../../models/User/user';

export const isUserAdmin = (user: User) => {
  const roles = user.Roles.map((role) => role.name);
  return roles.includes('admin');
};

export const isUserAdminOrHead = (user: User) => {
  const roles = user.Roles.map((role) => role.name);
  return roles.includes('admin') || roles.includes('head');
};

export const getUserRole = (role: Role) => {
  switch (role.name) {
    case 'officer':
      return 'Офицер';
    case 'admin':
      return 'Админ';
    case 'head':
      return 'Руководитель';
    default:
      return role.name;
  }
};
