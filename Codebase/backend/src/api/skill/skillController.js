import prisma from "../../config/prisma.js";
import skillSchem from "./skillSchem.js";

const skillController={
getAllSkill:async (req,res,next)=>{
    try {
        const skill=await prisma.skill.findMany({
            include:{
                skillCategory:true
            }
        }) 
        return res.status(200).json({
         success: true,
         message: "fetching all skill",
         data: skill,
       });
     } catch (error) {
         return res.status(500).json({
             success: false,
             message: `${error}`,
           });
     }
},
getsingleSkill:async (req,res,next)=>{
try {
    const skillId=parseInt(req.params.id,10);

    if (isNaN(skillId)) {
    return res.status(400).json({
      success: false,
      message: "invalid skill id",
    });
  }

  const skill=await prisma.skill.findFirst({
    where:{
      id:skillId
    }
  })
  if (!skill) {
    return res.status(404).json({
      success: false,
      message: "skill not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: skill,
  });
} catch (error) {
    return res.status(500).json({
        success: false,
        message: `${error}`,
      });
}
},
createSkill: async (req, res, next) => {
    try {
        const data = skillSchem.create.parse(req.body); 
        const isSkillExist = await prisma.skill.findFirst({
            where: {
                name: data.name,
                userId:data.userId
            },
        });

        if (isSkillExist) {
            return res.status(400).json({
                success: false,
                message: "This Skill is already registered",
            });
        }

        const newSkill = await prisma.skill.create({
            data: {
                name: data.name,
                description: data.description,
                image: data.image,
                skillCategoryId: data.skillCategoryId,
                userId: data.userId, // Assuming userId is provided in the request body
            },
        });

        return res.status(201).json({
            success: true,
            message: "Skill created successfully",
            data: newSkill,
        });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the skill.",
        });
    }
},
updatdSkillCategory:async (req,res,next)=>{
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
            where: { id: skillId },
          });

          if (!skill) {
            return res.status(404).json({
              success: false,
              message: "skill not found",
            });
          }
          const updateskill=await prisma.skill.update({
            where: { id: skillId },
            data: {
                skillCategoryId: data.skillCategoryId,
            }
          })
          return res.status(200).json({
            success: true,
            message: "skill's category updated successfully",
            data: updateskill,
          });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the skill.",
        });
    }
},
updatdSkill:async (req,res,next)=>{
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
            where: { id: skillId },
          });

          if (!skill) {
            return res.status(404).json({
              success: false,
              message: "skill not found",
            });
          }
          const updateskill=await prisma.skill.update({
            where: { id: skillId },
            data: {
                name: data.name,
                description: data.description,
                image: data.image,
            }
          })
          return res.status(200).json({
            success: true,
            message: "skill updated successfully",
            data: updateskill,
          });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the skill.",
        });
    }
},
deleteSkill:async (req,res,next)=>{
    try {
        const skillId = parseInt(req.params.id, 10);
        
        // Validate the skill category ID
        if (isNaN(skillId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid skill ID",
          });
        }

        const skill = await prisma.skill.findFirst({
            where: { id: skillId },
          });
      
          if (!skill) {
            return res.status(404).json({
              success: false,
              message: "Skill not found",
            });
          }

          await prisma.skill.delete({
            where: { id: skillId },
          });
      
          return res.status(200).json({
            success: true,
            message: "Skill  deleted successfully",
          });
      
    } catch (error) {
        console.error("Error deleting skill category:", error); // Log the error for debugging
        return res.status(500).json({
          success: false,
          message: error.message || "An unexpected error occurred",
        });
    }
}
}

export default skillController;