import { Application, Response, Request } from "express";
import { StoreUser, User } from "../users";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import authorizer from "../../middleware/authorizer";

dotenv.config();
const user = new StoreUser();

const authenticate = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const result = await user.authenticate(email, password);
        if (result) {
            const token = jwt.sign({ user: result }, process.env.secret!)
            res.status(200).json(token);
        }
        else {
            res.status(400).json('Error');
        }
    } catch (err) {
        throw new Error(`error:${err}`)
    }
}
const create = async (req: Request, res: Response) => {
    try {
        const u: User = {
            id: 3,
            email: req.body.email,
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            password_dig: req.body.password
        }
        const result = await user.create(u);
        res.json(result)
    } catch (err) {
        res.status(401).json('access denaied,Invaild data')
        return
    }

}
const index = async (req: Request, res: Response) => {
    try {
        const result=await user.index()
        res.status(200).json(result)
    } catch (err) {
        res.status(401).json('access denaied,Invaild token')
        return
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const result=await user.show(req.params.id)
        res.status(200).json(result)
    } catch (err) {
        res.status(401).json('access denaied,Invaild token')
        return
    }
}
export const mount = async (app: Application) => {
        app.post('/auth', authenticate)
        app.post('/create',authorizer, create)
        app.get('/index',authorizer,index)
        app.get('/show/:id',authorizer,show)
    }