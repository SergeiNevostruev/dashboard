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
exports.adminCreate = void 0;
var boom_1 = __importDefault(require("@hapi/boom"));
var crypto_1 = __importDefault(require("crypto"));
var db_1 = __importDefault(require("../db"));
var User_1 = require("../entity/User");
var adminCreate = function () { return __awaiter(void 0, void 0, void 0, function () {
    var adminName, adminSurname, adminEmail, adminPassword, changeEmail, user, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('создание админа');
                adminName = process.env.ADMIN_NAME;
                adminSurname = process.env.ADMIN_SURNAME;
                adminEmail = process.env.ADMIN_EMAIL;
                adminPassword = process.env.ADMIN_PASSWORD;
                return [4, db_1.default.manager.findOneBy(User_1.User, { email: adminEmail }).catch(function () { return boom_1.default.internal('Ошибка сохранения в базе данных'); })];
            case 1:
                changeEmail = _a.sent();
                if (changeEmail) {
                    console.log('Админ уже создан ранее');
                    return [2, { e: true, message: 'Администратор уже создан ранее' }];
                }
                user = new User_1.User();
                user.firstName = adminName;
                user.lastName = adminSurname;
                user.role = User_1.UserRole.ADMIN;
                user.email = adminEmail;
                user.salt = crypto_1.default.randomBytes(16).toString('hex');
                user.hashpassword = crypto_1.default.pbkdf2Sync(adminPassword, user.salt, 1000, 64, 'sha512').toString('hex');
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4, db_1.default.manager.save(user)];
            case 3:
                _a.sent();
                console.log("\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440 \u0441\u043E\u0437\u0434\u0430\u043D ==> ".concat(adminEmail));
                return [2, true];
            case 4:
                e_1 = _a.sent();
                return [2, false];
            case 5: return [2];
        }
    });
}); };
exports.adminCreate = adminCreate;
//# sourceMappingURL=adminCreate.js.map