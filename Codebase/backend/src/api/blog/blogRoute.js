import express from "express"
import blogController from "./blogController.js"

const blogRoute=express.Router()
blogRoute.get("/:id",blogController.getSingleBlog),
blogRoute.get("/",blogController.getAllBlog),
blogRoute.post("/create",blogController.createBlog),
blogRoute.put("/update/:id",blogController.updateBlog),
blogRoute.delete("/delete/:id",blogController.deleteBlog)

export default blogRoute
