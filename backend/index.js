import express from 'express';
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv'

dotenv.config()


const app = express()
const port = 8000
express.json()


app.get("/" , (req,res)=>{
    res.send("hello, from server ")
})


app.listen(port, ()=>{
    console.log("Server started successfully ");
    connectDB()

    
})