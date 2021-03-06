import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainContainer from './containers/MainContainer';
import RegistrationContainer from './containers/RegistrationContainer';
import AuthContainer from './containers/AuthContainer';
import PageWrapper from './components/common/PageWrapper';
// import AuthHOC from './components/HOC/AuthHoc';
import RecoveryPassContainer from './containers/RecoveryPassContainer';
import Page404 from './components/pages/Page404';
import ProductViewContainer from './containers/ProductViewContainer';
import SearchContainer from './containers/SearchContainer';
import AdminContainer from './containers/AdminContainer';
import Profile from './components/pages/Profile';
import { openNotification } from './components/common/StudyModal';

const App = () => {
  console.log('APP => start');

  useEffect(() => {
    openNotification();
    console.log('APP - MOUNT');
  }, []);
  return (
    <Routes>
      <Route path="/" element={<PageWrapper />}>
        <Route index element={<MainContainer />} />
        <Route path="auth" element={<AuthContainer />} />
        <Route path="reg" element={<RegistrationContainer />} />
        <Route path="recoverypass" element={<RecoveryPassContainer />} />
        <Route path="admin" element={<AdminContainer />} />
        <Route path="admin/edit/:id" element={<AdminContainer />} />
        <Route path="ads" element={<h1>Мои объявления</h1>} />
        <Route path="profile" element={<Profile />} />
        <Route path="cardproduct/:id" element={<ProductViewContainer />} />
        <Route path="search" element={<SearchContainer />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default App;
