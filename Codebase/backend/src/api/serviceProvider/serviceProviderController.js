import prisma from "../../config/prisma.js";
import serviceProviderSchem from "./serviceProviderSchem.js";
import bcrypt from "bcrypt";
const serviceProviderController={
    getSingleServiceProvider:async (req,res,next)=>{
        try {
            const serviceProviderId = parseInt(req.params.id, 10);
        
            // Validate ID
            if (isNaN(serviceProviderId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid service provider ID",
                });
            }
        
            // Query database
            const serviceProvider = await prisma.serviceProvider.findFirst({
                where: {
                    id: serviceProviderId,
                },
            });
        
            // Check if service provider exists
            if (!serviceProvider) {
                return res.status(404).json({
                    success: false,
                    message: "Service provider not found",
                });
            }
        
            // Successful response
            return res.status(200).json({
                success: true,
                data: serviceProvider,
                message:"Service provider found",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error,
            });
        }
    },
    getAllServiceProvider:async (req,res,next)=>{
        try {
            const serviceProvider = await prisma.serviceProvider.findMany({});
            return res.status(200).json({
              success: true,
              message: "fetching all service provider",
              data: serviceProvider,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `${error}`,
              });
        }
    },
    createServiceProvider: async (req, res, next) => {
        try {
            const requiredFields = ["fullName", "email", "password"];
            
            // Check for missing required fields
            for (const field of requiredFields) {
                if (!req.body[field]) {
                    return res.status(400).json({
                        success: false,
                        message: `${field} is required`,
                    });
                }
            }
    
            const data = serviceProviderSchem.createServiceProvider.parse(req.body);
    
            const isServiceProviderExist = await prisma.serviceProvider.findFirst({
                where: {
                    email: data.email,
                },
            });
    
            if (isServiceProviderExist) {
                return res.status(409).json({
                    success: false,
                    message: "This email already exists.",
                });
            }

            if(!data.password){
                return res.status(400).json({
                    success: false,
                    message: "Password is required",
                  });
            }
            const hashedPassword = bcrypt.hashSync(data.password, 10);

            const newServiceProvider = await prisma.serviceProvider.create({
                data: {
                    fullName: data.fullName,
                    email: data.email,
                    password: hashedPassword, 
                },
            });
    
            return res.status(201).json({
                success: true,
                message: "Service provider created successfully.",
                data: newServiceProvider,
            });
    
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error,
            });
        }
    },
    updateServiceProvider: async (req, res, next) => {
        try {
            const serviceProviderId = parseInt(req.params.id, 10);
            if (isNaN(serviceProviderId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid service provider ID.",
                });
            }
    
            const data = serviceProviderSchem.updateServiceProvider.parse(req.body);
    
            const existingServiceProvider = await prisma.serviceProvider.findFirst({
                where: {
                    id: serviceProviderId,
                },
            });
    
            if (!existingServiceProvider) {
                return res.status(404).json({
                    success: false,
                    message: "Service provider not found.",
                });
            }
    
            const updatedServiceProvider = await prisma.serviceProvider.update({
                where: {
                    id: serviceProviderId,
                },
                data: {
                    fullName: data.fullName,
                    email: data.email, 
                },
            });
    
            return res.status(200).json({
                success: true,
                message: "Service provider updated successfully.",
                data: updatedServiceProvider,
            });
    
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error,
            });
        }
    },
    deleteServiceProvider: async (req, res, next) => {
        try {
            const serviceProviderId = parseInt(req.params.id, 10);
            if (isNaN(serviceProviderId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid service provider ID.",
                });
            }
                const serviceProvider = await prisma.serviceProvider.findFirst({
                where: {
                    id: serviceProviderId,
                },
              
            });
    
            if (!serviceProvider) {
                return res.status(404).json({
                    success: false,
                    message: "Service provider not found.",
                });
            }
    
           await prisma.serviceProvider.delete({
                where: {
                    id: serviceProviderId,
                },
              
            });
    
            return res.status(200).json({
                success: true,
                message: "Service provider deleted successfully.",
                data:{
                    fullName:serviceProvider.fullName,
                    email:serviceProvider.email,
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error,
            });
        }
    },
}

export default serviceProviderController;