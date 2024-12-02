import prisma from "../../config/prisma.js";
import projectSchema from "./projectSchem.js";

const projectController={
    getAllProject:async (req,res,next)=>{
        try {
            const projects=await prisma.project.findMany({
              where: {
                userId: +req.user.id 
            }
            }) 
            return res.status(200).json({
             success: true,
             message: "fetching all project",
             data: projects,
           });
         } catch (error) {
             return res.status(500).json({
                 success: false,
                 message: `${error}`,
               });
         } 
    },
    getSingleProject: async (req, res, next) => {
      try {
          const projectId = parseInt(req.params.id, 10);
  
          if (isNaN(projectId)) {
              return res.status(400).json({
                  success: false,
                  message: "Invalid project ID",
              });
          }
  
          const project = await prisma.project.findFirst({
              where: {
                  id: projectId,
                  userId: req.user.id 
              }
          });
  
          if (!project) {
              return res.status(404).json({
                  success: false,
                  message: "Project not found or you do not have permission to view it",
              });
          }
  
          return res.status(200).json({
              success: true,
              data: project,
          });
      } catch (error) {
          return res.status(500).json({
              success: false,
              message: `Error - ${error.message}`,
          });
      }
  },
   
  createProject: async (req, res) => {
    try {
        const data = projectSchema.create.parse(req.body);
        const isProjectExist = await prisma.project.findFirst({
            where: {
                name: data.name,
                userId: req.user.id 
            },
        });

        if (isProjectExist) {
            return res.status(400).json({
                success: false,
                message: "This project already exists for you",
            });
        }
        const isProjectCategoryExist = await prisma.projectCategory.findFirst({
            where: {
                id: data.projectCategoryId,
                userId: req.user.id 
            },
        });

        if (!isProjectCategoryExist) {
            return res.status(400).json({
                success: false,
                message: "This project category not found or does not belong to you",
            });
        }
        const newProject = await prisma.project.create({
            data: {
                name: data.name,
                demoLink: data.demoLink,
                description: data.description,
                projectCategoryId: data.projectCategoryId,
                technology: data.tecnology, 
                userId: req.user.id,
                projectImage: {
                    create: data.projectImage.map((img) => ({
                        image: img.image,
                    })),
                },
            },
        });

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: newProject,
        });
    } catch (error) {
        console.error("Error creating project:", error); 
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

          const existingProject = await prisma.project.findFirst({
              where: {
                  name: data.name,
                  userId: req.user.id, 
                  NOT: { id: projectId },
              },
          });

          if (existingProject) {
              return res.status(400).json({
                  success: false,
                  message: "This project already exists for another user so cant update",
              });
          }

          const projectToUpdate = await prisma.project.findFirst({
              where: {
                  id: projectId,
                  userId: req.user.id, 
              },
          });

          if (!projectToUpdate) {
              return res.status(404).json({
                  success: false,
                  message: "Project not found or you do not have permission to update it",
              });
          }
          const updatedProject = await prisma.project.update({
              where: { id: projectId },
              data: {
                  name: data.name,
                  demoLink: data.demoLink,
                  description: data.description,
                  tecnology: data.technology, 
                  projectImage: {
                      create: data.projectImage.map((img) => ({
                          image: img.image,
                      })),
                  },
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
            const projectToUpdate = await prisma.project.findFirst({
              where: {
                  id: projectId,
                  userId: req.user.id, 
              },
          });
  
          if (!projectToUpdate) {
              return res.status(404).json({
                  success: false,
                  message: "Project not found or you do not have permission to update it",
              });
          }
            const projectCategory = await prisma.projectCategory.findFirst({
              where: {
                  id: data.projectCategoryId,
                  userId: req.user.id, 
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
          console.error("Update project category error:", error); 
          return res.status(500).json({
              success: false,
              message: `Error - ${error.message}`,
          });
      }
  },
  deleteProject: async (req, res, next) => {
    try {
        const projectId = parseInt(req.params.id, 10);
        if (isNaN(projectId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid project ID",
            });
        }
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                userId: req.user.id, 
            },
            include: {
                projectImage: true, 
            },
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found or you do not have permission to delete it",
            });
        }
        await prisma.projectImage.deleteMany({
            where: {
                projectId: projectId, 
            },
        });

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
        console.error("Error deleting project:", error);
        return res.status(500).json({
            success: false,
            message: "Error - " + error.message,
        });
    }
},
}

export default projectController