import { Application, Response, Request } from "express";
import { StoreOrderProducts } from "../orderProducts";
import dotenv from 'dotenv';
import authorizer from '../../middleware/authorizer';
dotenv.config();

const cart =new StoreOrderProducts();

const show = async (req: Request, res: Response) => {
    try {
        const result = await cart.show(req.params.id);
        res.json(result)
    } catch (err) {
        res.status(401).json(`error :${err}`)
        return
    }

}
const index = async (req: Request, res: Response) => {
    try {
        const result = await cart.index();
        res.json(result)
    } catch (err) {
        res.status(401).json(`error :${err}`)
        return
    }

}
const create = async (req: Request, res: Response) => {
    try {
        const quantity=req.body.quantity
        const OID=req.body.order_id
        const PID=req.body.product_id
        const result = await cart.create(quantity,OID,PID);
        res.status(200).json(result)
    } catch (err) {
        res.status(401).json(`error :${err}`)
        return
    }

}
export const cartHandler=(app:Application)=>{
    app.get("/cart/:id",authorizer,show)
    app.post("/productInCart",authorizer,create)
    app.get("/carts",authorizer,index)
}