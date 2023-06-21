import exppress from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createColorController, deleteColorController, getAllColorsController, getSingleColorController, updateColorController } from "../controllers/colorsController.js";



const colorRouter = exppress.Router()
colorRouter.post('/', isLoggedIn, createColorController);
colorRouter.get('/', getAllColorsController)
colorRouter.get('/:id', getSingleColorController);
colorRouter.delete('/:id', deleteColorController);
colorRouter.put('/:id', updateColorController);



export default colorRouter;

