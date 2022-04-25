import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../common/Button';
import Form from '../../common/Form';
import Checkbox from '../../common/Form/Checkbox';
import Input from '../../common/Form/Input';
import style from './RegistrationPage.module.scss';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [consent, setConsent] = useState(false);

  return (
    <Form title="Регистрация">
      <Input title="Name" id="name" placeholder="Имя" value={name} setValue={setName} />
      <Input
        title="Surname"
        id="surname"
        placeholder="Фамилия"
        value={surname}
        setValue={setSurname}
      />
      <Input title="Email" id="email" placeholder="Email" value={email} setValue={setEmail} />
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
      <Button title="Регистрация" onClick={() => console.log('registration')} size="x" />
      <Checkbox value={consent} setValue={setConsent} className={style.consent}>
        <p>
          Принимаю условия{' '}
          <Link to="/consent" className={style.link}>
            Пользовательского соглашения
          </Link>
        </p>
      </Checkbox>
    </Form>
  );
};

export default RegistrationPage;
