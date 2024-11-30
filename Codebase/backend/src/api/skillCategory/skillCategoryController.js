import prisma from "../../config/prisma.js";
import skillCategorySchem from "./skillCategorySchem.js";

const skillCategoryController={
    getAllSkillCatgeory:async (req,res,next)=>{
        try {
            const skillCategory=await prisma.skillCategory.findMany({
            }) 
            return res.status(200).json({
             success: true,
             message: "fetching all skill category",
             data: skillCategory,
           });
         } catch (error) {
             return res.status(500).json({
                 success: false,
                 message: `${error}`,
               });
         }
    },
    getSingleSkillCatgeory:async (req,res,next)=>{
      try {
        const skillcategoryId=parseInt(req.params.id,10);

        if (isNaN(skillcategoryId)) {
        return res.status(400).json({
          success: false,
          message: "invalid skill category id",
        });
      }

      const skillCategory=await prisma.skillCategory.findFirst({
        where:{
          id:skillcategoryId
        }
      })
      if (!skillCategory) {
        return res.status(404).json({
          success: false,
          message: "skill Category not found",
        });
      }
    
      return res.status(200).json({
        success: true,
        data: skillCategory,
      });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: `${error}`,
        });
      }
    },
    createSkillCategory: async (req, res, next) => {
      try {
        const data = skillCategorySchem.create.parse(req.body);
       
        const isSkillCategoryExist = await prisma.skillCategory.findFirst({
          where: {
            name: data.name,
            userId:data.user
          },
        });
  
        if (isSkillCategoryExist) {
          return res.status(400).json({
            success: false,
            message: "This Skill Category is already registered",
          });
        }
          const newSkillCategory = await prisma.skillCategory.create({
          data: {
            name: data.name,
            userId: data.user,
          },
        });
  
        return res.status(201).json({
          success: true,
          message: "Skill category created successfully",
          data: newSkillCategory,
        });
      } catch (error) {
        console.error("Error:", error); 
        return res.status(500).json({
          success: false,
          message: error
        });
      }
    },
    updateSkillCatgeory:async (req,res,next)=>{
      try {
        const skillcategoryId = parseInt(req.params.id, 10);
        if (isNaN(skillcategoryId)) {
            return res.status(400).json({
              success: false,
              message: "Invalid skill category ID",
            });
          }
          const data = skillCategorySchem.update.parse(req.body);
          const skillcategory = await prisma.skillCategory.findFirst({
            where: { id: skillcategoryId },
          });

          if (!skillcategory) {
            return res.status(404).json({
              success: false,
              message: "skill category not found",
            });
          }
          const updateskillcategory=await prisma.skillCategory.update({
            where: { id: skillcategoryId },
            data: {
                name: data.name,
            }
          })
          return res.status(200).json({
            success: true,
            message: "skill category updated successfully",
            data: updateskillcategory,
          });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: `${error}`,
      }); 
      }
    },
    deleteSkillCategory: async (req, res, next) => {
      try {
        const skillCategoryId = parseInt(req.params.id, 10);
        
        // Validate the skill category ID
        if (isNaN(skillCategoryId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid skill category ID",
          });
        }
        
        // Check if the skill category exists
        const skillCategory = await prisma.skillCategory.findUnique({
          where: { id: skillCategoryId },
        });
    
        if (!skillCategory) {
          return res.status(404).json({
            success: false,
            message: "Skill category not found",
          });
        }
    
        // Delete the skill category
        await prisma.skillCategory.delete({
          where: { id: skillCategoryId },
        });
    
        // Respond with success
        return res.status(200).json({
          success: true,
          message: "Skill category deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting skill category:", error); // Log the error for debugging
        return res.status(500).json({
          success: false,
          message: error.message || "An unexpected error occurred",
        });
      }
    },
}


export default skillCategoryController;