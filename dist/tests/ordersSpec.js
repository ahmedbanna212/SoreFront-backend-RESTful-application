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
const orders_1 = require("../modules/orders");
const users_1 = require("../modules/users");
const order = new orders_1.StoreOrder();
const user = new users_1.StoreUser();
const u = {
    id: 33,
    email: "mail",
    first_name: 'ahmed',
    last_name: 'banna',
    password_dig: "password"
};
const o = {
    id: 33,
    user_id: 3,
    status: "false"
};
describe('testing Orders CRUD operations ', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user.create(u);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user.delete('3');
    }));
    it("testing order if create function is defined", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield order.create(o)).toBeDefined();
    }));
    it("testing order if index function returns expected output", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.index();
        expect(result[0].status).toEqual("false");
    }));
    it("testing order if show functionreturns expected output", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.show('2');
        expect(result.user_id).toBeTruthy;
    }));
    it("testing order if update function is updateing existing objects", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.update("true", '2');
        const result2 = yield order.show('2');
        expect(result2.status).toBeTruthy;
    }));
    it("testing order if delete function is deleteing existing objects", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.delete('2');
        const result2 = yield order.show('2');
        expect(result2).not.toBeDefined();
    }));
});
