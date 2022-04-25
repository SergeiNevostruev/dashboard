import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainPage from '../../components/pages/MainPage';
import { GetUsersAction } from '../../store/users/actions';
import getUsers from '../../store/users/selectors';

const MainContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUsersAction());
  }, []);

  const userData = useSelector(getUsers);
  return <MainPage userData={userData} />;
};

export default MainContainer;
