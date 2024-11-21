import express from "express"
import projectCategoryController from "./projectCategoryController.js"

const projectCategoryRoute=express.Router()
projectCategoryRoute.get("/:id",projectCategoryController.getSingleprojectCategory),
projectCategoryRoute.get("/",projectCategoryController.getAllprojectCategory),
projectCategoryRoute.post("/create",projectCategoryController.createprojectCategory),
projectCategoryRoute.put("/update/:id",projectCategoryController.updateprojectCategory),
projectCategoryRoute.delete("/delete/:id",projectCategoryController.deleteprojectCategory)

export default projectCategoryRoute