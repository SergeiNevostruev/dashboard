"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var promises_1 = require("fs/promises");
var path_1 = __importDefault(require("path"));
var joi_1 = __importDefault(require("joi"));
var boom_1 = __importDefault(require("@hapi/boom"));
var User_1 = require("../entity/User");
var db_1 = __importDefault(require("../db"));
var Product_1 = require("../entity/Product");
var config_json_1 = __importDefault(require("../config/config.json"));
var helpers_1 = require("./helpers");
var Tegs_1 = require("../entity/Tegs");
var constants = fs_1.default.constants;
var getMapXY = function (addres) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2, ({ x: 51, y: 52 })];
}); }); };
var products = function (request, h) { return __awaiter(void 0, void 0, void 0, function () {
    var sort, sortTitle, search, countProduct, pageQuery, countProductOnPage, productNumberPang, countPage, changeNaNtegs, tegsQuery, tegsDB, tegs, data, countProductReq, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sort = request.query.sort;
                sortTitle = request.query.sorttitle;
                search = request.query.search;
                if (!search)
                    search = '';
                if (sort !== 'DESC' && sort !== 'ASC')
                    sort = 'DESC';
                if (sortTitle !== 'createDate' && sortTitle !== 'title' && sortTitle !== 'teg')
                    sortTitle = 'createDate';
                return [4, db_1.default.getRepository(Product_1.Product).count()];
            case 1:
                countProduct = _a.sent();
                pageQuery = (Number(request.query.page) || 1) - 1;
                countProductOnPage = Number(request.query.count) || 3;
                productNumberPang = (countProduct > countProductOnPage * pageQuery
                    || countProduct <= 0)
                    ? pageQuery * countProductOnPage
                    : ((countProduct - countProductOnPage > 0)
                        ? countProduct - countProductOnPage
                        : 0);
                countPage = Math.ceil(countProduct / countProductOnPage);
                changeNaNtegs = false;
                tegsQuery = request.query.tegs;
                return [4, db_1.default.manager.find(Tegs_1.Tegs).catch()];
            case 2:
                tegsDB = _a.sent();
                if (!tegsDB)
                    return [2, boom_1.default.internal('Теги не найдены')];
                tegs = (tegsQuery === null || tegsQuery === void 0 ? void 0 : tegsQuery.split(',').map(function (el) {
                    if (changeNaNtegs)
                        return 0;
                    if (Number.isNaN(Number(el))) {
                        changeNaNtegs = true;
                        return 0;
                    }
                    return Number(el);
                })) || tegsDB.map(function (i) { return i.id; });
                if (Number.isNaN(countProductOnPage) || changeNaNtegs)
                    return [2, boom_1.default.notFound('Неверный запрос')];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 6, , 7]);
                return [4, (0, helpers_1.getProguctPageDB)(tegs, productNumberPang, countProductOnPage, false, sort, sortTitle, search)];
            case 4:
                data = _a.sent();
                return [4, (0, helpers_1.getProguctCount)(tegs, productNumberPang, countProductOnPage, false, sort, sortTitle, search)];
            case 5:
                countProductReq = _a.sent();
                return [2, {
                        countProductReq: countProductReq,
                        countProduct: countProduct,
                        countPage: countPage,
                        countProductOnPage: countProductOnPage,
                        pageNumber: pageQuery + 1,
                        data: data
                    }];
            case 6:
                e_1 = _a.sent();
                return [2, boom_1.default.internal('Неведома ошибка сервера')];
            case 7: return [2];
        }
    });
}); };
var schemaMultipart = joi_1.default.object({
    title: joi_1.default.string().required(),
    tel: joi_1.default.number().required(),
    teg: joi_1.default.number().required(),
    price: joi_1.default.number().required(),
    about: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
});
var newProduct = function (request, h) { return __awaiter(void 0, void 0, void 0, function () {
    var uuid, userUuid, _a, title, tel, teg, price, about, address, file, validForm, user, product, _b, id, _c, photoUrlWriteJson, uuid_1, title_1, e_2;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                uuid = request.auth.credentials.uuid;
                if (!uuid) {
                    return [2, { e: true, message: 'Нужна авторизация' }];
                }
                userUuid = uuid;
                _a = request.payload, title = _a.title, tel = _a.tel, teg = _a.teg, price = _a.price, about = _a.about, address = _a.address, file = _a.file;
                validForm = schemaMultipart.validate({
                    title: title,
                    tel: tel,
                    teg: teg,
                    price: price,
                    about: about,
                    address: address
                });
                if (validForm.error)
                    return [2, { e: true, message: 'Некорректно заполнена форма' }];
                return [4, db_1.default.manager.findOneBy(User_1.User, { uuid: userUuid }).catch()];
            case 1:
                user = _d.sent();
                if (!user)
                    return [2, { e: true, message: 'Некорректный пользователь' }];
                product = new Product_1.Product();
                product.userUuid = userUuid;
                product.title = title;
                product.tel = tel;
                product.teg = teg;
                product.price = price;
                product.about = about;
                product.address = address;
                _b = product;
                return [4, getMapXY(address)];
            case 2:
                _b.mapXY = _d.sent();
                product.user = user;
                id = user.uuid;
                _d.label = 3;
            case 3:
                _d.trys.push([3, 5, , 7]);
                return [4, (0, promises_1.access)(path_1.default.join(config_json_1.default.fotofolder, "".concat(id)), constants.R_OK || constants.W_OK)];
            case 4:
                _d.sent();
                return [3, 7];
            case 5:
                _c = _d.sent();
                return [4, (0, promises_1.mkdir)(path_1.default.join(config_json_1.default.fotofolder, "".concat(id))).catch()];
            case 6:
                _d.sent();
                return [3, 7];
            case 7: return [4, (0, helpers_1.writePhotoFile)('', file, id)];
            case 8:
                photoUrlWriteJson = _d.sent();
                if (photoUrlWriteJson.e) {
                    return [2, photoUrlWriteJson];
                }
                product.photoUrl = photoUrlWriteJson.message;
                _d.label = 9;
            case 9:
                _d.trys.push([9, 11, , 12]);
                return [4, db_1.default.manager.save(product)];
            case 10:
                _d.sent();
                uuid_1 = product.uuid, title_1 = product.title;
                return [2, { e: false, message: "".concat(title_1, " \u0441\u043E\u0437\u0434\u0430\u043D!"), product: { uuid: uuid_1, title: title_1 } }];
            case 11:
                e_2 = _d.sent();
                return [2, boom_1.default.internal('Ошибка сохранения объявления в базе данных')];
            case 12: return [2];
        }
    });
}); };
var getProduct = function (request, h) { return __awaiter(void 0, void 0, void 0, function () {
    var uuid, user, about, address, mapXY, photoUrl, price, teg, tel, title, views, createDate, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uuid = request.params.uuid;
                if (!uuid) {
                    return [2, boom_1.default.notFound('Неверный URL')];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4, db_1.default.manager.findOneBy(Product_1.Product, { uuid: uuid })];
            case 2:
                user = _a.sent();
                about = user.about, address = user.address, mapXY = user.mapXY, photoUrl = user.photoUrl, price = user.price, teg = user.teg, tel = user.tel, title = user.title, views = user.views, createDate = user.createDate;
                user.views += 1;
                return [4, db_1.default.manager.save(user).catch(function (e) { return boom_1.default.internal('Неведомая беда произошла на сервере'); })];
            case 3:
                _a.sent();
                return [2, { about: about, address: address, mapXY: mapXY, photoUrl: photoUrl, price: price, teg: teg, tel: tel, title: title, views: views, createDate: createDate }];
            case 4:
                e_3 = _a.sent();
                return [2, h.view('404').code(404)];
            case 5: return [2];
        }
    });
}); };
var delProduct = function (request, h) { return __awaiter(void 0, void 0, void 0, function () {
    var uuidUrlProduct, uuidUserToken, delProduct, title;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uuidUrlProduct = request.params.uuid;
                uuidUserToken = request.auth.credentials.uuid;
                if (!uuidUrlProduct) {
                    return [2, boom_1.default.notFound('Такого объявления нет в Вашем аккаунте')];
                }
                return [4, db_1.default
                        .manager
                        .findOneBy(Product_1.Product, { uuid: uuidUrlProduct, userUuid: uuidUserToken }).catch(function (e) {
                        boom_1.default.notFound('Такого объявления нет в Вашем аккаунте');
                    })];
            case 1:
                delProduct = _a.sent();
                if (!delProduct) return [3, 3];
                title = delProduct.title;
                return [4, db_1.default.manager.remove(delProduct)];
            case 2:
                _a.sent();
                return [2, { e: false, message: "\u041E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435 ".concat(title, " \u0443\u0434\u0430\u043B\u0435\u043D\u043E") }];
            case 3: return [2, boom_1.default.notFound('Невозможно удалить. Такого объявления нет в Вашем аккаунте')];
        }
    });
}); };
var adminDelProduct = function (request, h) { return __awaiter(void 0, void 0, void 0, function () {
    var uuidUrlProduct, delProduct, title;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uuidUrlProduct = request.params.uuid;
                if (!uuidUrlProduct) {
                    return [2, boom_1.default.notFound('Такого объявления нет в Вашем аккаунте')];
                }
                return [4, db_1.default
                        .manager
                        .findOneBy(Product_1.Product, { uuid: uuidUrlProduct }).catch(function (e) {
                        boom_1.default.notFound('Такого объявления нет в Вашем аккаунте');
                    })];
            case 1:
                delProduct = _a.sent();
                if (!delProduct) return [3, 3];
                title = delProduct.title;
                return [4, db_1.default.manager.remove(delProduct)];
            case 2:
                _a.sent();
                return [2, { e: false, message: "\u041E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0435 ".concat(title, " \u0443\u0434\u0430\u043B\u0435\u043D\u043E") }];
            case 3: return [2, boom_1.default.notFound('Невозможно удалить. Такого объявления нет в Вашем аккаунте')];
        }
    });
}); };
var putProduct = function (request, h) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, tel, teg, price, about, address, mapXY, file, uuidUrlProduct, uuidUserToken, putProduct, validForm, user, id, _b, photoUrlWriteJson, uuid, title_2, e_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = request.payload, title = _a.title, tel = _a.tel, teg = _a.teg, price = _a.price, about = _a.about, address = _a.address, mapXY = _a.mapXY, file = _a.file;
                uuidUrlProduct = request.params.uuid;
                uuidUserToken = request.auth.credentials.uuid;
                if (!uuidUrlProduct) {
                    return [2, boom_1.default.notFound('Такого объявления нет в Вашем аккаунте')];
                }
                return [4, db_1.default
                        .manager
                        .findOneBy(Product_1.Product, { uuid: uuidUrlProduct, userUuid: uuidUserToken }).catch(function (e) {
                        boom_1.default.notFound('Такого объявления нет в Вашем аккаунте');
                    })];
            case 1:
                putProduct = _c.sent();
                if (!putProduct) {
                    return [2, boom_1.default.notFound('Невозможно изменить объявления. Такого объявления нет в Вашем аккаунте')];
                }
                validForm = schemaMultipart.validate({
                    title: title,
                    tel: tel,
                    teg: teg,
                    price: price,
                    about: about,
                    address: address
                });
                if (validForm.error)
                    return [2, { e: true, message: 'Некорректно заполнена форма' }];
                putProduct.title = title;
                putProduct.tel = tel;
                putProduct.teg = teg;
                putProduct.price = price;
                putProduct.about = about;
                putProduct.address = address;
                putProduct.mapXY = mapXY;
                return [4, db_1.default.manager.findOneBy(User_1.User, { uuid: uuidUserToken })];
            case 2:
                user = _c.sent();
                if (!user)
                    return [2, { e: true, message: 'Некорректный пользователь' }];
                id = user.uuid;
                _c.label = 3;
            case 3:
                _c.trys.push([3, 5, , 7]);
                return [4, (0, promises_1.access)(path_1.default.join(config_json_1.default.fotofolder, "".concat(id)), constants.R_OK || constants.W_OK)];
            case 4:
                _c.sent();
                return [3, 7];
            case 5:
                _b = _c.sent();
                return [4, (0, promises_1.mkdir)(path_1.default.join(config_json_1.default.fotofolder, "".concat(id))).catch()];
            case 6:
                _c.sent();
                return [3, 7];
            case 7: return [4, (0, helpers_1.writePhotoFile)(putProduct.photoUrl, file, id)];
            case 8:
                photoUrlWriteJson = _c.sent();
                if (photoUrlWriteJson.e) {
                    return [2, photoUrlWriteJson];
                }
                putProduct.photoUrl = photoUrlWriteJson.message;
                _c.label = 9;
            case 9:
                _c.trys.push([9, 11, , 12]);
                return [4, db_1.default.manager.save(putProduct)];
            case 10:
                _c.sent();
                uuid = putProduct.uuid, title_2 = putProduct.title;
                return [2, { e: false, message: "".concat(title_2, " \u0438\u0437\u043C\u0435\u043D\u0435\u043D! uuid: ").concat(uuidUrlProduct, " ====>"), product: { uuid: uuid, title: title_2 } }];
            case 11:
                e_4 = _c.sent();
                return [2, boom_1.default.internal('Ошибка сохранения объявления в базе данных')];
            case 12: return [2];
        }
    });
}); };
var tegsdefoults = function (request, h) { return __awaiter(void 0, void 0, void 0, function () {
    var tegs, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tegs = new Tegs_1.Tegs();
                tegs.teg = 'Для дома';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, db_1.default.manager.save(tegs)];
            case 2:
                _a.sent();
                return [2, tegs];
            case 3:
                e_5 = _a.sent();
                return [2, { e: true, message: 'Ошибка тега в базе данных' }];
            case 4: return [2];
        }
    });
}); };
var getTegs = function (request, h) { return __awaiter(void 0, void 0, void 0, function () {
    var data, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, db_1.default.manager.find(Tegs_1.Tegs)];
            case 1:
                data = _a.sent();
                return [2, data];
            case 2:
                e_6 = _a.sent();
                return [2, { error: JSON.stringify(e_6) }];
            case 3: return [2];
        }
    });
}); };
var userProducts = function (request, h) { return __awaiter(void 0, void 0, void 0, function () {
    var userUuid, search, sort, sortTitle, countProduct, pageQuery, countProductOnPage, productNumberPang, countPage, changeNaNtegs, tegsQuery, tegsDB, tegs, data, countProductReq, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userUuid = request.auth.credentials.uuid;
                if (!userUuid)
                    return [2, boom_1.default.notFound('Неверный запрос')];
                search = request.query.search;
                if (!search)
                    search = '';
                sort = request.query.sort;
                sortTitle = request.query.sorttitle;
                if (sort !== 'DESC' && sort !== 'ASC')
                    sort = 'DESC';
                if (sortTitle !== 'createDate' && sortTitle !== 'title' && sortTitle !== 'teg')
                    sortTitle = 'createDate';
                return [4, db_1.default.getRepository(Product_1.Product).countBy({ userUuid: userUuid })];
            case 1:
                countProduct = _a.sent();
                pageQuery = (Number(request.query.page) || 1) - 1;
                countProductOnPage = Number(request.query.count) || 8;
                productNumberPang = (countProduct > countProductOnPage * pageQuery
                    || countProduct <= 0)
                    ? pageQuery * countProductOnPage
                    : ((countProduct - countProductOnPage > 0)
                        ? countProduct - countProductOnPage
                        : 0);
                countPage = Math.ceil(countProduct / countProductOnPage);
                changeNaNtegs = false;
                tegsQuery = request.query.tegs;
                return [4, db_1.default.manager.find(Tegs_1.Tegs).catch()];
            case 2:
                tegsDB = _a.sent();
                if (!tegsDB)
                    return [2, boom_1.default.internal('Теги не найдены')];
                tegs = (tegsQuery === null || tegsQuery === void 0 ? void 0 : tegsQuery.split(',').map(function (el) {
                    if (changeNaNtegs)
                        return 0;
                    if (Number.isNaN(Number(el))) {
                        changeNaNtegs = true;
                        return 0;
                    }
                    return Number(el);
                })) || tegsDB.map(function (i) { return i.id; });
                if (Number.isNaN(countProductOnPage) || changeNaNtegs)
                    return [2, boom_1.default.notFound('Неверный запрос')];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 6, , 7]);
                return [4, (0, helpers_1.getProguctPageDB)(tegs, productNumberPang, countProductOnPage, userUuid, sort, sortTitle, search)];
            case 4:
                data = _a.sent();
                return [4, (0, helpers_1.getProguctCount)(tegs, productNumberPang, countProductOnPage, userUuid, sort, sortTitle, search)];
            case 5:
                countProductReq = _a.sent();
                return [2, {
                        countProductReq: countProductReq,
                        countProduct: countProduct,
                        countPage: countPage,
                        countProductOnPage: countProductOnPage,
                        pageNumber: pageQuery + 1,
                        data: data
                    }];
            case 6:
                e_7 = _a.sent();
                return [2, boom_1.default.internal('Неведомая ошибка сервера')];
            case 7: return [2];
        }
    });
}); };
exports.default = {
    products: products,
    newProduct: newProduct,
    getMapXY: getMapXY,
    getProduct: getProduct,
    delProduct: delProduct,
    putProduct: putProduct,
    tegsdefoults: tegsdefoults,
    getTegs: getTegs,
    userProducts: userProducts,
    adminDelProduct: adminDelProduct,
};
//# sourceMappingURL=productController.js.map