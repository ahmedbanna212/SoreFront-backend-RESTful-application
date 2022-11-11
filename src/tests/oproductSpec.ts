import { StoreUser,User } from "../modules/users";
import { StoreProduct,Product } from "../modules/product";
import { StoreOrder,Order } from "../modules/orders";
import { StoreOrderProducts,op } from "../modules/orderProducts";

const user= new StoreUser();
const product = new StoreProduct();
const order=new StoreOrder();
const cart =new StoreOrderProducts();

const u: User = {
    id: 3,
    email: "example@mail.com",
    first_name: "name",
    last_name: "last name",
    password_dig: "passcode"
}

const o:Order={
    id:33,
    user_id:2,
    status:"false"
}

const p:Product = {
    id:33,
    name:'jeans',
    price: 500
}


describe("testing card module CRUD operations",()=>{

    afterAll(async()=>{
        await product.delete('1')
        await order.delete('1')
        await user.delete('2')
    })
    it("testing create function wif it was defiend",async ()=>{
        expect(cart.create(10,1,1)).toBeDefined()
    })
    it("testing index function if it returns the expected outpot",async ()=>{
        const result = await cart.index()
        expect(result[0].quantity).toEqual(10)
    })
    it("testing show function if it returns the expected outpot",async ()=>{
        const result = await cart.show('2')
        expect(result.id).toEqual(1);
    })
    it("testing update function if it returns the expected outpot",async ()=>{
        const result = await cart.update(40,'1');
        const result2 = await cart.show('2')
        expect(result2.quantity[1]).toEqual(40);
    })
    it("testing delete function if it deletes the insert",async ()=>{
        await cart.delete('2');
        await cart.delete('1');
        const result1 = await cart.index()
        expect(result1[1]).not.toBeDefined();
    })
})