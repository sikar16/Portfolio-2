import express from "express"
import serviceProviderRoute from "../api/serviceProvider/serviceProviderRoute.js";
import publicRoute from "../api/public/publicRoute.js";
import userRoute from "../api/user/userRoute.js";
import serviceRoute from "../api/service/serviceRoute.js";
import skillCategoryRoute from "../api/skillCategory/skilCateoryRoute.js";
import projectCategoryRoute from "../api/projectCategory/projectCateoryRoute.js";
import skillRoute from "../api/skill/skillRoute.js";
import testimonyRoute from "../api/testimony/testimonyRoute.js";
import projectRoute from "../api/project/projectRoute.js";
import blogRoute from "../api/blog/blogRoute.js";
const appRoute=express.Router()
appRoute.use("/serviceProvider",serviceProviderRoute)
appRoute.use("/public",publicRoute)
appRoute.use("/user",userRoute)
appRoute.use("/service",serviceRoute)
appRoute.use("/skillCategory",skillCategoryRoute)
appRoute.use("/projectCategory",projectCategoryRoute)
appRoute.use("/skill",skillRoute)
appRoute.use("/testimony",testimonyRoute)
appRoute.use("/project",projectRoute)
appRoute.use("/blog",blogRoute)
export default appRoute;