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
exports.StoreUser = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { salt, papper } = process.env;
class StoreUser {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`ERROR: ${err}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users (email,First_Name,Last_Name,password_DIG) VALUES ($1,$2,$3,$4) RETURNING *';
                const hash = bcrypt_1.default.hashSync(u.password_dig + papper, parseInt(process.env.salt));
                const result = yield conn.query(sql, [u.email, u.first_name, u.last_name, hash]);
                conn.release();
                return result.rows[0];
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
                const sql = 'SELECT * FROM users WHERE id=($1)';
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
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHERE email=($1)';
                const result = yield conn.query(sql, [email]);
                const user = result.rows[0];
                conn.release();
                if (user != undefined) {
                    if (bcrypt_1.default.compareSync(password + papper, user.password_dig)) {
                        return user;
                    }
                    return null;
                }
                else {
                    return null;
                }
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
                const sql = 'DELETE FROM users where id=($1)';
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
                const sql = 'UPDATE users SET email = ($1) where id=($2)';
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
exports.StoreUser = StoreUser;
