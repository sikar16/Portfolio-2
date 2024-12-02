import prisma from "../../config/prisma.js";
import projectCategorySchem from "./projectCategorySchem.js";

const projectCategoryController={
    // getAllprojectCategory:async (req,res,next)=>{
    //     try {
    //         const projectCategory=await prisma.projectCategory.findMany({
    //           where:{
    //             id:+req.user.id
    //           }
    //         }) 
    //         return res.status(200).json({
    //          success: true,
    //          message: "fetching all project category",
    //          data: projectCategory,
    //        });
    //      } catch (error) {
    //          return res.status(500).json({
    //              success: false,
    //              message: `${error}`,
    //            });
    //      }
    // },
    getAllprojectCategory: async (req, res, next) => {
      try {
          const projectCategories = await prisma.projectCategory.findMany({
              where: {
                  userId: req.user.id
              }
          });
  
          return res.status(200).json({
              success: true,
              message: "Fetching all project categories.",
              data: projectCategories, 
          });
      } catch (error) {
          return res.status(500).json({
              success: false,
              message: error.message,
          });
      }
  },

  //   getMyprojectCategory: async (req, res, next) => {
  //     try {
  //         const projectCategories = await prisma.projectCategory.findMany({
  //             where: {
  //                 userId: req.user.id 
  //               }
  //         });
  
  //         return res.status(200).json({
  //             success: true,
  //             message: "Fetching all project categories r",
  //             data: projectCategories, 
  //         });
  //     } catch (error) {
  //         return res.status(500).json({
  //             success: false,
  //             message: error.message, 
  //         });
  //     }
  // },
  getSingleprojectCategory: async (req, res, next) => {
    try {
        const projectCategoryId = parseInt(req.params.id, 10);

        if (isNaN(projectCategoryId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid project category ID",
            });
        }

        const projectCategory = await prisma.projectCategory.findFirst({
            where: {
                id: projectCategoryId,
                userId: req.user.id, 
            },
        });

        if (!projectCategory) {
            return res.status(404).json({
                success: false,
                message: "Project category not found or you do not have permission to view it",
            });
        }

        return res.status(200).json({
            success: true,
            data: projectCategory,
        });
    } catch (error) {
        console.error("Error fetching project category:", error); 
        return res.status(500).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }
},
    createprojectCategory: async (req, res, next) => {
      try {
        const data = projectCategorySchem.create.parse(req.body);
       
        const isprojectCategoryExist = await prisma.projectCategory.findFirst({
          where: {
            name: data.name,
            userId:+ req.user.id
          },
        });
  
        if (isprojectCategoryExist) {
          return res.status(400).json({
            success: false,
            message: "This project Category is already registered",
          });
        }
          const newprojectCategory = await prisma.projectCategory.create({
          data: {
            name: data.name,
            userId: +req.user.id,
          },
        });
  
        return res.status(201).json({
          success: true,
          message: "project category created successfully",
          data: newprojectCategory,
        });
      } catch (error) {
        console.error("Error:", error); 
        return res.status(500).json({
          success: false,
          message: error
        });
      }
    },
    updateprojectCategory: async (req, res, next) => {
      try {
          const projectCategoryId = parseInt(req.params.id, 10);
          if (isNaN(projectCategoryId)) {
              return res.status(400).json({
                  success: false,
                  message: "Invalid project category ID",
              });
          }
  
          const data = projectCategorySchem.update.parse(req.body);
  
          const projectCategory = await prisma.projectCategory.findFirst({
              where: {
                  id: projectCategoryId,
                  userId: req.user.id,
              },
          });
  
          if (!projectCategory) {
              return res.status(404).json({
                  success: false,
                  message: "Project category not found or you do not have permission to update it",
              });
          }
  
          const updatedProjectCategory = await prisma.projectCategory.update({
              where: { id: projectCategoryId },
              data: {
                  name: data.name,
              },
          });
  
          return res.status(200).json({
              success: true,
              message: "Project category updated successfully",
              data: updatedProjectCategory,
          });
      } catch (error) {
          console.error("Error updating project category:", error);
          return res.status(500).json({
              success: false,
              message: `Error - ${error.message}`,
          });
      }
  },
  deleteprojectCategory: async (req, res, next) => {
    try {
        const projectCategoryId = parseInt(req.params.id, 10);
        if (isNaN(projectCategoryId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid project category ID",
            });
        }
        const projectCategory = await prisma.projectCategory.findUnique({
            where: {
                id: projectCategoryId,
                userId: req.user.id,
            },
        });

        if (!projectCategory) {
            return res.status(404).json({
                success: false,
                message: "Project category not found or you do not have permission to delete it",
            });
        }

        await prisma.projectCategory.delete({
            where: { id: projectCategoryId },
        });
        return res.status(200).json({
            success: true,
            message: "Project category deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting project category:", error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: `Error - ${error.message}`,
        });
    }
},
}


export default projectCategoryController;