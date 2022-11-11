"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const users_1 = require("./modules/users");
const product_1 = require("./modules/product");
const orders_1 = require("./modules/orders");
const orderProducts_1 = require("./modules/orderProducts");
const userHandler_1 = require("./modules/handlers/userHandler");
const productsHandler_1 = require("./modules/handlers/productsHandler");
const cartHandler_1 = require("./modules/handlers/cartHandler");
const orderHandler_1 = require("./modules/handlers/orderHandler");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
const port = 3000;
app.listen(port, () => {
    try {
        console.log(`server is running on port ${port}`);
    }
    catch (err) {
        throw new Error(`ERROR: ${err}`);
    }
});
(0, userHandler_1.mount)(app);
(0, productsHandler_1.handler)(app);
(0, cartHandler_1.cartHandler)(app);
(0, orderHandler_1.orderHandler)(app);
const user = new users_1.StoreUser();
const product = new product_1.StoreProduct();
const order = new orders_1.StoreOrder();
const cart = new orderProducts_1.StoreOrderProducts();
const p = {
    id: 33,
    name: 'suite',
    price: 500
};
const O = {
    id: 33,
    user_id: 2,
    status: "false"
};
const u = {
    id: 33,
    email: "example@gmail.com",
    first_name: 'ahmed',
    last_name: 'salah',
    password_dig: "13579852"
};
//uncomment the line below to create a user
//and use its data to be authorized and recive a jwt to be able to use protected end points
//user.create(u)
exports.default = app;
/*

user.authenticate(u.email,u.password).then((res)=>{
    console.log(res);
});
user.delete('4');

user.update('banna','1')

user.index().then((res)=>{
    console.log(res);
})
product.create(p).then((res)=>{
    console.log(res)
})
user.show('3').then((res)=>{
    console.log(res);
})

product.create(p).then((res)=>{
    console.log(res)
})
product.show('1').then((res)=>{console.log(res)})

product.index().then((res)=>{
    console.log(res)
})

product.update('salah','1')

product.index().then((res)=>{
    console.log(res)
})

product.delete('');

order.create(O)

order.index().then((res)=>{
    console.log(res)
})
order.show('1').then((res)=>{
    console.log(res)
})

order.delete('2')

order.update(false,'1')

order.index().then((res)=>{
    console.log(res)
})


cart.show('1').then((res)=>{
    console.log(res)
})

user.index().then((res)=>{
    console.log(res);
})
product.index().then((res)=>{
    console.log(res)
})
//product.create(p)
order.index().then((res)=>{
    console.log(res)
})

*/ 
