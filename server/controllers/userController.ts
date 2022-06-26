import * as Hapi from '@hapi/hapi';
import crypto from 'crypto';
import Boom from '@hapi/boom';
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

const hello: any = (req: any, h: Hapi.ResponseToolkit) => ({ msg: 'Hello Dashboard', ip: req.location });

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

const newuser = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
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
  const changeEmail = await db.manager.findOneBy(User, { email }).catch(() => Boom.internal('Ошибка сохранения в базе данных'));
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

export default { hello, users, newuser };
