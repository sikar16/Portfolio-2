import prisma from "../../config/prisma.js";
import serviceSchem from "./serviceSchem.js";

const serviceController={
getAllservice:async (req,res,next)=>{
    try {
        const services=await prisma.service.findMany({
          where: {
            userId: req.user.id, 
        },
        }) 
        return res.status(200).json({
         success: true,
         message: "fetching all services",
         data: services,
       });
     } catch (error) {
         return res.status(500).json({
             success: false,
             message: `${error}`,
           });
     }
},
getSingleservice: async (req, res, next) => {
  try {
      const serviceId = parseInt(req.params.id, 10);

      if (isNaN(serviceId)) {
          return res.status(400).json({
              success: false,
              message: "Invalid service ID",
          });
      }

      const service = await prisma.service.findFirst({
          where: {
              id: serviceId,
              userId: req.user.id, 
          },
      });

      if (!service) {
          return res.status(404).json({
              success: false,
              message: "Service not found or you do not have permission to view it",
          });
      }

      return res.status(200).json({
          success: true,
          data: service,
      });

  } catch (error) {
      console.error("Error fetching service:", error); 
      return res.status(500).json({
          success: false,
          message: `Error - ${error.message}`, 
      });
  }
},
createservice: async (req, res, next) => {
  try {
      const data = serviceSchem.create.parse(req.body);

      const isServiceExist = await prisma.service.findFirst({
          where: {
              name: data.name,
              userId: req.user.id, 
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
              userId: req.user.id,
          },
      });

      return res.status(201).json({
          success: true,
          message: "Service created successfully",
          data: newService,
      });
  } catch (error) {
      console.error("Error creating service:", error); 
      return res.status(500).json({
          success: false,
          message: `Error - ${error.message}`, 
      });
  }
},
updateservice: async (req, res, next) => {
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
          where: {
              id: serviceId,
              userId: req.user.id, 
          },
      });

      if (!service) {
          return res.status(404).json({
              success: false,
              message: "Service not found or you do not have permission to update it",
          });
      }

      const updatedService = await prisma.service.update({
          where: { id: serviceId },
          data: {
              name: data.name,
              description: data.description,
              image: data.image,
          },
      });

      return res.status(200).json({
          success: true,
          message: "Service updated successfully",
          data: updatedService,
      });
  } catch (error) {
      console.error("Error updating service:", error); 
      return res.status(500).json({
          success: false,
          message: `Error - ${error.message}`,
      });
  }
},
deleteservice: async (req, res, next) => {
  try {
      const serviceId = parseInt(req.params.id, 10);
      if (isNaN(serviceId)) {
          return res.status(400).json({
              success: false,
              message: "Invalid service ID",
          });
      }
      const service = await prisma.service.findFirst({
          where: {
              id: serviceId,
              userId: req.user.id, 
          },
      });

      if (!service) {
          return res.status(404).json({
              success: false,
              message: "Service not found or you do not have permission to delete it",
          });
      }

      await prisma.service.delete({
          where: { id: serviceId },
      });

      return res.status(200).json({
          success: true,
          message: "Service deleted successfully",
      });
  } catch (error) {
      console.error("Error deleting service:", error); 
      return res.status(500).json({
          success: false,
          message: `Error - ${error.message}`, 
      });
  }
},
}

export default serviceController;