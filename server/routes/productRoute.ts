import Joi from 'joi';
import Hapi from '@hapi/hapi';
import handlers from '../controllers/productController';

const productRoute: Hapi.ServerRoute[] = [

  {
    method: 'GET',
    path: '/api/products',
    options: {
      handler: handlers.products,
      description: 'Get products of database',
      notes: 'Returns array with users',
      tags: ['api'],
      validate: {
        options: {
          allowUnknown: true
        },
        query: Joi.object({
          page: Joi.string().regex(/\d/),
          tegs: Joi.string(),
          count: Joi.string().regex(/\d/),
          sort: Joi.string(),
          sortTitle: Joi.string(),
        })
      }
    }
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
    method: 'GET',
    path: '/api/photo/{param*}',
    options: {
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true
        }
      },
      description: 'Get Photo',
      notes: 'Returns Photo',
      tags: ['api'],
    }
  },
  {
    method: 'GET',
    path: '/api/tegsdefoults',
    options: {
      // auth: { strategies: ['auth'], scope: ['admin'] },
      handler: handlers.tegsdefoults,
      description: 'Create default tegs',
      notes: 'Return teg',
      tags: ['api'],
    }
  },
  {
    method: 'GET',
    path: '/api/tegs',
    options: {
      handler: handlers.getTegs,
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
      auth: { strategies: ['auth'], scope: ['user'] },
      handler: handlers.getMapXY,
      description: 'Get X and Y',
      notes: 'Returns {X, Y}',
      tags: ['api'],
    }
  },

  {
    method: 'POST',
    path: '/api/newproduct', // сделать форму в свагере
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
    method: 'DELETE',
    path: '/api/admin/product/{uuid}',
    options: {
      auth: { strategies: ['auth'], scope: ['admin'] },
      handler: handlers.adminDelProduct,
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
      handler: handlers.putProduct,
      description: 'Change product',
      notes: 'Returns changed product',
      tags: ['api'],
    }
  },
  {
    method: 'GET',
    path: '/api/user-products',
    options: {
      auth: { strategies: ['auth'], scope: ['user'] },
      handler: handlers.userProducts,
      description: 'Get products of database',
      notes: 'Returns array with users',
      tags: ['api'],
      validate: {
        options: {
          allowUnknown: true
        },
        query: Joi.object({
          page: Joi.string().regex(/\d/),
          tegs: Joi.string(),
          count: Joi.string().regex(/\d/),
          sort: Joi.string(),
          sortTitle: Joi.string(),
        })
      }
    }
  },
];

export default productRoute;
