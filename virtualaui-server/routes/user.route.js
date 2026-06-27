import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { getAllUsers, getcurrentUser } from '../controllers/user.controller.js';
import isAdmin from "../middlewares/isAdmin.js";


const userRouter = express.Router();

userRouter.get("/current-user", isAuth, getcurrentUser);
userRouter.get("/all-users", isAuth, isAdmin, getAllUsers);

export default userRouter;