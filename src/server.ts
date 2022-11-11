import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { StoreUser ,User} from './modules/users';
import { StoreProduct,Product } from './modules/product';
import { StoreOrder ,Order } from './modules/orders';
import { StoreOrderProducts , OrderProducts} from './modules/orderProducts';
import { mount } from './modules/handlers/userHandler';
import { handler } from './modules/handlers/productsHandler';
import { cartHandler } from './modules/handlers/cartHandler';
import { orderHandler } from './modules/handlers/orderHandler';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
const port =3000;



app.listen(port,()=>{
    try{
        console.log(`server is running on port ${port}`);
    }catch(err){
        throw new Error(`ERROR: ${err}`);
    }
})

mount(app);
handler(app);
cartHandler(app);
orderHandler(app);

const user = new StoreUser();
const product= new StoreProduct();
const order =new StoreOrder();
const cart = new StoreOrderProducts();


const p:Product={
    id:33,
    name:'suite',
    price: 500
}

const O:Order={
    id:33,
    user_id:2,
    status:"false"
}

const u:User={
    id:33,
    email:"example@gmail.com",
    first_name:'ahmed',
    last_name:'salah',
    password_dig:"13579852"
}

//uncomment the line below to create a user
//and use its data to be authorized and recive a jwt to be able to use protected end points
//user.create(u)

export default app;
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