import express from "express"
import skillController from "./skillController.js"
import { isAuth, isUser } from "../../middleware/auth.js"

const skillRoute=express.Router()
skillRoute.get("/:id",[isAuth, isUser],skillController.getsingleSkill)
skillRoute.get("/",[isAuth, isUser],skillController.getAllSkill)
skillRoute.post("/create",[isAuth, isUser],skillController.createSkill)
skillRoute.put("/:id",[isAuth, isUser],skillController.updateSkill)
skillRoute.put("/skillcategory/:id",[isAuth, isUser],skillController.updateSkillCategory)
skillRoute.delete("/delete/:id",[isAuth, isUser],skillController.deleteSkill)

export default skillRoute