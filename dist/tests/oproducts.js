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
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../modules/users");
const product_1 = require("../modules/product");
const orders_1 = require("../modules/orders");
const orderProducts_1 = require("../modules/orderProducts");
const user = new users_1.StoreUser();
const product = new product_1.StoreProduct();
const order = new orders_1.StoreOrder();
const cart = new orderProducts_1.StoreOrderProducts();
const u = {
    id: 3,
    email: "example@mail.com",
    first_name: "name",
    last_name: "last name",
    password_dig: "passcode"
};
const o = {
    id: 33,
    user_id: 2,
    status: false
};
const p = {
    id: 33,
    name: 'jeans',
    price: 500
};
const cartInstance = {
    id: 33,
    quantity: 10,
    order_id: 1,
    product_id: 1
};
describe("testing card module CRUD operations", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user.create(u);
        yield order.create(o);
        yield product.create(p);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user.delete('2');
        yield order.delete('1');
        yield product.delete('1');
    }));
    it("testing create function wif it was defiend", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield cart.create(cartInstance.quantity, cartInstance.order_id, cartInstance.product_id)).toBeDefined();
    }));
    it("testing index function if it returns the expected outpot", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield cart.index();
        expect(result[0].quantity).toEqual(cartInstance.quantity);
    }));
    it("testing show function if it returns the expected outpot", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield cart.show('1');
        expect(result.id).toEqual(cartInstance.order_id);
    }));
    it("testing update function if it returns the expected outpot", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield cart.update(40, '1');
        const result2 = yield cart.show('1');
        expect(result2.quantity[0]).toEqual(40);
    }));
    it("testing delete function if it deletes the insert", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield cart.delete('1');
        const result2 = yield cart.show('1');
        expect(result2).not.toBeDefined();
    }));
});
