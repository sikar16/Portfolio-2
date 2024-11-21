import express from "express"
import skillController from "./skillController.js"

const skillRoute=express.Router()
skillRoute.get("/:id",skillController.getsingleSkill)
skillRoute.get("/",skillController.getAllSkill)
skillRoute.post("/create",skillController.createSkill)
skillRoute.put("/:id",skillController.updatdSkill)
skillRoute.put("/skillcategory/:id",skillController.updatdSkillCategory)
skillRoute.delete("/delete/:id",skillController.deleteSkill)

export default skillRoute