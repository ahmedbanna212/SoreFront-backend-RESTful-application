import { StoreOrder,Order } from "../orders";
import { Application, Response, Request } from "express";
import authorizer from "../../middleware/authorizer";
const order = new StoreOrder();

const create = async (req: Request, res: Response) => {
    try {
        const o:Order={
            id:33,
            user_id: req.body.user_id,
            status:  req.body.status
        }
        const result = await order.create(o);
        res.status(200).json(result)
    } catch (err) {
        res.status(401).json('access denaied,Invaild data')
        return
    }

}

const index = async (req: Request, res: Response) => {
    try {
        const result = await order.index();
        res.status(200).json(result)
    } catch (err) {
        res.status(401).json('access denaied,Invaild data')
        return
    }

}
export const orderHandler=(app:Application)=>{
    app.get("/orders",authorizer,index)
    app.post("/create/order",authorizer,create)
}