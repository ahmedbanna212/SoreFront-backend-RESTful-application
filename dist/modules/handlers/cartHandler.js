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
exports.cartHandler = void 0;
const orderProducts_1 = require("../orderProducts");
const dotenv_1 = __importDefault(require("dotenv"));
const authorizer_1 = __importDefault(require("../../middleware/authorizer"));
dotenv_1.default.config();
const cart = new orderProducts_1.StoreOrderProducts();
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cart.show(req.params.id);
        res.json(result);
    }
    catch (err) {
        res.status(401).json(`error :${err}`);
        return;
    }
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cart.index();
        res.json(result);
    }
    catch (err) {
        res.status(401).json(`error :${err}`);
        return;
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quantity = req.body.quantity;
        const OID = req.body.order_id;
        const PID = req.body.product_id;
        const result = yield cart.create(quantity, OID, PID);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(401).json(`error :${err}`);
        return;
    }
});
const cartHandler = (app) => {
    app.get("/cart/:id", authorizer_1.default, show);
    app.post("/productInCart", authorizer_1.default, create);
    app.get("/carts", authorizer_1.default, index);
};
exports.cartHandler = cartHandler;
