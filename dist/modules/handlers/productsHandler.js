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
exports.handler = void 0;
const product_1 = require("../product");
const dotenv_1 = __importDefault(require("dotenv"));
const authorizer_1 = __importDefault(require("../../middleware/authorizer"));
dotenv_1.default.config();
const product = new product_1.StoreProduct();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product.index();
        res.status(200).json(result);
    }
    catch (err) {
        res.status(401).json(`Error : ${err}`);
        return;
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product.show(req.params.id);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(401).json(`Error : ${err}`);
        return;
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const p = {
            id: 3,
            name: req.body.name,
            price: req.body.price,
        };
        const result = yield product.create(p);
        res.json(result);
    }
    catch (err) {
        res.status(401).json('access denaied,Invaild data');
        return;
    }
});
const handler = (app) => {
    app.get('/products', index);
    app.get('/showProduct/:id', show);
    app.post('/createProduct', authorizer_1.default, create);
};
exports.handler = handler;
