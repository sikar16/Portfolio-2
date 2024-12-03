import express from "express";
import serviceController from "./serviceController.js";
import { isAuth, isUser } from "../../middleware/auth.js";

const serviceRoute=express.Router()
serviceRoute.get("/:id",[isAuth, isUser],serviceController.getSingleservice)
serviceRoute.get("/",[isAuth, isUser],serviceController.getAllservice)
serviceRoute.post("/create",[isAuth, isUser],serviceController.createservice)
serviceRoute.put("/:id",[isAuth, isUser],serviceController.updateservice)
serviceRoute.delete("/:id",[isAuth, isUser],serviceController.deleteservice)
export default serviceRoute