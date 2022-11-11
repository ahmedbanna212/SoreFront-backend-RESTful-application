import internal from "stream";
import  client  from "../database";


export type Product = {
    id: number,
    name: string,
    price: number
}


export class StoreProduct {
    async create(p: Product): Promise<Product> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO products(Name,Price) VALUES($1,$2) RETURNING *';
            const result = await conn.query(sql, [p.name, p.price]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`ERROR: ${err}`);
        }
    }
    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`ERROR: ${err}`);
        }
    }
    async show(id:string): Promise<Product> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await conn.query(sql,[id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`ERROR: ${err}`);
        }
    }
    async delete(id:string):Promise<Product>{
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM products where id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            const user = result.rows[0];
            return user;
        } catch (err) {
            throw new Error(`ERROR: ${err}`);
        }
    }
    async update(value:string,id:string):Promise<Product>{
        try {
            const conn = await client.connect();
            const sql = 'UPDATE products SET name = ($1) where id=($2)';
            const result = await conn.query(sql, [value,id]);
            conn.release();
            const user = result.rows[0];
            return user;
        } catch (err) {
            throw new Error(`ERROR: ${err}`);
        }
    }
}