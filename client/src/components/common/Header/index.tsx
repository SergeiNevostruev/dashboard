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
  useEffect(() => {
    console.log('отрисовка ', location.pathname.split('/'));
  });
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
        {/* <h1>Header</h1>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active_link : style.not_active_link)}
            to="/">
            MAIN
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active_link : style.not_active_link)}
            to="/users">
            USERS
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active_link : style.not_active_link)}
            to="/auth">
            AUTH
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? style.active_link : style.not_active_link)}
            to="/reg">
            REG
          </NavLink>
        </li>
      </ul>
      <div className={style.user_info}>
        {name ? (
          <>
            <h2>{name}</h2>
            <Button title="LOG_OUT" onClick={() => dispatch(ClearUserNameAction())} />
          </>
        ) : (
          'NO_AUTH'
        )}
      </div> */}
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
