import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminPage from '../../components/pages/AdminPage';
import MainPage from '../../components/pages/MainPage';
import { GetUsersAction } from '../../store/users/actions';
import getUsers from '../../store/users/selectors';

const AdminContainer = () => {
  return <AdminPage admin={true} count={26} />;
};

export default AdminContainer;
