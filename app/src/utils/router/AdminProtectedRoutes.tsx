import { Navigate, Outlet } from 'react-router-dom';
import { useGetUserQuery } from '../../redux/GSApi';
import styles from '../../components/Layout/Layout.module.scss';
import { PageLoader } from '../../components/UI/PageLoader';

export const AdminProtectedRoutes = () => {
  const { data, isLoading } = useGetUserQuery('');
  const isAdmin = Boolean(data?.Roles.find((role) => role.name === 'admin'));
  const isOfficer = Boolean(
    data?.Roles.find((role) => role.name === 'officer')
  );

  return !data || isLoading ? (
    <div className={styles.layout}>
      <PageLoader />
    </div>
  ) : isAdmin || isOfficer ? (
    <Outlet />
  ) : (
    <Navigate to={'/'} />
  );
};
