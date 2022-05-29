// import hapi
import * as Hapi from '@hapi/hapi';
import { Server, ResponseToolkit, Request } from 'hapi';
import 'colors';
import { get } from 'node-emoji';
import swagger from './swagger';
import userRoute from '../routes/userRoute';

// server
// =====================================================================================

const init = async (): Promise<void> => {
  const server = Hapi.server({
    port: 8080,
    host: '0.0.0.0',
  });

  await server.register(swagger);

  server.route(userRoute);

  // eslint-disable-next-line no-console
  await server.start().then(() => console.log(get('rocket'), get('computer'), `Сервер запущен на ${server.info.uri}`.bgMagenta));
};

export default init;
