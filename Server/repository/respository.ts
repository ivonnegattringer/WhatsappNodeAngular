import { createConnection } from "typeorm";

const connection = createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "passme",
    database: "WhatsAppDB"
});