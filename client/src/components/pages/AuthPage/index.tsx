import { message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PostRequest from '../../../network';
import { SetUserNameAction } from '../../../toolkit/auth/auth';
import Button from '../../common/Button';
import Form from '../../common/Form';
import Input from '../../common/Form/Input';
import style from './AuthPage.module.scss';

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  // const submitHandler = useCallback(() => {
  //   if (password.length > 10) {
  //     setHasError(false);
  //     dispatch(SetUserNameAction(name));
  //     console.log({ name, password });
  //   } else {
  //     setHasError(true);
  //     console.log('Error');
  //   }
  // }, [name, password]);

  const submitHandler = async () => {
    interface DataType {
      e: boolean;
      message: string;
      token?: string;
      firstName?: string;
      lastName?: string;
    }
    console.log('запрос данных');

    const data: DataType = await PostRequest({ url: '/api/auth', method: 'POST', data: { email, password } });
    data.e ? message.warning(data.message) : message.success(data.message);
    if (data && !data.e) {
      dispatch(
        SetUserNameAction({
          name: data.firstName,
          token: data.token,
          firstName: data.firstName,
          lastName: data.lastName,
        })
      );
      navigate('/');
    }
  };

  // useEffect(() => {
  //   if (password.length > 10) {
  //     setHasError(false);
  //   } else if (password.length > 0) {
  //     setHasError(true);
  //   }
  // }, [password]);

  return (
    <Form title="Авторизация">
      <Input title="Email" id="email" placeholder="Введите почту" value={email} setValue={setEmail} />
      <Input
        title="Password"
        id="password"
        placeholder="Введите пароль"
        value={password}
        setValue={setPassword}
        type="password"
      />
      {hasError && (
        <div>
          <span>Пароль должден быть больше 10 символов</span>
        </div>
      )}
      <Link to="/recoverypass" className={style.recovery}>
        Забыли пароль?
      </Link>

      <Button title="Войти" onClick={submitHandler} size="x" />
    </Form>
  );
};

export default AuthPage;
