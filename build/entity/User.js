"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
var typeorm_1 = require("typeorm");
var Product_1 = require("./Product");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["User"] = "user";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var User = (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, typeorm_1.Generated)('uuid'),
        __metadata("design:type", String)
    ], User.prototype, "uuid", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            enum: UserRole,
            default: UserRole.User,
            nullable: true
        }),
        __metadata("design:type", String)
    ], User.prototype, "role", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "firstName", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "lastName", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar'),
        __metadata("design:type", String)
    ], User.prototype, "hashpassword", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], User.prototype, "salt", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'simple-json', default: { t: '0', expires_at: '0' }, nullable: true }),
        __metadata("design:type", Object)
    ], User.prototype, "token", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], User.prototype, "createDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], User.prototype, "updateDate", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Product_1.Product; }, function (product) { return product.user; }),
        __metadata("design:type", Array)
    ], User.prototype, "products", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)(),
        (0, typeorm_1.Unique)(['email'])
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map