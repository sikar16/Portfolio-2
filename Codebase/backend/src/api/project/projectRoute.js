import express from "express"
import projectController from "./projectController.js"
import { isAuth, isUser } from "../../middleware/auth.js"
const projectRoute=express.Router()
projectRoute.get("/:id",[isAuth,isUser],projectController.getSingleProject)
projectRoute.get("/",[isAuth,isUser],projectController.getAllProject)
projectRoute.post("/create",[isAuth,isUser],projectController.createProject)
projectRoute.put("/updateProject/:id",[isAuth,isUser],projectController.updateProject)
projectRoute.put("/updateProjectCategory/:id",[isAuth,isUser],projectController.updateProjectCategory)
projectRoute.delete("/delete/:id",[isAuth,isUser],projectController.deleteProject)

export default projectRoute