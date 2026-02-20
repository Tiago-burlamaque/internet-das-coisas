import mysql2 from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const db = mysql2.createPool({
    host: process.env.HOST || "localhost",
    user: process.env.USER || "root",
    password: process.env.PASSWORD || "senai",
    database: process.env.DATABASE || "dourado_lanches"
})

export default db;