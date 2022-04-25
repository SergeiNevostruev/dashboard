import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import AuthPage from '../../components/pages/AuthPage';
import RecoveryPassPage from '../../components/pages/RecoveryPassPage';
// import GetUserName from '../../store/auth/selectors';

const RecoveryPassContainer = () => {
  // const name = useSelector(GetUserName);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (name) {
  //     navigate('/');
  //   }
  // }, [name]);

  return <RecoveryPassPage />;
};

export default RecoveryPassContainer;
