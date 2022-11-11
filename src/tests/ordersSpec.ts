import { StoreOrder,Order } from "../modules/orders";
import { StoreUser,User } from "../modules/users";

    const order= new StoreOrder();
    const user = new StoreUser();

    const u:User={
        id:33,
        email:"mail",
        first_name:'ahmed',
        last_name:'banna',
        password_dig:"password"
    }
    const o:Order={
        id:33,
        user_id:3,
        status:"false"
    }
describe('testing Orders CRUD operations ',()=>{
    beforeAll(async()=>{
            await user.create(u)
    })
    afterAll(async()=>{
            await user.delete('3')
        })
    it("testing order if create function is defined",async ()=>{
        expect(await order.create(o)).toBeDefined()
    })
    it("testing order if index function returns expected output",async ()=>{
        const result=await order.index()
        expect(result[0].status).toEqual("false")
    })
    it("testing order if show functionreturns expected output",async ()=>{
        const result=await order.show('2')
        expect(result.user_id).toBeTruthy
    })
    it("testing order if update function is updateing existing objects",async ()=>{
        const result=await order.update("true",'2')
        const result2=await order.show('2')
        expect(result2.status).toBeTruthy
    })
    it("testing order if delete function is deleteing existing objects",async ()=>{
        const result=await order.delete('2');
        const result2=await order.show('2');
        expect(result2).not.toBeDefined()
    })
})