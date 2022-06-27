import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import GetUserName from '../../../toolkit/auth/selectors';
import Button from '../Button';
import Logo from '../Logo';
import style from './Header.module.scss';
import SearchField from './SearchField';
import UserInput from './UserInput';
import UserProfile from './UserProfile';

const Header = () => {
  const name = useSelector(GetUserName);
  const navigate = useNavigate();
  const location = useLocation();
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
