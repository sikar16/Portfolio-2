import express from "express"
import serviceProviderController from "./serviceProviderController.js";
import { isServiceProvider } from "../../middleware/auth.js";

const serviceProviderRoute=express.Router()

serviceProviderRoute.get("/:id",serviceProviderController.getSingleServiceProvider),
serviceProviderRoute.get("/",serviceProviderController.getAllServiceProvider),
serviceProviderRoute.post("/create",serviceProviderController.createServiceProvider),
serviceProviderRoute.put("/update/:id",serviceProviderController.updateServiceProvider),
serviceProviderRoute.delete("/delete/:id",serviceProviderController.deleteServiceProvider)


export default serviceProviderRoute;