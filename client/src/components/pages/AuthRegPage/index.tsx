import { useState } from 'react';
import AuthPage from '../AuthPage';
import RegistrationPage from '../RegistrationPage';
import style from './AuthRegPage.module.scss';

const AuthRegPage = () => {
  const [auth, setAuth] = useState('');
  const [reg, setReg] = useState(style.active);
  const isActiveReg = () => {
    setReg(style.active);
    setAuth('');
  };
  const isActiveAuth = () => {
    setAuth(style.active);
    setReg('');
  };

  return (
    <div className={style.card}>
      <h1>Hello, world!</h1>
      {reg && <p>Создайте аккаунт</p>}
      {auth && <p>Пройдите авторизацию</p>}
      <div className={style.cardtoogle}>
        <span onClick={isActiveReg} className={reg}>
          Регистрация
        </span>
        <span onClick={isActiveAuth} className={auth}>
          Авторизация
        </span>
      </div>
      {!reg ? <AuthPage /> : <RegistrationPage />}
    </div>
  );
};

export default AuthRegPage;
