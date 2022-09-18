import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Login } from '../components/User/Login';
import { isAuthorized } from '../redux/authSlice';
import { frontendRoutes } from '../utils/router/routes';

export const LoginPage = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(isAuthorized);
  useEffect(() => {
    if (isAuth) {
      navigate(frontendRoutes.members);
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    document.title = 'Вход | GS';
  });

  return <Login />;
};
