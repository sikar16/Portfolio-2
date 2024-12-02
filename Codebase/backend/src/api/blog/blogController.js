import prisma from "../../config/prisma.js";
import blogSchema from "./blogSchem.js";

const blogController={
    getAllBlog: async (req, res) => {
      try {
          const blogs = await prisma.blog.findMany({
              where: {
                  userId: +req.user.id 
              }
          });

          return res.status(200).json({
              success: true,
              message: "Fetching all blogs for the user",
              data: blogs,
          });
      } catch (error) {
          return res.status(500).json({
              success: false,
              message: `Error fetching blogs: ${error.message}`,
          });
      } 
    },
    getSingleBlog: async (req, res) => {
      try {
          const blogId = parseInt(req.params.id, 10);

          if (isNaN(blogId)) {
              return res.status(400).json({
                  success: false,
                  message: "Invalid blog ID",
              });
          }

          const blog = await prisma.blog.findFirst({
              where: {
                  id: blogId,
                  userId: req.user.id 
              }
          });

          if (!blog) {
              return res.status(404).json({
                  success: false,
                  message: "Blog not found or you do not have permission to view it",
              });
          }

          return res.status(200).json({
              success: true,
              data: blog,
          });
      } catch (error) {
          return res.status(500).json({
              success: false,
              message: `Error fetching blog: ${error.message}`, // Improved error message
          });
      }
    },
    createBlog: async (req, res) => {
        try {
          const data = blogSchema.create.parse(req.body);
          const isBlogExist = await prisma.blog.findFirst({ 
            where: {
              content: data.content,
              userId:req.user.id
            },
          });
      
          if (isBlogExist) {
            return res.status(400).json({
              success: false,
              message: "This blog is already created",
            });
          }
      
          const newBlog = await prisma.blog.create({
            data: {
              title: data.title,
              content: data.content,
              userId: req.user.id,
              blogImages: {
                create: data.blogImage.map((img) => ({
                  imageUrl: img.imageUrl,
                })),
              },
            },
          });
      
          return res.status(201).json({ 
            success: true,
            message: "Blog created successfully",
            data: newBlog,
          });
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: `Error - ${error.message}`,
          });
        }
    },
    updateBlog:async (req,res)=>{
      try {
        const blogId = parseInt(req.params.id, 10);
        if (isNaN(blogId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid blog ID",
          });
        }
        const data = blogSchema.update.parse(req.body);
        const isblogExist = await prisma.blog.findFirst({
          where: {
            id:data.blogId,
            userId: req.user.id
          },
        });
    
        if (!isblogExist) {
          return res.status(400).json({
            success: false,
            message: "This blog not found",
          });
        }
        const updateBlog=await prisma.blog.update({
          where: {
            id: blogId,
          },
          data:{
            content:data.content,
            title:data.title,
            blogImages: {
              create: data.blogImage.map((img) => ({
                imageUrl: img.imageUrl,
              })),
            },
          }
        })
        
        return res.status(200).json({
          success: true,
          message: "blog updated successfully",
          data: updateBlog,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: `Error - ${error.message}`,
        });
      }
    },
    // deleteBlog: async (req, res) => {
    //   try {
    //     const blogId = parseInt(req.params.id, 10);
        
    //     if (isNaN(blogId)) {
    //       return res.status(400).json({
    //         success: false,
    //         message: "Invalid blog ID",
    //       });
    //     }
    
    //     const blog = await prisma.blog.findFirst({
    //       where: {
    //         id: blogId,
    //         userId: req.user.id 
    //       },
    //     });
    
    //     if (!blog) {
    //       return res.status(404).json({
    //         success: false,
    //         message: "Blog not found",
    //       });
    //     }
    
    //     await prisma.blogImage.deleteMany({
    //       where: {
    //         blogId: blogId, 
    //       },
    //     });
    
    //   const deleteblog=  await prisma.blog.delete({
    //       where: {
    //         id: blogId,
    //       },
    //     });
    //     return res.status(200).json({
    //       success: true,
    //       message: "blog delete successfully",
    //       data: deleteblog,
    //     });
    //   } catch (error) {
    //     console.error("Error deleting blog:", error);
    //     return res.status(500).json({
    //       success: false,
    //       message: "Error - " + error.message,
    //     });
    //   }
    // },

    deleteBlog: async (req, res) => {
      try {
          const blogId = parseInt(req.params.id, 10);
          
          if (isNaN(blogId)) {
              return res.status(400).json({
                  success: false,
                  message: "Invalid blog ID",
              });
          }
            const blog = await prisma.blog.findFirst({
              where: {
                  id: blogId,
                  userId: req.user.id 
              },
          });
  
          if (!blog) {
              return res.status(404).json({
                  success: false,
                  message: "Blog not found or you do not have permission to delete it",
              });
          }
            await prisma.blogImage.deleteMany({
              where: {
                  blogId: blogId, 
              },
          });
            const deletedBlog = await prisma.blog.delete({
              where: {
                  id: blogId,
              },
          });
  
          return res.status(200).json({
              success: true,
              message: "Blog deleted successfully",
              data: deletedBlog,
          });
      } catch (error) {
          console.error("Error deleting blog:", error);
          return res.status(500).json({
              success: false,
              message: "Error - " + error.message,
          });
      }
  },
}

export default blogController