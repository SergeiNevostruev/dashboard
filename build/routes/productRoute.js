"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var productController_1 = __importDefault(require("../controllers/productController"));
var productRoute = [
    {
        method: 'GET',
        path: '/api/products',
        options: {
            handler: productController_1.default.products,
            description: 'Get products of database',
            notes: 'Returns array with users',
            tags: ['api'],
            validate: {
                options: {
                    allowUnknown: true
                },
                query: joi_1.default.object({
                    page: joi_1.default.string().regex(/\d/),
                    tegs: joi_1.default.string(),
                    count: joi_1.default.string().regex(/\d/),
                    sort: joi_1.default.string(),
                    sortTitle: joi_1.default.string(),
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/api/product/{uuid}',
        options: {
            handler: productController_1.default.getProduct,
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
            handler: productController_1.default.tegsdefoults,
            description: 'Create default tegs',
            notes: 'Return teg',
            tags: ['api'],
        }
    },
    {
        method: 'GET',
        path: '/api/tegs',
        options: {
            handler: productController_1.default.getTegs,
            description: 'Get users of database',
            notes: 'Returns array with users',
            tags: ['api'],
        }
    },
    {
        method: 'POST',
        path: '/api/mapXY',
        options: {
            auth: { strategies: ['auth'], scope: ['user'] },
            handler: productController_1.default.getMapXY,
            description: 'Get X and Y',
            notes: 'Returns {X, Y}',
            tags: ['api'],
        }
    },
    {
        method: 'POST',
        path: '/api/newproduct',
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
        },
        handler: productController_1.default.newProduct,
    },
    {
        method: 'DELETE',
        path: '/api/product/{uuid}',
        options: {
            auth: { strategies: ['auth'], scope: ['user', 'admin'] },
            handler: productController_1.default.delProduct,
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
            handler: productController_1.default.adminDelProduct,
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
            handler: productController_1.default.putProduct,
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
            handler: productController_1.default.userProducts,
            description: 'Get products of database',
            notes: 'Returns array with users',
            tags: ['api'],
            validate: {
                options: {
                    allowUnknown: true
                },
                query: joi_1.default.object({
                    page: joi_1.default.string().regex(/\d/),
                    tegs: joi_1.default.string(),
                    count: joi_1.default.string().regex(/\d/),
                    sort: joi_1.default.string(),
                    sortTitle: joi_1.default.string(),
                })
            }
        }
    },
];
exports.default = productRoute;
//# sourceMappingURL=productRoute.js.map