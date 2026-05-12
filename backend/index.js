import express from "express";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();
const port = 8000;

app.use(express.json())
app.use("/", authRouter);

app.listen(port, () => {
  
  console.log("Server started successfully ");
  connectDB();
});
