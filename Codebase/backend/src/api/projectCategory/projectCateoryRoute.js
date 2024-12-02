import express from "express"
import projectCategoryController from "./projectCategoryController.js"
import { isAuth, isUser } from "../../middleware/auth.js"

const projectCategoryRoute=express.Router()
projectCategoryRoute.get("/:id",[isAuth,isUser],projectCategoryController.getSingleprojectCategory),
projectCategoryRoute.get("/",[isAuth,isUser],projectCategoryController.getAllprojectCategory),
projectCategoryRoute.post("/create",[isAuth,isUser],projectCategoryController.createprojectCategory),
projectCategoryRoute.put("/update/:id",[isAuth,isUser],projectCategoryController.updateprojectCategory),
projectCategoryRoute.delete("/delete/:id",[isAuth,isUser],projectCategoryController.deleteprojectCategory)

export default projectCategoryRoute