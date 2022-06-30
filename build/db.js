"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
require("colors");
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var User_1 = require("./entity/User");
var Product_1 = require("./entity/Product");
var Tegs_1 = require("./entity/Tegs");
dotenv_1.default.config();
var db = new typeorm_1.DataSource({
    type: 'postgres',
    host: '0.0.0.0',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: true,
    logging: false,
    entities: [User_1.User, Product_1.Product, Tegs_1.Tegs,
        path_1.default.join(__dirname, 'entity/*.ts')
    ],
    migrations: [
        path_1.default.join(__dirname, 'migration/*.ts')
    ],
    subscribers: [
        path_1.default.join(__dirname, 'subscriber/*.ts')
    ],
});
exports.default = db;
//# sourceMappingURL=db.js.map