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
const product_1 = require("../modules/product");
const p = {
    id: 33,
    name: 'jeans',
    price: 500
};
const product = new product_1.StoreProduct();
describe('testing Products CRUD operations ', () => {
    it('testing create operation to be defined', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product.create(p);
        expect(result).toBeDefined();
    }));
    it('testing index operation to be defined', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product.index();
        expect(result[0].name).toEqual(p.name);
    }));
    it('testing show operation to be same as expected', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product.show('2');
        expect(result.name).toEqual(p.name);
    }));
    it('testing update operation to be same as expected', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product.update("newname", '2');
        const result2 = yield product.show('2');
        expect(result2.name).toEqual("newname");
    }));
    it('testing delete operation to be delete the insertation', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield product.delete('2');
        const result2 = yield product.show('2');
        expect(result2).not.toBeDefined();
    }));
});
