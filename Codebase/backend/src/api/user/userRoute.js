import express from "express"
import userController from "./userController.js";
import { isAuth, isServiceProvider, isUser } from "../../middleware/auth.js";

const userRoute=express.Router()
userRoute.get("/:id",userController.getSingleUser),
userRoute.get("/",[isAuth,isUser],userController.getAllUser),
userRoute.post("/create",userController.createUser),
userRoute.put("/updateUser/:id",userController.updateUser),
userRoute.put("/updateUserInfo/:id",userController.updateUserInfo),
userRoute.put("/updateUserDetail/:id",userController.updateUserDetail),
userRoute.delete("/delete/:id",userController.deleteUser)

export default userRoute;