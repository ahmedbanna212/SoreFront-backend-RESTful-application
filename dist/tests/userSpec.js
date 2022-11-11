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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../modules/users");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user = new users_1.StoreUser();
const u = {
    id: 3,
    email: "example@mail.com",
    first_name: "name",
    last_name: "last name",
    password_dig: "passcode"
};
console.log('before testing');
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
}));
describe("testing users module CRUD operations", () => {
    it("testing create operation to be defined", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.create(u);
        expect(result).toBeDefined();
    }));
    it("testing index operation to be same as expected value", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.index();
        expect(result[0].email).toEqual(u.email);
    }));
    it("testing show operation to be same as expected value", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.show('4');
        expect(result.first_name).toEqual(u.first_name);
    }));
    it("testing update operation to update to the expected value", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.update("newemail.com", '4');
        const result2 = yield user.show('4');
        expect(result2.email).toEqual("newemail.com");
    }));
    it("testing delete operation to delete the insertations", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.delete('4');
        const result2 = yield user.show('4');
        expect(result2).not.toBeDefined();
    }));
});
