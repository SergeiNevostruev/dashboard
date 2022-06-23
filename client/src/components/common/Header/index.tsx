import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ClearUserNameAction } from '../../../store/auth/actions';
import GetUserName from '../../../store/auth/selectors';
import Button from '../Button';
import Logo from '../Logo';
import style from './Header.module.scss';
import SearchField from './SearchField';
import UserInput from './UserInput';
import UserProfile from './UserProfile';

const Header = () => {
  const name = useSelector(GetUserName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // useEffect(() => {
  //   console.log('отрисовка ', location.pathname.split('/'));
  // });
  // const [auth, setAuth] = useState(false);
  // const isAuth = () => {
  //   setAuth(true);
  // };
  // const outAuth = () => {
  //   setAuth(false);
  // };
  return (
    <header className={style.header}>
      <div className={`${style.header} ${style.container}`}>
        <Logo />
        {location.pathname.split('/')[1] !== 'admin' && (
          <>
            {' '}
            <SearchField />
            <Button
              title="Подать объявление"
              onClick={() => {
                console.log('подать объявление');
                navigate('admin/edit/new');
              }}
              type="orange"
            />
          </>
        )}

        {name ? <UserProfile /> : <UserInput />}
      </div>
    </header>
  );
};

export default Header;
