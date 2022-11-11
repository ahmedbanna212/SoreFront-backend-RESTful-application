import { query } from "express";
import  client  from "../database";

export type OrderProducts={
    id:number,
    products_ids:number[],
    order_id:number,
    quantity:number[],
    user_id:number,
    status:boolean,
}

export type op={
    id:number,
    quantity:number,
    order_id:number,
    product_id:number,
}
export class StoreOrderProducts{
    async index():Promise<op[]>{
        try{
            const conn =await client.connect();
            const sql = 'select * from order_products'
            const result = await conn.query(sql);
            return result.rows
        }catch(err){
            throw new Error(`ERROR : ${err}`)
        }
    }
    async create(quantity:number,order_id:number,product_id:number):Promise<void>{
        try{
            const conn =await client.connect();
            const sql = 'insert into order_products(Quantity,order_id,product_id) values($1,$2,$3)'
            const result = await conn.query(sql,[quantity,order_id,product_id]);
        }catch(err){
            throw new Error(`ERROR : ${err}`)
        }
    }
    async show(id:string):Promise<OrderProducts>{
        try{
            const conn =await client.connect();
            const sql='SELECT * FROM orders INNER JOIN order_products ON orders.id = order_products.order_id where orders.User_ID=($1) AND orders.Status =($2)'
            const result = await conn.query(sql,[id,"false"]);
            const quantity=result.rows.map(object => object.quantity)
            const products=result.rows.map(object => object.product_id)

            const data:OrderProducts={
                id:result.rows[0].id,
                order_id:result.rows[0].order_id,
                products_ids:products,
                quantity:quantity,
                user_id:result.rows[0].user_id,
                status:result.rows[0].status
            }
            return data
        }catch(err){
            throw new Error(`ERROR : ${err}`)
        }

    }
    async delete(id:string):Promise<op>{
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM order_products where id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            const user = result.rows[0];
            return user;
        } catch (err) {
            throw new Error(`ERROR: ${err}`);
        }
    }
    async update(value:number,id:string):Promise<op>{
        try {
            const conn = await client.connect();
            const sql = 'UPDATE order_products SET quantity = ($1) where id=($2)';
            const result = await conn.query(sql, [value,id]);
            conn.release();
            const user = result.rows[0];
            return user;
        } catch (err) {
            throw new Error(`ERROR: ${err}`);
        }
    }
}