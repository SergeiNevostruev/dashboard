import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import style from './PageWrapper.module.scss';

const PageWrapper = () => (
  <div className={style.page_wrapper}>
    <Header />
    <main className={style.content}>
      <div className={`${style.container}`}>
        <Outlet />
      </div>
    </main>
    <Footer />
  </div>
);

export default PageWrapper;
