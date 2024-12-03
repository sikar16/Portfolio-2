import prisma from "../../config/prisma.js";
import skillCategorySchem from "./skillCategorySchem.js";

const skillCategoryController={
    getAllSkillCatgeory:async (req,res,next)=>{
        try {
            const skillCategory=await prisma.skillCategory.findMany({
              where: {
                userId: req.user.id,
            },
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
    getSingleSkillCategory: async (req, res, next) => {
      try {
          const skillCategoryId = parseInt(req.params.id, 10);
  
          if (isNaN(skillCategoryId)) {
              return res.status(400).json({
                  success: false,
                  message: "Invalid skill category ID",
              });
          }
  
          const skillCategory = await prisma.skillCategory.findFirst({
              where: {
                  id: skillCategoryId,
                  userId: req.user.id,
              },
          });
  
          if (!skillCategory) {
              return res.status(404).json({
                  success: false,
                  message: "Skill category not found or you do not have permission to view it",
              });
          }
  
          return res.status(200).json({
              success: true,
              data: skillCategory,
          });
      } catch (error) {
          console.error("Error fetching skill category:", error); 
          return res.status(500).json({
              success: false,
              message: `Error - ${error.message}`, 
          });
      }
  },
  createSkillCategory: async (req, res, next) => {
    try {
        const data = skillCategorySchem.create.parse(req.body);
        
        const isSkillCategoryExist = await prisma.skillCategory.findFirst({
            where: {
                name: data.name,
                userId: req.user.id,
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
                userId: req.user.id, 
            },
        });

        return res.status(201).json({
            success: true,
            message: "Skill category created successfully",
            data: newSkillCategory,
        });
    } catch (error) {
        console.error("Error creating skill category:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the skill category.",
        });
    }
},
updateSkillCategory: async (req, res, next) => {
  try {
      const skillCategoryId = parseInt(req.params.id, 10);
      if (isNaN(skillCategoryId)) {
          return res.status(400).json({
              success: false,
              message: "Invalid skill category ID",
          });
      }

      const data = skillCategorySchem.update.parse(req.body);
      
      const skillCategory = await prisma.skillCategory.findFirst({
          where: {
              id: skillCategoryId,
              userId: req.user.id,
          },
      });

      if (!skillCategory) {
          return res.status(404).json({
              success: false,
              message: "Skill category not found or you do not have permission to update it",
          });
      }

      const updatedSkillCategory = await prisma.skillCategory.update({
          where: { id: skillCategoryId },
          data: {
              name: data.name,
          },
      });

      return res.status(200).json({
          success: true,
          message: "Skill category updated successfully",
          data: updatedSkillCategory,
      });
  } catch (error) {
      console.error("Error updating skill category:", error); 
      return res.status(500).json({
          success: false,
          message: "An error occurred while updating the skill category.",
      });
  }
},
deleteSkillCategory: async (req, res, next) => {
    try {
        const skillCategoryId = parseInt(req.params.id, 10);
        if (isNaN(skillCategoryId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid skill category ID",
            });
         }
        const skillCategory = await prisma.skillCategory.findFirst({
            where: {
                id: skillCategoryId,
                userId: req.user.id,
            },
        });

        if (!skillCategory) {
            return res.status(404).json({
                success: false,
                message: "Skill category not found or you do not have permission to delete it",
            });
        }

        const dependentSkillsCount = await prisma.skill.count({
            where: {
                skillCategoryId: skillCategoryId,
            },
        });

        if (dependentSkillsCount > 0) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete skill category because it has associated skills.",
            });
        }

        await prisma.skillCategory.delete({
            where: { id: skillCategoryId },
        });

        return res.status(200).json({
            success: true,
            message: "Skill category deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting skill category:", error); 
        return res.status(500).json({
            success: false,
            message: error.message || "An unexpected error occurred",
        });
    }
},
}


export default skillCategoryController;