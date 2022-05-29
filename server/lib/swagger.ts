// import swagger
import * as Hapi from '@hapi/hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';

// options swagger
// =====================================================================================
const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: 'Test API Documentation'
  }
};

const swagger: Array<Hapi.ServerRegisterPluginObject<any>> = [
  {
    plugin: Inert
  },
  {
    plugin: Vision
  },
  {
    plugin: HapiSwagger,
    options: swaggerOptions
  }
];

export default swagger;
