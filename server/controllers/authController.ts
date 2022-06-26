import * as Jwt from '@hapi/jwt';
import * as Hapi from '@hapi/hapi';
import db from '../db';
import { User, UserRole } from '../entity/User';
import { validPassword } from './helpers';
import config from '../config/config.json';

type UserType = {
    email: string;
    password: string;
}

const auth = async (request: Hapi.Request, reply: Hapi.ResponseApplicationState) => {
  const user = request.payload as UserType;
  const dbuser = await db.manager.findOneBy(User, { email: user.email });
  if (!dbuser) return { e: true, message: 'Некорректные данные о пользователе' };
  const checkUser = validPassword(user.password, dbuser.salt, dbuser.hashpassword);
  if (!checkUser) return { e: true, message: 'Некорректные данные о пользователе' };
  let scope: UserRole;
  if (dbuser.role === UserRole.ADMIN) { scope = UserRole.ADMIN; } else {
    scope = UserRole.User;
  }
  const token = Jwt
    .token
    .generate({
    //   aud: 'urn:audience:test', iss: 'urn:issuer:test', test: 'ok'
      uuid: dbuser.uuid,
      scope,
      aud: 'urn:audience:test',
      iss: 'urn:issuer:test',
      //   test: 'ok',
      //   maxAgeSec: 14400, // 4 hours
      //   timeSkewSec: 15
    }, config.token);

  dbuser.token = { t: token, expires_at: '4h' };
  //   console.log(Jwt.token.decode(token));

  try {
    await db.manager.save(dbuser);
    const result: any = {
      e: false,
      message: 'Авторизация успешна',
      token,
      firstName: dbuser.firstName,
      lastName: dbuser.lastName,
    };
    if (scope === UserRole.ADMIN) result.scope = scope;
    console.log(result.scope);

    return result;
  } catch (e) {
    return { e: true, message: 'Ошибка сохранения объявления в базе данных' };
  }
};

// недоделано
const validate = async (
  artifacts: any,
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) => {
  const { uuid, scope } = artifacts.decoded.payload;
  const user = await db.manager.findOneBy(User, { uuid });
  if (!user || user.token.t !== artifacts.token) {
    return {
    //   scope: [scope],
      isValid: false,
      credentials: { e: true, message: 'Неверные логин или пароль' }
    };
  }

  return {
    isValid: true,
    credentials: { scope, uuid },
  };
};
export default { auth, validate };
