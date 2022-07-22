import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Registration } from '../components/User/Registration';
import { isAuthorized } from '../redux/authSlice';
import { frontendRoutes } from '../utils/router/routes';

export const RegistrationPage = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(isAuthorized);
  useEffect(() => {
    if (isAuth) {
      navigate(frontendRoutes.dashboard);
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    document.title = 'Регистрация | GS';
  });

  return <Registration />;
};
