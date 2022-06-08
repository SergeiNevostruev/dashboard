import Joi from 'joi';
import handlers from '../controllers/userController';
import authHandlers from '../controllers/authController';

export default [

  {
    method: 'GET',
    path: '/api',
    options: {
      auth: { strategies: ['auth'], scope: ['user'] },
      handler: handlers.hello,
      description: 'Get Hello',
      notes: 'Returns Hello Dashboard',
      tags: ['api'],
    }
  },

  {
    method: 'GET',
    path: '/api/users',
    options: {
      handler: handlers.users,
      description: 'Get users of database',
      notes: 'Returns array with users',
      tags: ['api'],
    }
  },

  {
    method: 'POST',
    path: '/api/newuser',
    options: {
      handler: handlers.newuser,
      description: 'Create new user',
      notes: 'Returns message with user or error.',
      tags: ['api'],
      validate: {
        payload: Joi.object({
          firstName: Joi.string().min(1).max(30).required(),
          lastName: Joi.string().min(1).max(30).required(),
          email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['ru', 'com', 'net'] } }).max(255).required(),
          password: Joi.string().min(5).max(30).required(),
          rpassword: Joi.string().min(5).max(30).required(),
          consent: Joi.boolean().required()
        })
      }
    }
  },
  {
    method: 'POST',
    path: '/api/auth',
    options: {
      handler: authHandlers.auth,
      description: 'Authentication',
      notes: 'Returns token',
      tags: ['api'],
      validate: {
        payload: Joi.object({
          email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['ru', 'com', 'net'] } }).max(255).required(),
          password: Joi.string().min(5).max(30).required(),
        })
      }
    }
  },
];
