import exppress from "express";
import { createCategoryController, getAllCategoriesController, getSingleCategoriesController, updateCategoryController, deleteCategoryController } from "../controllers/categoriesController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";


const categoriesRouter = exppress.Router()
categoriesRouter.post('/', isLoggedIn, createCategoryController);
categoriesRouter.get('/', getAllCategoriesController);
categoriesRouter.get('/:id', getSingleCategoriesController);
categoriesRouter.delete('/:id', deleteCategoryController);
categoriesRouter.put('/:id', updateCategoryController);



export default categoriesRouter;

