//create route user

import { Router } from "express";
import { UserController } from "../../controllers/UserControllers/imports";




const router = Router();


export const userRoutes = router;


router.post("/", UserController.createUser)
router.get("/:uuid", UserController.retrieveUser)
router.get("/", UserController.listUsers)
