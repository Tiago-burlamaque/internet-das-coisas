const mysql2 = require("mysql2/promise")
const dotenv = require("dotenv")

dotenv.config()

const db = mysql2.createPool({
    database: process.env.DATABASE,
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD
})

module.exports = db;