import { Navigate, Outlet } from 'react-router-dom';
import { useTypedSelector } from '../../redux';
import { isAuthorized } from '../../redux/userSlice';

export const ProtectedRoutes = () => {
  const isUserAuthorized = useTypedSelector(isAuthorized);

  return isUserAuthorized ? <Outlet /> : <Navigate to={'/'} />;
};
