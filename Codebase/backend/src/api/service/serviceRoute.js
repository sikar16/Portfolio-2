import express from "express";
import serviceController from "./serviceController.js";

const serviceRoute=express.Router()
serviceRoute.get("/:id",serviceController.getSingleservice)
serviceRoute.get("/",serviceController.getAllservice)
serviceRoute.post("/create",serviceController.createservice)
serviceRoute.put("/:id",serviceController.updateservice)
serviceRoute.delete("/:id",serviceController.deleteservice)
export default serviceRoute