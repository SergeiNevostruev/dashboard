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
var crypto_1 = __importDefault(require("crypto"));
var boom_1 = __importDefault(require("@hapi/boom"));
var User_1 = require("../entity/User");
var db_1 = __importDefault(require("../db"));
var hello = function (req, h) { return ({ msg: 'Hello Dashboard', ip: req.location }); };
var users = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, db_1.default.manager.find(User_1.User)];
            case 1:
                data = _a.sent();
                return [2, data];
            case 2:
                e_1 = _a.sent();
                return [2, { error: JSON.stringify(e_1) }];
            case 3: return [2];
        }
    });
}); };
var newuser = function (request, h) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, email, password, rpassword, consent, changeEmail, user, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.payload, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password, rpassword = _a.rpassword, consent = _a.consent;
                if (!consent)
                    return [2, { e: true, message: 'Нужно принять пользовательское соглашение' }];
                return [4, db_1.default.manager.findOneBy(User_1.User, { email: email }).catch(function () { return boom_1.default.internal('Ошибка сохранения в базе данных'); })];
            case 1:
                changeEmail = _b.sent();
                if (changeEmail)
                    return [2, { e: true, message: 'Такой email существует' }];
                if (password !== rpassword)
                    return [2, { e: true, message: 'Повторный пароль введен не верно' }];
                user = new User_1.User();
                user.firstName = firstName;
                user.lastName = lastName;
                user.email = email;
                user.salt = crypto_1.default.randomBytes(16).toString('hex');
                user.hashpassword = crypto_1.default.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4, db_1.default.manager.save(user)];
            case 3:
                _b.sent();
                return [2, { e: false, message: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C ".concat(firstName, " ").concat(lastName, " \u0441 \u043F\u043E\u0447\u0442\u043E\u0439 ").concat(email, " \u0441\u043E\u0437\u0434\u0430\u043D!") }];
            case 4:
                e_2 = _b.sent();
                return [2, { e: true, message: 'Ошибка сохранения пользователя в базе данных' }];
            case 5: return [2];
        }
    });
}); };
exports.default = { hello: hello, users: users, newuser: newuser };
//# sourceMappingURL=userController.js.map