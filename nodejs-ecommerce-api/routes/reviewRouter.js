import exppress from "express";
import { createReviewController } from "../controllers/reviewsController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js"; 

const reviewRouter = exppress.Router();


reviewRouter.post('/:productID', isLoggedIn, createReviewController);

export default reviewRouter;
