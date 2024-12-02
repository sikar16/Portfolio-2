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
    getSingleprojectCategory:async (req,res,next)=>{
      try {
        const projectCategoryId=parseInt(req.params.id,10);

        if (isNaN(projectCategoryId)) {
        return res.status(400).json({
          success: false,
          message: "invalid project category id",
        });
      }

      const projectCategory=await prisma.projectCategory.findFirst({
        where:{
          id:projectCategoryId
        }
      })
      if (!projectCategory) {
        return res.status(404).json({
          success: false,
          message: "project Category not found",
        });
      }
    
      return res.status(200).json({
        success: true,
        data: projectCategory,
      });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: `${error}`,
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
    updateprojectCategory:async (req,res,next)=>{
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
            where: { id: projectCategoryId },
          });

          if (!projectCategory) {
            return res.status(404).json({
              success: false,
              message: "project category not found",
            });
          }
          const updateprojectCategory=await prisma.projectCategory.update({
            where: { id: projectCategoryId },
            data: {
                name: data.name,
            }
          })
          return res.status(200).json({
            success: true,
            message: "project category updated successfully",
            data: updateprojectCategory,
          });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: `${error}`,
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
        
        // Check if the project category exists
        const projectCategory = await prisma.projectCategory.findUnique({
          where: { id: projectCategoryId },
        });
    
        if (!projectCategory) {
          return res.status(404).json({
            success: false,
            message: "project category not found",
          });
        }
    
        // Delete the project category
        await prisma.projectCategory.delete({
          where: { id: projectCategoryId },
        });
    
        // Respond with success
        return res.status(200).json({
          success: true,
          message: "project category deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting project category:", error); 
        return res.status(500).json({
          success: false,
          message: error.message ,
        });
      }
    },
}


export default projectCategoryController;