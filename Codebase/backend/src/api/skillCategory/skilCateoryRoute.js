import express from "express"
import skillCategoryController from "./skillCategoryController.js"

const skillCategoryRoute=express.Router()
skillCategoryRoute.get("/:id",skillCategoryController.getSingleSkillCatgeory),
skillCategoryRoute.get("/",skillCategoryController.getAllSkillCatgeory),
skillCategoryRoute.post("/create",skillCategoryController.createSkillCategory),
skillCategoryRoute.put("/update/:id",skillCategoryController.updateSkillCatgeory),
skillCategoryRoute.delete("/delete/:id",skillCategoryController.deleteSkillCategory)

export default skillCategoryRoute