import React from 'react';
import SearchPage from '../../components/pages/SearchPage';
import fakeData from './fakedata';

const AuthContainer = () => {
  return <SearchPage data={fakeData.data} count={fakeData.count} />;
};

export default AuthContainer;
