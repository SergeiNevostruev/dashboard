import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import AuthPage from '../../components/pages/AuthPage';
import AuthRegPage from '../../components/pages/AuthRegPage';
// import GetUserName from '../../store/auth/selectors';

const AuthContainer = () => {
  // const name = useSelector(GetUserName);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (name) {
  //     navigate('/');
  //   }
  // }, [name]);

  return <AuthRegPage />;
};

export default AuthContainer;
