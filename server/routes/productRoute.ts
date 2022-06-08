import Joi from 'joi';
import Hapi from '@hapi/hapi';
import handlers from '../controllers/productController';

const productRoute: Hapi.ServerRoute[] = [

  {
    method: 'GET',
    path: '/api/products',
    options: {
      handler: handlers.products,
      description: 'Get users of database',
      notes: 'Returns array with users',
      tags: ['api'],
    }
  },

  // РОУТЫ С АВТОРИЗАЦИЕЙ ====> СДЕЛАТЬ АВТОРИЗАЦИЮ

  {
    method: 'POST',
    path: '/api/mapXY',
    options: {
      handler: handlers.getMapXY,
      description: 'Get X and Y',
      notes: 'Returns {X, Y}',
      tags: ['api'],
    }
  },

  {
    method: 'POST',
    path: '/api/newproduct', // Нужно разобраться как в свагере сделать форму
    options: {
      auth: { strategies: ['auth'], scope: ['user'] },
      payload: {
        maxBytes: 1024 * 1024 * 5,
        multipart: {
          output: 'stream'
        },
        parse: true
      },
      plugins: {
        'hapi-swagger': {
          payloadType: 'form'
        }
      },
      description: 'Create product',
      notes: 'Returns object',
      tags: ['api'],
      // validate: {
      //   payload: {
      //     userUuid: Joi.string().required(),
      //     title: Joi.string().required(),
      //     tel: Joi.number().required(),
      //     teg: Joi.number().required(),
      //     price: Joi.number().required(),
      //     about: Joi.string().required(),
      //     address: Joi.string().required(),
      //     file: Joi.any().meta({ swaggerType: 'file' }).description('jpeg files')
      //   }
      // }
    },
    handler: handlers.newProduct,
  },
  {
    method: 'GET',
    path: '/api/product/{uuid}',
    options: {
      handler: handlers.getProduct,
      description: 'Get product',
      notes: 'Returns product',
      tags: ['api'],
    }
  },
  {
    method: 'DELETE',
    path: '/api/product/{uuid}',
    options: {
      auth: { strategies: ['auth'], scope: ['user', 'admin'] },
      handler: handlers.delProduct,
      description: 'Delete product',
      notes: 'Returns ok',
      tags: ['api'],
    }
  },
  {
    method: 'PUT',
    path: '/api/product/{uuid}',
    options: {
      auth: { strategies: ['auth'], scope: ['user', 'admin'] },
      handler: handlers.putProduct,
      description: 'Change product',
      notes: 'Returns changed product',
      tags: ['api'],
    }
  },
];

export default productRoute;
