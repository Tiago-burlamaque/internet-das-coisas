import mysql2 from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const db = mysql2.createPool({
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    user: process.env.USER,
    host: process.env.HOST
})

export default db;