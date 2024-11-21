import prisma from "../../config/prisma.js";
import serviceSchem from "./serviceSchem.js";

const serviceController={
getAllservice:async (req,res,next)=>{
    try {
        const services=await prisma.service.findMany({
        }) 
        return res.status(200).json({
         success: true,
         message: "fetching all service",
         data: services,
       });
     } catch (error) {
         return res.status(500).json({
             success: false,
             message: `${error}`,
           });
     }
},
getSingleservice:async (req,res,next)=>{
    try {
        const serviceId=parseInt(req.params.id,10);

    if (isNaN(serviceId)) {
    return res.status(400).json({
      success: false,
      message: "invalid service id",
    });
  }
  const service=await prisma.service.findFirst({
    where:{
        id:serviceId
    },
   
  })
  if (!service) {
    return res.status(404).json({
      success: false,
      message: "service not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: service,
  });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error}`,
          });
    }
},
createservice: async (req, res, next) => {
    try {
        const data = serviceSchem.create.parse(req.body); // Validates and parses request data
        
        const isServiceExist = await prisma.service.findFirst({
            where: {
                name: data.name,
            },
        });

        if (isServiceExist) {
            return res.status(400).json({
                success: false,
                message: "This service is already registered",
            });
        }
 
        const newService = await prisma.service.create({
            data: {
                name: data.name,
                description: data.description,
                image: data.image,
                userId: data.user, // Ensure this maps to the correct userId
            },
        });

        return res.status(201).json({
            success: true,
            message: "Service created successfully",
            data: newService,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error}`,
        });
    }
},
updateservice:async (req,res,next)=>{
    try {
        const serviceId = parseInt(req.params.id, 10);
        if (isNaN(serviceId)) {
            return res.status(400).json({
              success: false,
              message: "Invalid service ID",
            });
          }

          const data = serviceSchem.update.parse(req.body);
          const service = await prisma.service.findFirst({
            where: { id: serviceId },
          });
    
          if (!service) {
            return res.status(404).json({
              success: false,
              message: "service not found",
            });
          }
          const updateservice=await prisma.service.update({
            where: { id: serviceId },
            data: {
                name: data.name,
                description: data.description,
                image: data.image
            }
          })
          return res.status(200).json({
            success: true,
            message: "service updated successfully",
            data: updateservice,
          });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error}`,
        }); 
    }
},
deleteservice:async (req,res,next)=>{
    try {
        const serviceId = parseInt(req.params.id, 10);
        if (isNaN(serviceId)) {
            return res.status(400).json({
              success: false,
              message: "Invalid service ID",
            });
          }
          const service = await prisma.service.findFirst({
            where: { id: serviceId },
          });

          if (!service) {
            return res.status(404).json({
              success: false,
              message: "service not found",
            });
          }
          await prisma.service.delete({
            where: { id: serviceId },
          })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `${error}`,
        });  
    }
},
}

export default serviceController;