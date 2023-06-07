import exppress from "express";
import { createProductController, deleteProductController, getProductController, getProductsController, updateProductController } from "../controllers/productsController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";


const productsRouter = exppress.Router();

productsRouter.post('/', isLoggedIn, createProductController);
productsRouter.get('/', getProductsController);
productsRouter.get('/:id', getProductController);
productsRouter.put('/:id', isLoggedIn, updateProductController);
productsRouter.delete('/:id/delete', isLoggedIn, deleteProductController);
export default productsRouter;