import express from "express";
import { connectDB } from "./config/database.js"; 
import authRoute from "./routes/Auth.js";
import userRoute from "./routes/User.js";
import cors from "cors";
import cookieParser from "cookie-parser";



import dotenv from "dotenv";
dotenv.config();

const app = express();

connectDB();

const PORT = process.env.PORT || 4000; 

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200
}))

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);


app.get("/", (req, res) => {
  res.send("SERVER RUNNING");
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:4000");
});
