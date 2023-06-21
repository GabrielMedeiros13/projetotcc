import exppress from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createBrandController, deleteBrandController, getAllBrandsController, getSingleBrandController, updateBrandController } from "../controllers/brandsController.js";


const brandsRouter = exppress.Router()
brandsRouter.post('/', isLoggedIn, createBrandController);
brandsRouter.get('/', getAllBrandsController)
brandsRouter.get('/:id', getSingleBrandController);
brandsRouter.delete('/:id', deleteBrandController);
brandsRouter.put('/:id', updateBrandController);



export default brandsRouter;

