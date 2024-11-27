import prisma from "../../config/prisma.js";
import projectSchema from "./projectSchem.js";

const projectController={
    getAllProject:async (req,res,next)=>{
        try {
            const project=await prisma.project.findMany({
            }) 
            return res.status(200).json({
             success: true,
             message: "fetching all project",
             data: project,
           });
         } catch (error) {
             return res.status(500).json({
                 success: false,
                 message: `${error}`,
               });
         } 
    },
    getSingleProject:async (req,res,next)=>{
        try {
            const projectId=parseInt(req.params.id,10);
    
            if (isNaN(projectId)) {
            return res.status(400).json({
              success: false,
              message: "invalid project id",
            });
          }
    
          const project=await prisma.project.findFirst({
            where:{
              id:+projectId
            }
          })
          if (!project) {
            return res.status(404).json({
              success: false,
              message: "project not found",
            });
          }
        
          return res.status(200).json({
            success: true,
            data: project,
          });
          } catch (error) {
            return res.status(500).json({
              success: false,
              message: `${error}`,
            });
          }
    },
   
    createProject: async (req, res) => {
      try {
        const data = projectSchema.create.parse(req.body);
        
        const isProjectExist = await prisma.project.findFirst({
          where: { 
            name: data.name,
            userId:+data.userId
           },
        });
    
        if (isProjectExist) {
          return res.status(400).json({
            success: false,
            message: "This project is already created",
          });
        }
    
        const isProjectCategoryExist = await prisma.projectCategory.findFirst({
          where: {
             id: +data.projectCategoryId,
            userId:+data.userId

           },
        });
    
        if (!isProjectCategoryExist) {
          return res.status(400).json({
            success: false,
            message: "This project category not found",
          });
        }
    
        const isUserExist = await prisma.user.findFirst({
          where: { id: +data.userId },
        });
    
        if (!isUserExist) {
          return res.status(400).json({
            success: false,
            message: "User not found",
          });
        }
    
        // Create the project and associate images
        const newProject = await prisma.project.create({
          data:{
            name:data.name,
            demoLink:data.demoLink,
            description:data.description,
            projectCategoryId:data.projectCategoryId,
            tecnology:data.tecnology,
            userId:data.userId,
            projectImage:{
              create:data.projectImage.map((img)=>({
                image:img.image
              })),
            }
          }
        });
    
        return res.status(200).json({
          success: true,
          message: "Project created successfully",
          data: newProject,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: `Error - ${error.message}`,
        });
      }
    },
    updateProject: async (req, res, next) => {
      try {
        const projectId = parseInt(req.params.id, 10);
        if (isNaN(projectId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid project ID",
          });
        }
    
        const data = projectSchema.updateProject.parse(req.body);
    
       
        // Check if the project name already exists but is not the current project
        const existingProject = await prisma.project.findFirst({
          where: {
            name: data.name,
            NOT: { id: projectId },
          },
        });
    
        if (existingProject) {
          return res.status(400).json({
            success: false,
            message: "This project already exist",
          });
        }
    
      
    
    
        const updatedProject = await prisma.project.update({
          where: { id: projectId },
          data: {
            name: data.name,
            demoLink: data.demoLink,
            description: data.description,
            tecnology: data.tecnology,
            projectImage:{
              create:data.projectImage.map((img)=>({
                image:img.image
              })),
            }
          },
        });
    
        return res.status(200).json({
          success: true,
          message: "Project updated successfully",
          data: updatedProject,
        });
    
      } catch (error) {
        console.error("Update project error:", error);
        return res.status(500).json({
          success: false,
          message: `Error - ${error.message}`,
        });
      }
    },
    updateProjectCategory: async (req, res, next) => {
      try {
        const projectId = parseInt(req.params.id, 10);
        if (isNaN(projectId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid project ID",
          });
        }
    
        const data = projectSchema.updateProjectCategory.parse(req.body);
    
            const existingProject = await prisma.project.findFirst({
          where: {
            name: data.name,
            NOT: { id: projectId },
          },
        });
    
        if (!existingProject) {
          return res.status(400).json({
            success: false,
            message: "This project not found",
          });
        }
    
        const projectCategory = await prisma.projectCategory.findFirst({
          where: {
            id: +data.projectCategoryId,
          },
        });
    
        if (!projectCategory) {
          return res.status(400).json({
            success: false,
            message: "This project category not found",
          });
        }
    
        const updatedProject = await prisma.project.update({
          where: { id: projectId },
          data: {
            projectCategoryId: data.projectCategoryId,
          },
        });
    
        return res.status(200).json({
          success: true,
          message: "Project category updated successfully",
          data: updatedProject,
        });
    
      } catch (error) {
        console.error("Update project category error:", error); // Log the error for debugging
        return res.status(500).json({
          success: false,
          message: `Error - ${error.message}`,
        });
      }
    },
    deleteProject: async (req, res, next) => {
      try {
        const projectId = parseInt(req.params.id, 10);
    
        // Validate project ID
        if (isNaN(projectId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid project ID",
          });
        }
    
        const project = await prisma.project.findFirst({
          where: {
            id: projectId,
          },
          include: {
            projectImage: true, // Include related images to ensure they can be deleted
          },
        });
    
        if (!project) {
          return res.status(404).json({
            success: false,
            message: "Project not found",
          });
        }
    
        // Delete related project images
        await prisma.projectImage.deleteMany({
          where: {
            projectId: projectId, // Ensure you're targeting the correct foreign key
          },
        });
    
        // Now delete the project
        await prisma.project.delete({
          where: {
            id: projectId,
          },
        });
    
        return res.status(200).json({
          success: true,
          message: "Project deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting project:", error); // Log the error for debugging
        return res.status(500).json({
          success: false,
          message: "Error - " + error.message,
        });
      }
    },
}

export default projectController