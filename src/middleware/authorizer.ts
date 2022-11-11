import { Request,Response } from "express";
import jwt from  'jsonwebtoken';


const authorizer = async (req:Request,res:Response ,next:Function)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1]
        jwt.verify(token as string, process.env.secret!)
        next()
    } catch (err) {
        res.status(401).json('access denaied,Invaild token')
        return
    }
}

export default authorizer;