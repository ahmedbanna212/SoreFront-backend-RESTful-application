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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const users_1 = require("../modules/users");
const user = new users_1.StoreUser();
const request = (0, supertest_1.default)(server_1.default);
const u = {
    id: 33,
    email: "example@gmail.com",
    first_name: 'ahmed',
    last_name: 'banna',
    password_dig: "13579852x"
};
let token;
describe("project endpoints test suite", () => __awaiter(void 0, void 0, void 0, function* () {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user.create(u);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user.delete('1');
    }));
    describe("user endpoints", () => {
        it("user authorization endpoint success", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/auth').send({
                "email": "example@gmail.com",
                "password": "13579852x"
            });
            token = "Bearer " + response.body;
            expect(response.status).toBe(200);
        }));
        it("user authorization endpoint failer", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/auth').send({
                "email": "example@gmail.com",
                "password": "13579852"
            });
            expect(response.status).toBe(400);
        }));
        it("user index will retuen 200 because it has jwt token", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/index').set("Content-type", 'application/json').set("Authorization", token);
            expect(response.status).toBe(200);
        }));
        it("user index will retuen 401 because it need jwt authorization", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/index');
            expect(response.status).toBe(401);
        }));
        it("user show function will retuen 200 because it has the jwt token", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/show/1').set("Content-type", 'application/json').set("Authorization", token);
            expect(response.status).toBe(200);
        }));
        it("user show function will retuen 401 because it need jwt authorization", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/show/1');
            expect(response.status).toBe(401);
        }));
        it("user create function will retuen 401 because it need jwt authorization", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/create').send({
                "email": "example@gmail.com",
                "first_name": 'ahmed',
                "last_name": 'banna',
                "password_dig": "13579852x"
            });
            expect(response.status).toBe(401);
        }));
        it("user create function will retuen 401 because it need jwt authorization", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/create')
                .set("Content-type", 'application/json')
                .set("Authorization", token)
                .send({
                "email": "example@mail.com",
                "first_name": 'ahmed',
                "last_name": 'banna',
                "password_dig": "passcode"
            });
            expect(response.status).toBe(200);
        }));
    });
    describe("product endpoints", () => {
        it("product index endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/products');
            expect(response.status).toBe(200);
        }));
        it("product show endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/showProduct/1');
            expect(response.status).toBe(200);
        }));
        it("product show endpoint return 401 as it does not have accurate id", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/showProduct/f');
            expect(response.status).toBe(401);
        }));
        it("create endpoint suppose to return status of 401 beacuse there is no authorization", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/createProduct');
            expect(response.status).toBe(401);
        }));
        it("create endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/createProduct')
                .set("Content-type", 'application/json')
                .set("Authorization", token)
                .send({
                "name": 'jeans',
                "price": 500
            });
            expect(response.status).toBe(200);
        }));
    });
    describe("order endpoints", () => {
        it("order index enpoint will return 401 as it needs authorization", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/orders');
            expect(response.status).toBe(401);
        }));
        it("order index enpoint will return 200 with jwt token", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/orders')
                .set("Content-type", 'application/json')
                .set("Authorization", token);
            expect(response.status).toBe(200);
        }));
        it("order create enpoint will return 401 as it needs authorization", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/create/order');
            expect(response.status).toBe(401);
        }));
        it("order create enpoint will return 200 with token", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/create/order')
                .set("Content-type", 'application/json')
                .set("Authorization", token)
                .send({
                "user_id": 2,
                "status": "false"
            });
            expect(response.status).toBe(200);
        }));
    });
    describe("cart endpoints", () => {
        it("cart index endpoint will return status of 401 as it needs jwt token", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/carts');
            expect(response.status).toBe(401);
        }));
        it("cart index endpoint will return 200 with jwt", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/carts')
                .set("Content-type", 'application/json')
                .set("Authorization", token);
            expect(response.status).toBe(200);
        }));
        it("show cart endpoint will return status of 401 as it needs jwt token", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/cart/2');
            expect(response.status).toBe(401);
        }));
        it("create cart endpoint will return  200  with jwt", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/productInCart')
                .set("Content-type", 'application/json')
                .set("Authorization", token)
                .send({
                "quantity": 10,
                "order_id": 1,
                "product_id": 1
            });
            expect(response.status).toBe(200);
        }));
        it("show cart endpoint will return 200 with token", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/cart/2')
                .set("Content-type", 'application/json')
                .set("Authorization", token);
            expect(response.status).toBe(200);
        }));
        it("create cart endpoint will return  400  without jwt", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/productInCart');
            expect(response.status).toBe(401);
        }));
    });
}));
