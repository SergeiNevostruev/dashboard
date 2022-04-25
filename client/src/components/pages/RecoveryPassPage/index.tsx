import Form from '../../common/Form';
import Input from '../../common/Form/Input';
import { useState } from 'react';
import Button from '../../common/Button';
import style from './RecoveryPassPage.module.scss';
import { Link } from 'react-router-dom';

const RecoveryPassPage = () => {
  const [activeStyle, setActiveStyle] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const isActive = () => {
    setActiveStyle(true);
  };
  const isChangePass = () => {
    console.log('Произошла смена пароля');
    setChangePass(true);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  return (
    <div className={style.card}>
      <h1>Восстановление пароля</h1>
      <div className={style.steps}>
        <div className={style.active}>
          <span className={`${style.number} ${style.activenumber}`}>1</span>
          <span>Проверка почты</span>
        </div>
        <div className={`${activeStyle && style.active}`}>
          <span className={`${style.number} ${activeStyle && style.activenumber}`}>2</span>
          <span>Восстановление пароля</span>
        </div>
      </div>
      {!activeStyle ? (
        <Form title="Авторизация">
          <Input
            title="Email"
            id="email"
            placeholder="Введите email"
            value={email}
            setValue={setEmail}
          />
          <Button title="Выслать ссылку" onClick={isActive} size="x" />
        </Form>
      ) : (
        <Form title="Смена пароля">
          <Input
            title="Password"
            id="password"
            placeholder="Пароль"
            value={password}
            setValue={setPassword}
          />
          <Input
            title="Repeat Password"
            id="repeatPassword"
            placeholder="Повторите пароль"
            value={repeatPassword}
            setValue={setRepeatPassword}
          />
          <Button title="Подтвердить" onClick={isChangePass} size="x" />
        </Form>
      )}
      {!activeStyle && (
        <p className={style.consent}>
          Выполняя вход в сервис, вы подтверждаете, что ознакомились с документами{' '}
          <Link to="/consent" className={style.link}>
            «политика конфидициальности»
          </Link>
          ,{' '}
          <Link to="/consent" className={style.link}>
            «согласие на обработку персональных данных»
          </Link>{' '}
          и{' '}
          <Link to="/consent" className={style.link}>
            «пользовательское соглашение»
          </Link>{' '}
          и согласны с ними.
        </p>
      )}
      {changePass && <p className={style.consent}>Пароль был изменен</p>}
    </div>
  );
};

export default RecoveryPassPage;
