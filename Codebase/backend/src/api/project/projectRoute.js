import express from "express"
import projectController from "./projectController.js"
const projectRoute=express.Router()
projectRoute.get("/:id",projectController.getSingleProject)
projectRoute.get("/",projectController.getAllProject)
projectRoute.post("/create",projectController.createProject)
projectRoute.put("/:id",projectController.updateProject)
projectRoute.put("/:id",projectController.updateProjectCatgeory)
projectRoute.delete("/:id",projectController.deleteProject)

export default projectRoute