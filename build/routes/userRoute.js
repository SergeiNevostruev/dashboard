"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var userController_1 = __importDefault(require("../controllers/userController"));
var authController_1 = __importDefault(require("../controllers/authController"));
exports.default = [
    {
        method: 'GET',
        path: '/api',
        options: {
            auth: { strategies: ['auth'], scope: ['user'] },
            handler: userController_1.default.hello,
            description: 'Get Hello',
            notes: 'Returns Hello Dashboard',
            tags: ['api'],
        }
    },
    {
        method: 'GET',
        path: '/api/users',
        options: {
            handler: userController_1.default.users,
            description: 'Get users of database',
            notes: 'Returns array with users',
            tags: ['api'],
        }
    },
    {
        method: 'POST',
        path: '/api/newuser',
        options: {
            handler: userController_1.default.newuser,
            description: 'Create new user',
            notes: 'Returns message with user or error.',
            tags: ['api'],
            validate: {
                payload: joi_1.default.object({
                    firstName: joi_1.default.string().min(1).max(30).required(),
                    lastName: joi_1.default.string().min(1).max(30).required(),
                    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['ru', 'com', 'net'] } }).max(255).required(),
                    password: joi_1.default.string().min(5).max(30).required(),
                    rpassword: joi_1.default.string().min(5).max(30).required(),
                    consent: joi_1.default.boolean().required()
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/api/auth',
        options: {
            handler: authController_1.default.auth,
            description: 'Authentication',
            notes: 'Returns token',
            tags: ['api'],
            validate: {
                payload: joi_1.default.object({
                    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ['ru', 'com', 'net'] } }).max(255).required(),
                    password: joi_1.default.string().min(5).max(30).required(),
                })
            }
        }
    },
];
//# sourceMappingURL=userRoute.js.map