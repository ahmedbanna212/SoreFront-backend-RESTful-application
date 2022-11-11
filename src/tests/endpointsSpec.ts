import supertest from "supertest";
import { Request, response } from "express";
import app from "../server";
import { StoreUser,User } from "../modules/users";
import { json } from "body-parser";
const user=new StoreUser();
const request = supertest(app);
const u:User={
    id:33,
    email:"example@gmail.com",
    first_name:'ahmed',
    last_name:'banna',
    password_dig:"13579852x"
}
let token:string;
describe("project endpoints test suite", async () => {
    beforeAll(async()=>{
        await user.create(u)
    })
    afterAll(async()=>{
        await user.delete('1')
    })
    describe("user endpoints",()=>{
        it("user authorization endpoint success", async () => {
            const response = await request.post('/auth').send({
                "email": "example@gmail.com",
                "password": "13579852x"
            })
            token ="Bearer "+ response.body;
            expect(response.status).toBe(200);
        })
        it("user authorization endpoint failer", async () => {
            const response = await request.post('/auth').send({
                "email": "example@gmail.com",
                "password": "13579852"
            })
            expect(response.status).toBe(400);
        })
        it("user index will retuen 200 because it has jwt token", async () => {
            const response = await request.get('/index').set("Content-type",'application/json').set("Authorization",token)
            expect(response.status).toBe(200);
        })
        it("user index will retuen 401 because it need jwt authorization", async () => {
            const response = await request.get('/index')
            expect(response.status).toBe(401);
        })
        it("user show function will retuen 200 because it has the jwt token", async () => {
            const response = await request.get('/show/1').set("Content-type",'application/json').set("Authorization",token)
            expect(response.status).toBe(200);
        })
        it("user show function will retuen 401 because it need jwt authorization", async () => {
            const response = await request.get('/show/1')
            expect(response.status).toBe(401);
        })
        it("user create function will retuen 401 because it need jwt authorization", async () => {
            const response = await request.post('/create').send(
                {
                    "email":"example@gmail.com",
                    "first_name":'ahmed',
                    "last_name":'banna',
                    "password_dig":"13579852x"
                }
            )
            expect(response.status).toBe(401);
        })
        it("user create function will retuen 401 because it need jwt authorization", async () => {
            const response = await request.post('/create')
            .set("Content-type",'application/json')
            .set("Authorization",token)
            .send(
                {
                    "email":"example@mail.com",
                    "first_name":'ahmed',
                    "last_name":'banna',
                    "password_dig":"passcode"
                }
            )
            expect(response.status).toBe(200);
        })
    })
    describe("product endpoints",()=>{
        it("product index endpoint", async () => {
            const response = await request.get('/products')
            expect(response.status).toBe(200);
        })
        it("product show endpoint", async () => {
            const response = await request.get('/showProduct/1')
            expect(response.status).toBe(200);
        })
        it("product show endpoint return 401 as it does not have accurate id", async () => {
            const response = await request.get('/showProduct/f')
            expect(response.status).toBe(401);
        })
        it("create endpoint suppose to return status of 401 beacuse there is no authorization", async () => {
            const response = await request.post('/createProduct')
            expect(response.status).toBe(401);
        })
        it("create endpoint", async () => {
            const response = await request.post('/createProduct')
            .set("Content-type",'application/json')
            .set("Authorization",token)
            .send(
                {
                    "name":'jeans',
                    "price": 500
                }
            )
            expect(response.status).toBe(200);
        })
    })
    describe("order endpoints",()=>{
        it("order index enpoint will return 401 as it needs authorization", async () => {
            const response = await request.get('/orders')
            expect(response.status).toBe(401);
        })
        it("order index enpoint will return 200 with jwt token", async () => {
            const response = await request.get('/orders')
            .set("Content-type",'application/json')
            .set("Authorization",token)
            expect(response.status).toBe(200);
        })
        it("order create enpoint will return 401 as it needs authorization", async () => {
            const response = await request.post('/create/order')
            expect(response.status).toBe(401);
        })
        it("order create enpoint will return 200 with token", async () => {
            const response = await request.post('/create/order')
            .set("Content-type",'application/json')
            .set("Authorization",token)
            .send(
                {
                    "user_id":2,
                    "status":"false"
                }
            )
            expect(response.status).toBe(200);
        })
    })
    describe("cart endpoints",()=>{
        it("cart index endpoint will return status of 401 as it needs jwt token", async () => {
            const response = await request.get('/carts')
            expect(response.status).toBe(401);
        })
        it("cart index endpoint will return 200 with jwt", async () => {
            const response = await request.get('/carts')
            .set("Content-type",'application/json')
            .set("Authorization",token)
            expect(response.status).toBe(200);
        })
        it("show cart endpoint will return status of 401 as it needs jwt token", async () => {
            const response = await request.get('/cart/2')
            expect(response.status).toBe(401);
        })
        it("create cart endpoint will return  200  with jwt", async () => {
            const response = await request.post('/productInCart')
            .set("Content-type",'application/json')
            .set("Authorization",token)
            .send({
                    "quantity":10,
                    "order_id":1,
                    "product_id":1
            })
            expect(response.status).toBe(200);
        })
        it("show cart endpoint will return 200 with token", async () => {
            const response = await request.get('/cart/2')
            .set("Content-type",'application/json')
            .set("Authorization",token)
            expect(response.status).toBe(200);
        })
        it("create cart endpoint will return  400  without jwt", async () => {
            const response = await request.post('/productInCart')
            expect(response.status).toBe(401);
        })
    })
})