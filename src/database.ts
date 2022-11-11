import { Pool } from "pg";
import dotenv from "dotenv";


dotenv.config();
let client:Pool = new Pool()

const { user,
    password,
    host,
    database,
    database_test,
} = process.env;

if (process.env.ENV === "dev") {
    client = new Pool({
        user,
        password,
        host,
        database,
    });

} else if (process.env.ENV === "test") {
    client = new Pool({
        user,
        password,
        host,
        database: database_test,
    });

}

export default client;