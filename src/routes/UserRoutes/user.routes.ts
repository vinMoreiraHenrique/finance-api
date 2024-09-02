//create route user

import { Router } from "express";
import { UserController } from "../../controllers/user.create.controller";



const router = Router();

const userController = new UserController();
export const userRoutes = router;


router.post("/", userController.createUser);