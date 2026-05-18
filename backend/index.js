import express from "express";
import connectDB from "./config/connectDB.js";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();



const app = express();
const port = 8000;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);

app.listen(port, () => {
  console.log("Server started successfully ");
  connectDB();
});
