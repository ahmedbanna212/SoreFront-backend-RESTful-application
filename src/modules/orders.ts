import  client  from "../database";

export type Order={
    id:number,
    user_id:number,
    status:string
}

export class StoreOrder{
    async index():Promise<Order[]>{
        try{
        const conn = await client.connect();
        const sql='SELECT * from orders'
        const result =await conn.query(sql);
        conn.release();
        return result.rows;
        }catch(err){
            throw new Error(`ERROR: ${err}`)
        }
    }
    async create(o:Order):Promise<Order>{
        try{
            const conn = await client.connect();
            const sql='INSERT INTO orders(User_ID,Status) values ($1,$2) RETURNING *'
            const result =await conn.query(sql,[o.user_id,o.status]);
            conn.release();
            return result.rows[0];
            }catch(err){
                throw new Error(`ERROR: ${err}`)
            }
    }
    async show(id:string):Promise<Order>{
        try{
            const conn = await client.connect();
            const sql='SELECT * from orders where id=($1)'
            const result =await conn.query(sql,[id]);
            conn.release();
            return result.rows[0];
            }catch(err){
                throw new Error(`ERROR: ${err}`)
            }
    }
    async delete(id:string):Promise<Order>{
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM orders where id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            const user = result.rows[0];
            return user;
        } catch (err) {
            throw new Error(`ERROR: ${err}`);
        }
    }
    async update(value:string,id:string):Promise<Order>{
        try {
            const conn = await client.connect();
            const sql = 'UPDATE orders SET Status = ($1) where id=($2)';
            const result = await conn.query(sql, [value,id]);
            conn.release();
            const user = result.rows[0];
            return user;
        } catch (err) {
            throw new Error(`ERROR: ${err}`);
        }
    }
}