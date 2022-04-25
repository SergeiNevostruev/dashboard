/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import GetUserName from '../../store/auth/selectors';

const AuthHOC: React.FC = ({ children }) => {
  const isAuth = useSelector(GetUserName);
  if (isAuth) {
    return <>{children}</>;
  }

  return <Navigate to="/auth" />;
};

export default AuthHOC;
