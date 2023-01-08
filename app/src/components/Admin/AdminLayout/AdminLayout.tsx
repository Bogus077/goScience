import React, { ReactElement } from 'react';
import styles from './AdminLayout.module.scss';

type AdminLayoutTypes = {
  children: ReactElement | ReactElement[];
};

export const AdminLayout = ({ children }: AdminLayoutTypes) => {
  return <>AdminLayout</>;
};
