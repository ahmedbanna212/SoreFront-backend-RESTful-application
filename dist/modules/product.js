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
exports.StoreProduct = void 0;
const database_1 = __importDefault(require("../database"));
class StoreProduct {
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO products(Name,Price) VALUES($1,$2) RETURNING *';
                const result = yield conn.query(sql, [p.name, p.price]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`ERROR: ${err}`);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`ERROR: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products WHERE id=($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`ERROR: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM products where id=($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                const user = result.rows[0];
                return user;
            }
            catch (err) {
                throw new Error(`ERROR: ${err}`);
            }
        });
    }
    update(value, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'UPDATE products SET name = ($1) where id=($2)';
                const result = yield conn.query(sql, [value, id]);
                conn.release();
                const user = result.rows[0];
                return user;
            }
            catch (err) {
                throw new Error(`ERROR: ${err}`);
            }
        });
    }
}
exports.StoreProduct = StoreProduct;
