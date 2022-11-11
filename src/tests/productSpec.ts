import { StoreProduct,Product } from "../modules/product";

const p:Product = {
    id:33,
    name:'jeans',
    price: 500
}
    const product= new StoreProduct();

describe('testing Products CRUD operations ',()=>{
    it('testing create operation to be defined',async()=>{
        const result = await product.create(p);
        expect(result).toBeDefined()
    }
    )
    it('testing index operation to be defined',async()=>{
        const result = await product.index();
        expect(result[0].name).toEqual(p.name)
    }
    )
    it('testing show operation to be same as expected',async()=>{
        const result = await product.show('2');
        expect(result.name).toEqual(p.name)
    }
    )
    it('testing update operation to be same as expected',async()=>{
        const result = await product.update("newname", '2');
        const result2 = await product.show('2');
        expect(result2.name).toEqual("newname")
    }
    )
    it('testing delete operation to be delete the insertation',async()=>{
        const result = await product.delete( '2');
        const result2 = await product.show('2');
        expect(result2).not.toBeDefined()
    }
    )
})

