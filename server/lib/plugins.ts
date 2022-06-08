// import swagger
import * as Hapi from '@hapi/hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as jwt from '@hapi/jwt';

// options swagger
// =====================================================================================
const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: 'Test API Documentation'
  }
};

const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
  {
    plugin: Inert
  },
  {
    plugin: Vision
  },
  {
    plugin: HapiSwagger,
    options: swaggerOptions
  },
  jwt
];

export default plugins;