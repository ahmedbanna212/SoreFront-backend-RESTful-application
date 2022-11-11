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
exports.StoreOrderProducts = void 0;
const database_1 = __importDefault(require("../database"));
class StoreOrderProducts {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'select * from order_products';
                const result = yield conn.query(sql);
                return result.rows;
            }
            catch (err) {
                throw new Error(`ERROR : ${err}`);
            }
        });
    }
    create(quantity, order_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'insert into order_products(Quantity,order_id,product_id) values($1,$2,$3)';
                const result = yield conn.query(sql, [quantity, order_id, product_id]);
            }
            catch (err) {
                throw new Error(`ERROR : ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id where orders.User_ID=($1) AND orders.Status =($2)';
                const result = yield conn.query(sql, [id, "false"]);
                const quantity = result.rows.map(object => object.quantity);
                const products = result.rows.map(object => object.product_id);
                const data = {
                    id: result.rows[0].id,
                    order_id: result.rows[0].order_id,
                    products_ids: products,
                    quantity: quantity,
                    user_id: result.rows[0].user_id,
                    status: result.rows[0].status
                };
                return data;
            }
            catch (err) {
                throw new Error(`ERROR : ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM order_products where id=($1)';
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
                const sql = 'UPDATE order_products SET quantity = ($1) where id=($2)';
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
exports.StoreOrderProducts = StoreOrderProducts;
