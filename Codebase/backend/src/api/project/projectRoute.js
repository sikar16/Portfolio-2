import express from "express"
import projectController from "./projectController.js"
const projectRoute=express.Router()
projectRoute.get("/:id",projectController.getSingleProject)
projectRoute.get("/",projectController.getAllProject)
projectRoute.post("/create",projectController.createProject)
projectRoute.put("/updateProject/:id",projectController.updateProject)
projectRoute.put("/updateProjectCategory/:id",projectController.updateProjectCategory)
projectRoute.delete("/delete/:id",projectController.deleteProject)

export default projectRoute