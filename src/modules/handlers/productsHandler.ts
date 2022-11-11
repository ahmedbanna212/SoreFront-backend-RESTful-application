import { Application, Response, Request } from "express";
import { StoreProduct,Product } from "../product";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import authorizer from '../../middleware/authorizer';

dotenv.config();
const product = new StoreProduct();

const index = async (req: Request, res: Response) => {
    try {
        const result=await product.index()
        res.status(200).json(result)
    } catch (err) {
        res.status(401).json(`Error : ${err}`)
        return
    }
}
const show = async (req: Request, res: Response) => {
    try {
        const result = await product.show(req.params.id)
        res.status(200).json(result)
    } catch (err) {
        res.status(401).json(`Error : ${err}`)
        return
    }
}
const create = async (req: Request, res: Response) => {
    try {
        const p: Product = {
            id:3,
            name:req.body.name,
            price:req.body.price,
        }
        const result = await product.create(p);
        res.json(result)
    } catch (err) {
        res.status(401).json('access denaied,Invaild data')
        return
    }

}
export const handler=(app:Application)=>{
    app.get('/products',index);
    app.get('/showProduct/:id',show);
    app.post('/createProduct',authorizer,create);
}