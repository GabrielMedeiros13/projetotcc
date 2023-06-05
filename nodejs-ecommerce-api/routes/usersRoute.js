import exppress from "express";
import { registerUserController, loginUserController, deleteUserController, getUserProfileController } from "../controllers/usersController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const userRoutes = exppress.Router();

userRoutes.post('/register', registerUserController);
userRoutes.post('/login', loginUserController);
userRoutes.delete('/delete', deleteUserController);
userRoutes.get('/profile', isLoggedIn, getUserProfileController);

export default userRoutes;