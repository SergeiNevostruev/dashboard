import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminPage from '../../components/pages/AdminPage';
import MainPage from '../../components/pages/MainPage';
import { GetUsersAction } from '../../store/users/actions';
import getUsers from '../../store/users/selectors';

const fakeData = [
  {
    id: 1,
    title: 'Стиральная машина',
    category: 'Для дома',
    date: '12 апреля 2022',
    published: 'Да',
  },
  {
    id: 2,
    title: 'Стиральная машина',
    category: 'Для дома',
    date: '12 апреля 2022',
    published: 'Да',
  },
  {
    id: 3,
    title: 'Стиральная машина',
    category: 'Для дома',
    date: '12 апреля 2022',
    published: 'Да',
  },
  {
    id: 4,
    title: 'Стиральная машина',
    category: 'Для дома',
    date: '12 апреля 2022',
    published: 'Да',
  },
];

const AdminContainer = () => {
  return <AdminPage admin={true} count={26} data={{ data: fakeData }} />;
};

export default AdminContainer;
