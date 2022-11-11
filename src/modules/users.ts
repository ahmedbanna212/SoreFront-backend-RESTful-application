import  client  from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export type User = {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    password_dig: string
}
const { salt, papper } = process.env

export class StoreUser {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`ERROR: ${err}`);
        }
    }
    async create(u: User): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (email,First_Name,Last_Name,password_DIG) VALUES ($1,$2,$3,$4) RETURNING *';
            const hash = bcrypt.hashSync(u.password_dig + papper, parseInt(process.env.salt!))
            const result = await conn.query(sql, [u.email, u.first_name, u.last_name, hash]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`ERROR: ${err}`);
        }
    }
    async show(id: string): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            const user = result.rows[0];
            return user;
        } catch (err) {
            throw new Error(`ERROR: ${err}`);
        }
    }
    async authenticate(email: string, password: string): Promise<User | null> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE email=($1)';
            const result = await conn.query(sql, [email]);
            const user = result.rows[0];
            conn.release();
            if (user != undefined) {
                if (bcrypt.compareSync(password + papper, user.password_dig)) {
                    return user
                }
                return null;
            } else {
                return null
            }
        } catch (err) {
            throw new Error(`ERROR: ${err}`);
        }
    }
    async delete(id:string):Promise<User>{
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM users where id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            const user = result.rows[0];
            return user;
        } catch (err) {
            throw new Error(`ERROR: ${err}`);
        }
    }
    async update(value:string,id:string):Promise<User>{
        try {
            const conn = await client.connect();
            const sql = 'UPDATE users SET email = ($1) where id=($2)';
            const result = await conn.query(sql, [value,id]);
            conn.release();
            const user = result.rows[0];
            return user;
        } catch (err) {
            throw new Error(`ERROR: ${err}`);
        }
    }
}