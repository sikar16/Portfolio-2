import express from "express"
import temstimonyController from "./testimonyController.js"

const testimonyRoute=express.Router()
testimonyRoute.get("/:id",temstimonyController.getSingletestimony)
testimonyRoute.get("/",temstimonyController.getAlltestimony)
testimonyRoute.post("/create",temstimonyController.createtestimony)
testimonyRoute.put("/update/:id",temstimonyController.updatetestimony)
testimonyRoute.delete("/delete/:id",temstimonyController.deletetestimony)

export default testimonyRoute