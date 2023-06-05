import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "../config/dbConnect.js"
import { globalErrorHandler, notFound } from "../middlewares/globalErrorHandler.js";
import userRoutes from "../routes/usersRoute.js";

//Conexão com o bando de dados
dbConnect();
const app = express();

// pass incoming data
app.use(express.json());

//rotas
app.use('/api/v1/users/', userRoutes);

//error middleware
app.use(notFound);
app.use(globalErrorHandler);
export default app;