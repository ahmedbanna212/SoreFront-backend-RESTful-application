"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let client = new pg_1.Pool();
const { user, password, host, database, database_test, } = process.env;
if (process.env.ENV === "dev") {
    client = new pg_1.Pool({
        user,
        password,
        host,
        database,
    });
}
else if (process.env.ENV === "test") {
    client = new pg_1.Pool({
        user,
        password,
        host,
        database: database_test,
    });
}
exports.default = client;
