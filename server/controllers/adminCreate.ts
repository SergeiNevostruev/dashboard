import Boom from '@hapi/boom';
import crypto from 'crypto';
import db from '../db';
import { User, UserRole } from '../entity/User';

export const adminCreate = async () => {
  console.log('создание админа');

  const adminName = process.env.ADMIN_NAME;
  const adminSurname = process.env.ADMIN_SURNAME;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  const changeEmail = await db.manager.findOneBy(User, { email: adminEmail }).catch(() => Boom.internal('Ошибка сохранения в базе данных'));
  if (changeEmail) {
    console.log('Админ уже создан ранее');
    return { e: true, message: 'Администратор уже создан ранее' };
  }
  const user = new User();
  user.firstName = adminName;
  user.lastName = adminSurname;
  user.role = UserRole.ADMIN;
  user.email = adminEmail;
  user.salt = crypto.randomBytes(16).toString('hex');
  user.hashpassword = crypto.pbkdf2Sync(
    adminPassword,
    user.salt,
    1000,
    64,
    'sha512'
  ).toString('hex');
  try {
    await db.manager.save(user);
    console.log(`Администратор создан ==> ${adminEmail}`);
    return true;
  } catch (e) {
    return false;
  }
};
