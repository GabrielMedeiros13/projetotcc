import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "../config/dbConnect.js"
import { globalErrorHandler, notFound } from "../middlewares/globalErrorHandler.js";
import userRoutes from "../routes/usersRoute.js";
import productsRouter from "../routes/productsRoute.js";
import categoriesRouter from "../routes/categoriesRouter.js";
import brandsRouter from "../routes/brandsRouter.js";
import colorRouter from "../routes/colorRouter.js";
import reviewRouter from "../routes/reviewRouter.js";

//Conexão com o bando de dados
dbConnect();
const app = express();

// pass incoming data
app.use(express.json());

//rotas
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/products/', productsRouter);
app.use('/api/v1/categories/', categoriesRouter);
app.use('/api/v1/brands/', brandsRouter);
app.use('/api/v1/colors/', colorRouter);
app.use('/api/v1/reviews/', reviewRouter);

//error middleware
app.use(notFound);
app.use(globalErrorHandler);
export default app;