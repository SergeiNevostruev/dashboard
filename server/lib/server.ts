// import hapi
import * as Hapi from '@hapi/hapi';
// import { Server, ResponseToolkit, Request } from 'hapi';
import 'colors';
import { get } from 'node-emoji';
import plugins from './plugins';
import userRoute from '../routes/userRoute';
import productRoute from '../routes/productRoute';
import authController from '../controllers/authController';
import config from '../config/config.json';

// server
// =====================================================================================

const init = async (): Promise<void> => {
  const server = Hapi.server({
    port: 8080,
    host: 'localhost',
  });

  await server.register(plugins);

  server.auth.strategy('auth', 'jwt', {
    keys: config.token,
    verify: {
      aud: 'urn:audience:test',
      iss: 'urn:issuer:test',
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400, // 4 hours
      timeSkewSec: 15
    },
    validate: authController.validate
  });

  server.route([...userRoute, ...productRoute]);

  // eslint-disable-next-line no-console
  await server.start().then(() => console.log(get('rocket'), get('computer'), `Сервер запущен на ${server.info.uri}`.bgMagenta));
};

export default init;
