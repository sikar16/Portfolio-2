import express from "express"
import temstimonyController from "./testimonyController.js"
import { isAuth, isUser } from "../../middleware/auth.js"

const testimonyRoute=express.Router()
testimonyRoute.get("/:id",[isAuth,isUser],temstimonyController.getSingleTestimony)
testimonyRoute.get("/",[isAuth,isUser],temstimonyController.getAlltestimony)
testimonyRoute.post("/create",[isAuth,isUser],temstimonyController.createTestimony)
testimonyRoute.put("/update/:id",[isAuth,isUser],temstimonyController.updatetestimony)
testimonyRoute.delete("/delete/:id",[isAuth,isUser],temstimonyController.deletetestimony)

export default testimonyRoute