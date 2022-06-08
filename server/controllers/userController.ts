import * as Hapi from '@hapi/hapi';
import crypto from 'crypto';
import { User } from '../entity/User';
import db from '../db';

type NewUserType = {
    firstName: string;
    lastName:string;
    email:string;
    password:string;
    rpassword:string;
    consent: boolean;
}

const hello: () => { msg: string;} = () => ({ msg: 'Hello Dashboard' });

const users: any = async () => {
  console.log('поиск пользователей');
  try {
    const data = await db.manager.find(User);
    console.log(data);

    return data;
  } catch (e) {
    console.log('ошибка ', e);
    return { error: JSON.stringify(e) };
  }
};

const newuser = async (request: Hapi.Request, reply: Hapi.ResponseApplicationState) => {
//   console.log('новый пользователь');
  const {
    firstName,
    lastName,
    email,
    password,
    rpassword,
    consent
  } = request.payload as NewUserType;
  if (!consent) return { e: true, message: 'Нужно принять пользовательское соглашение' };
  const changeEmail = await db.manager.findOneBy(User, { email });
  if (changeEmail) return { e: true, message: 'Такой email существует' };
  if (password !== rpassword) return { e: true, message: 'Повторный пароль введен не верно' };
  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.salt = crypto.randomBytes(16).toString('hex');
  user.hashpassword = crypto.pbkdf2Sync(
    password,
    user.salt,
    1000,
    64,
    'sha512'
  ).toString('hex');
  try {
    await db.manager.save(user);
    return { e: false, message: `Пользователь ${firstName} ${lastName} с почтой ${email} создан!` };
  } catch (e) {
    return { e: true, message: 'Ошибка сохранения пользователя в базе данных' };
  }
};

const validPassword = (password: string, salt: string, hash: string) => {
  const hashCheck = crypto.pbkdf2Sync(
    password,
    salt,
    1000,
    64,
    'sha512'
  ).toString('hex');
  return hashCheck === hash;
};

export default { hello, users, newuser, validPassword };
