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
exports.mount = void 0;
const users_1 = require("../users");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorizer_1 = __importDefault(require("../../middleware/authorizer"));
dotenv_1.default.config();
const user = new users_1.StoreUser();
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const result = yield user.authenticate(email, password);
        if (result) {
            const token = jsonwebtoken_1.default.sign({ user: result }, process.env.secret);
            res.status(200).json(token);
        }
        else {
            res.status(400).json('Error');
        }
    }
    catch (err) {
        throw new Error(`error:${err}`);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const u = {
            id: 3,
            email: req.body.email,
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            password_dig: req.body.password
        };
        const result = yield user.create(u);
        res.json(result);
    }
    catch (err) {
        res.status(401).json('access denaied,Invaild data');
        return;
    }
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user.index();
        res.status(200).json(result);
    }
    catch (err) {
        res.status(401).json('access denaied,Invaild token');
        return;
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user.show(req.params.id);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(401).json('access denaied,Invaild token');
        return;
    }
});
const mount = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.post('/auth', authenticate);
    app.post('/create', authorizer_1.default, create);
    app.get('/index', authorizer_1.default, index);
    app.get('/show/:id', authorizer_1.default, show);
});
exports.mount = mount;
