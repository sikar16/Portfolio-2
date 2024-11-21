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
   
   createProject:async (req,res)=>{
    try {
       const data=projectSchema.create.parse(req.body)
       const isProjectExist = await prisma.project.findFirst({
        where: {
          name: data.name,
        },
      });

      if (isProjectExist) {
        return res.status(400).json({
          success: false,
          message: "This project  is already creted",
        });
      }
       const isProjectCategoryExist = await prisma.projectCategory.findFirst({
        where: {
          id: +data.projectCategoryId,
        },
      });

      if (!isProjectCategoryExist) {
        return res.status(400).json({
          success: false,
          message: "This project category not found",
        });
      }
       const isUserExist = await prisma.user.findFirst({
        where: {
          id: +data.userId,
        },
      });

      if (!isUserExist) {
        return res.status(400).json({
          success: false,
          message: "user not found",
        });
      }
let tecnologyId;
const isTecnologyExist = await prisma.projectTechnology.findFirst({
  where: {
    technologies: data.technologies,
  },
});

if (isTecnologyExist) {
  tecnologyId = isTecnologyExist.id
}

else{
  const newTecnology=await prisma.projectTechnology.create({
    data:{
      technologies:data.technologies
    }
  })
  tecnologyId=newTecnology.id
}

const newProject=await prisma.project.create({
  data:{
    title:data.name,
    demoLink:data.demoLink,
    description:data.description,
    projectCategoryId:+data.projectCategoryId,
    projectImages:{
      create:{
        image:data.imageUrl
      }
    },
    technologies:+ tecnologyId,
    userId:+data.userId
  }
})

return res.status(200).json({
  success: true,
  message: "project created successfully",
  data: newProject,
});
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error - ${error}`,
      });
    }
   },
    updateProject:(req,res,next)=>{},
    updateProjectCatgeory:(req,res,next)=>{},
    deleteProject:(req,res,next)=>{},
}

export default projectController