import Joi from 'joi';
import handlers from '../controllers/user_controller';

export default [

  {
    method: 'GET',
    path: '/',
    options: {
      handler: handlers.hello,
      description: 'Get Hello',
      notes: 'Returns Hello Typescript',
      tags: ['api'],
    }
  }

];
