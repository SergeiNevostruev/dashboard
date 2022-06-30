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
exports.Product = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Product = (function () {
    function Product() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Product.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        (0, typeorm_1.Generated)('uuid'),
        __metadata("design:type", String)
    ], Product.prototype, "uuid", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Product.prototype, "userUuid", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Product.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Product.prototype, "tel", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Product.prototype, "teg", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Product.prototype, "price", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Product.prototype, "about", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'simple-json',
            nullable: true }),
        __metadata("design:type", String)
    ], Product.prototype, "photoUrl", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Product.prototype, "address", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'simple-json', default: { t: '0', expires_at: '0' }, nullable: true }),
        __metadata("design:type", Object)
    ], Product.prototype, "mapXY", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: 0, nullable: true }),
        __metadata("design:type", Number)
    ], Product.prototype, "views", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.products; }),
        __metadata("design:type", User_1.User)
    ], Product.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: 'timestamp with time zone' }),
        __metadata("design:type", Date)
    ], Product.prototype, "createDate", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp with time zone' }),
        __metadata("design:type", Date)
    ], Product.prototype, "updateDate", void 0);
    Product = __decorate([
        (0, typeorm_1.Entity)()
    ], Product);
    return Product;
}());
exports.Product = Product;
//# sourceMappingURL=Product.js.map