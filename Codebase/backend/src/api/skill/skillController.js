import prisma from "../../config/prisma.js";
import skillSchem from "./skillSchem.js";

const skillController={
  getAllSkill: async (req, res, next) => {
    try {
        const skills = await prisma.skill.findMany({
            where: {
                userId: req.user.id, 
            },
            include: {
                skillCategory: true, 
            },
        });

        return res.status(200).json({
            success: true,
            message: "Fetching all skills",
            data: skills,
        });
    } catch (error) {
        console.error("Error fetching skills:", error);
        return res.status(500).json({
            success: false,
            message: `Error - ${error.message}`, 
        });
    }
},
getsingleSkill: async (req, res, next) => {
  try {
      const skillId = parseInt(req.params.id, 10);

      if (isNaN(skillId)) {
          return res.status(400).json({
              success: false,
              message: "Invalid skill ID",
          });
      }

      const skill = await prisma.skill.findFirst({
          where: {
              id: skillId,
              userId: req.user.id, 
          },
      });

      if (!skill) {
          return res.status(404).json({
              success: false,
              message: "Skill not found or you do not have permission to view it",
          });
      }

      return res.status(200).json({
          success: true,
          data: skill,
      });
  } catch (error) {
      console.error("Error fetching skill:", error); 
      return res.status(500).json({
          success: false,
          message: `Error - ${error.message}`,
      });
  }
},
createSkill: async (req, res, next) => {
  try {
      const data = skillSchem.create.parse(req.body); 

      const isSkillExist = await prisma.skill.findFirst({
          where: {
              name: data.name,
              userId: req.user.id,
          },
      });

      if (isSkillExist) {
          return res.status(400).json({
              success: false,
              message: "This skill is already registered",
          });
      }

      const newSkill = await prisma.skill.create({
          data: {
              name: data.name,
              description: data.description,
              image: data.image,
              skillCategoryId: data.skillCategoryId,
              userId: req.user.id,
          },
      });

      return res.status(201).json({
          success: true,
          message: "Skill created successfully",
          data: newSkill,
      });
  } catch (error) {
      console.error("Error creating skill:", error); 
      return res.status(500).json({
          success: false,
          message: error,
      });
  }
},
updateSkillCategory: async (req, res, next) => {
  try {
      const skillId = parseInt(req.params.id, 10);
      if (isNaN(skillId)) {
          return res.status(400).json({
              success: false,
              message: "Invalid skill ID",
          });
      }

      const data = skillSchem.updateskillCategory.parse(req.body);

      const skill = await prisma.skill.findFirst({
          where: {
              id: skillId,
              userId: req.user.id,
          },
      });

      if (!skill) {
          return res.status(404).json({
              success: false,
              message: "Skill not found or you do not have permission to update it",
          });
      }

      const skillCategory = await prisma.skillCategory.findFirst({
          where: {
              id: data.skillCategoryId, 
              userId: req.user.id,
          },
      });

      if (!skillCategory) {
          return res.status(404).json({
              success: false,
              message: "Skill category not found or you do not have permission to access it",
          });
      }

      const updatedSkill = await prisma.skill.update({
          where: { id: skillId },
          data: {
              skillCategoryId: data.skillCategoryId,
          },
      });

      return res.status(200).json({
          success: true,
          message: "Skill's category updated successfully",
          data: updatedSkill,
      });
  } catch (error) {
      console.error("Error updating skill category:", error);
      return res.status(500).json({
          success: false,
          message: "An error occurred while updating the skill category.",
      });
  }
},
updateSkill: async (req, res, next) => {
  try {
      const skillId = parseInt(req.params.id, 10);
      if (isNaN(skillId)) {
          return res.status(400).json({
              success: false,
              message: "Invalid skill ID",
          });
      }

      const data = skillSchem.updateskill.parse(req.body);

      const skill = await prisma.skill.findFirst({
          where: {
              id: skillId,
              userId: req.user.id,
          },
      });

      if (!skill) {
          return res.status(404).json({
              success: false,
              message: "Skill not found or you do not have permission to update it",
          });
      }

      const updatedSkill = await prisma.skill.update({
          where: { id: skillId },
          data: {
              name: data.name,
              description: data.description,
              image: data.image,
          },
      });

      return res.status(200).json({
          success: true,
          message: "Skill updated successfully",
          data: updatedSkill,
      });
  } catch (error) {
      console.error("Error updating skill:", error); 
      return res.status(500).json({
          success: false,
          message: "An error occurred while updating the skill.",
      });
  }
},
deleteSkill: async (req, res, next) => {
  try {
      const skillId = parseInt(req.params.id, 10);
      if (isNaN(skillId)) {
          return res.status(400).json({
              success: false,
              message: "Invalid skill ID",
          });
      }

      const skill = await prisma.skill.findFirst({
          where: {
              id: skillId,
              userId: req.user.id, 
          },
      });

      if (!skill) {
          return res.status(404).json({
              success: false,
              message: "Skill not found or you do not have permission to delete it",
          });
      }

      await prisma.skill.delete({
          where: { id: skillId },
      });

      return res.status(200).json({
          success: true,
          message: "Skill deleted successfully",
      });
  } catch (error) {
      console.error("Error deleting skill:", error); 
      return res.status(500).json({
          success: false,
          message: error.message || "An unexpected error occurred",
      });
  }
},
}

export default skillController;