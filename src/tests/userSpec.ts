import { create } from "domain";
import { StoreUser, User } from "../modules/users";
import dotenv from 'dotenv';
dotenv.config();
const user = new StoreUser();
import client from "../database";
const u: User = {
    id: 3,
    email: "example@mail.com",
    first_name: "name",
    last_name: "last name",
    password_dig: "passcode"
}
console.log('before testing')
    beforeAll(async () => {
    })
    describe("testing users module CRUD operations", () => {
    it("testing create operation to be defined", async () => {
        const result = await user.create(u);
        expect(result).toBeDefined()
    })
    it("testing index operation to be same as expected value", async () => {
        const result = await user.index();
        expect(result[0].email).toEqual(u.email)
    })
    it("testing show operation to be same as expected value", async () => {
        const result = await user.show('4');
        expect(result.first_name).toEqual(u.first_name)
    })
    it("testing update operation to update to the expected value", async () => {
        const result = await user.update("newemail.com", '4');
        const result2 = await user.show('4');
        expect(result2.email).toEqual("newemail.com")
    })
    it("testing delete operation to delete the insertations", async () => {
        const result = await user.delete( '4');
        const result2 = await user.show('4');
        expect(result2).not.toBeDefined()
    })
})