import express from "express"
import blogController from "./blogController.js"
import { isAuth, isUser } from "../../middleware/auth.js"

const blogRoute=express.Router()
blogRoute.get("/:id",[isAuth,isUser],blogController.getSingleBlog),
blogRoute.get("/",[isAuth,isUser],blogController.getAllBlog),
blogRoute.post("/create",[isAuth,isUser],blogController.createBlog),
blogRoute.put("/update/:id",[isAuth,isUser],blogController.updateBlog),
blogRoute.delete("/delete/:id",[isAuth,isUser],blogController.deleteBlog)

export default blogRoute
