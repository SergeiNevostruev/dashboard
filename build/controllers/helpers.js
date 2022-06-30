"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProguctCount = exports.getProguctPageDB = exports.validPassword = exports.writePhotoFile = void 0;
var crypto_1 = __importDefault(require("crypto"));
var fs_1 = __importDefault(require("fs"));
var promises_1 = require("fs/promises");
var path_1 = __importDefault(require("path"));
var moment_timezone_1 = __importDefault(require("moment-timezone"));
var Product_1 = require("../entity/Product");
var config_json_1 = __importDefault(require("../config/config.json"));
var db_1 = __importDefault(require("../db"));
var validPassword = function (password, salt, hash) {
    var hashCheck = crypto_1.default.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hashCheck === hash;
};
exports.validPassword = validPassword;
var writePhotoFile = function (photoUrl, file, id) { return __awaiter(void 0, void 0, void 0, function () {
    var changeExp, oldUrlPhoto, result, photoPaths, i, uuidPhoto, filePath, urlPath, uuidPhoto, filePath, urlPath, oldUrlPhoto_1, oldUrlPhoto_1_1, pathPhoto, e_1_1;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                changeExp = function (fileExp) { return (!(path_1.default.extname(fileExp) === '.jpg') && !(path_1.default.extname(fileExp) === '.jpeg')); };
                oldUrlPhoto = photoUrl ? JSON.parse(photoUrl) : '';
                result = [];
                photoPaths = [];
                if (file) {
                    if (file.length) {
                        for (i = 0; i < file.length; i++) {
                            if (changeExp(file[i].hapi.filename))
                                return [2, { e: true, message: 'Некорректные расширения фотографий' }];
                            result.push(file[i].hapi);
                            uuidPhoto = crypto_1.default.randomUUID();
                            filePath = path_1.default.join(config_json_1.default.fotofolder, "".concat(id), uuidPhoto + path_1.default.extname(file[i].hapi.filename));
                            urlPath = ['api/photo', "".concat(id), uuidPhoto + path_1.default.extname(file[i].hapi.filename)].join('/');
                            photoPaths.push(urlPath);
                            file[i].pipe(fs_1.default.createWriteStream(filePath));
                        }
                    }
                    else {
                        if (changeExp(file.hapi.filename))
                            return [2, { e: true, message: 'Некорректные расширения фотографий' }];
                        result.push(file.hapi);
                        uuidPhoto = crypto_1.default.randomUUID();
                        filePath = path_1.default.join(config_json_1.default.fotofolder, "".concat(id), uuidPhoto + path_1.default.extname(file.hapi.filename));
                        urlPath = ['api/photo', "".concat(id), uuidPhoto + path_1.default.extname(file.hapi.filename)].join('/');
                        photoPaths.push(urlPath);
                        file.pipe(fs_1.default.createWriteStream(filePath));
                    }
                }
                if (!oldUrlPhoto) return [3, 12];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, 7, 12]);
                oldUrlPhoto_1 = __asyncValues(oldUrlPhoto);
                _b.label = 2;
            case 2: return [4, oldUrlPhoto_1.next()];
            case 3:
                if (!(oldUrlPhoto_1_1 = _b.sent(), !oldUrlPhoto_1_1.done)) return [3, 5];
                pathPhoto = oldUrlPhoto_1_1.value;
                (0, promises_1.rm)(path_1.default.join(config_json_1.default.fotofolder, pathPhoto), { force: true });
                _b.label = 4;
            case 4: return [3, 2];
            case 5: return [3, 12];
            case 6:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3, 12];
            case 7:
                _b.trys.push([7, , 10, 11]);
                if (!(oldUrlPhoto_1_1 && !oldUrlPhoto_1_1.done && (_a = oldUrlPhoto_1.return))) return [3, 9];
                return [4, _a.call(oldUrlPhoto_1)];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9: return [3, 11];
            case 10:
                if (e_1) throw e_1.error;
                return [7];
            case 11: return [7];
            case 12: return [2, { e: false, message: JSON.stringify(photoPaths) }];
        }
    });
}); };
exports.writePhotoFile = writePhotoFile;
var getProguctPageDB = function (tegs, productNumberPang, countProductOnPage, userUuid, sort, sortTitle, search) {
    if (userUuid === void 0) { userUuid = false; }
    if (sort === void 0) { sort = 'DESC'; }
    if (sortTitle === void 0) { sortTitle = 'createDate'; }
    if (search === void 0) { search = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var fields, data_1, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fields = [
                        'product.title',
                        'product.tel',
                        'product.teg',
                        'product.price',
                        'product.about',
                        'product.photoUrl',
                        'product.address',
                        'product.mapXY',
                        'product.views',
                        'product.tel',
                        'product.uuid',
                        'product.createDate'
                    ];
                    if (!userUuid) return [3, 2];
                    return [4, db_1.default
                            .getRepository(Product_1.Product)
                            .createQueryBuilder()
                            .select(fields)
                            .from(Product_1.Product, 'product')
                            .where('product.teg IN (:...tegs)', { tegs: tegs })
                            .andWhere('product.userUuid = :userUuid', { userUuid: userUuid })
                            .andWhere('product.title ILIKE :search', { search: "%".concat(search, "%") })
                            .offset(productNumberPang)
                            .limit(countProductOnPage)
                            .distinct(true)
                            .orderBy("product.".concat(sortTitle), sort, 'NULLS LAST')
                            .getMany()];
                case 1:
                    data_1 = _a.sent();
                    return [2, data_1.map(function (obj) { return (__assign(__assign({}, obj), { createDate: (0, moment_timezone_1.default)(obj.createDate)
                                .tz('Europe/Moscow', true).format() })); })];
                case 2: return [4, db_1.default
                        .getRepository(Product_1.Product)
                        .createQueryBuilder()
                        .select(fields)
                        .from(Product_1.Product, 'product')
                        .where('product.teg IN (:...tegs)', { tegs: tegs })
                        .andWhere('product.title ILIKE :search', { search: "%".concat(search, "%") })
                        .offset(productNumberPang)
                        .limit(countProductOnPage)
                        .distinct(true)
                        .orderBy("product.".concat(sortTitle), sort, 'NULLS LAST')
                        .getMany()];
                case 3:
                    data = _a.sent();
                    return [2, data.map(function (obj) { return (__assign(__assign({}, obj), { createDate: (0, moment_timezone_1.default)(obj.createDate)
                                .tz('Europe/Moscow', true).format() })); })];
            }
        });
    });
};
exports.getProguctPageDB = getProguctPageDB;
var getProguctCount = function (tegs, productNumberPang, countProductOnPage, userUuid, sort, sortTitle, search) {
    if (userUuid === void 0) { userUuid = false; }
    if (sort === void 0) { sort = 'DESC'; }
    if (sortTitle === void 0) { sortTitle = 'createDate'; }
    if (search === void 0) { search = ''; }
    return __awaiter(void 0, void 0, void 0, function () {
        var fields, data_2, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fields = 'product.uuid';
                    if (!userUuid) return [3, 2];
                    return [4, db_1.default
                            .getRepository(Product_1.Product)
                            .createQueryBuilder()
                            .select(fields)
                            .from(Product_1.Product, 'product')
                            .where('product.teg IN (:...tegs)', { tegs: tegs })
                            .andWhere('product.userUuid = :userUuid', { userUuid: userUuid })
                            .andWhere('product.title ILIKE :search', { search: "%".concat(search, "%") })
                            .getMany()];
                case 1:
                    data_2 = _a.sent();
                    return [2, data_2.length];
                case 2: return [4, db_1.default
                        .getRepository(Product_1.Product)
                        .createQueryBuilder()
                        .select(fields)
                        .from(Product_1.Product, 'product')
                        .where('product.teg IN (:...tegs)', { tegs: tegs })
                        .andWhere('product.title ILIKE :search', { search: "%".concat(search, "%") })
                        .getMany()];
                case 3:
                    data = _a.sent();
                    return [2, data.length];
            }
        });
    });
};
exports.getProguctCount = getProguctCount;
//# sourceMappingURL=helpers.js.map