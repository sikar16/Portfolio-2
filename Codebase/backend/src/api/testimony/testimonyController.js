import prisma from "../../config/prisma.js";
import testimonySchem from "./testimonySchem.js";

const temstimonyController={
  getAlltestimony: async (req, res, next) => {
    try {
        const reviews = await prisma.testimonial.findMany({
            where:{
                userId: req.user.id
            }
        });

        return res.status(200).json({
            success: true,
            message: "Fetching all testimonials",
            data: reviews,
        });
    } catch (error) {
        console.error("Error fetching testimonials:", error);   
        return res.status(500).json({
            success: false,
            message: error.message || "An internal server error occurred",
        });
    }
},
getSingleTestimony: async (req, res, next) => {
    try {
        const testimonyId = parseInt(req.params.id, 10);
        if (isNaN(testimonyId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid testimony ID",
            });
        }

        const testimony = await prisma.testimonial.findUnique({
            where: {
                id: testimonyId,
                userId: req.user.id, 
            },
        });

        if (!testimony) {
            return res.status(404).json({
                success: false,
                message: "Testimony not found or you do not have permission to view it",
            });
        }

        return res.status(200).json({
            success: true,
            data: testimony,
        });
    } catch (error) {
        console.error("Error fetching testimony:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "An internal server error occurred",
        });
    }
},
createTestimony: async (req, res, next) => {
    try {
        const data = testimonySchem.create.parse(req.body);
        const isTestimonyExist = await prisma.testimonial.findFirst({
            where: {
                feedback: data.feedback,
                reviewerFullName: data.reviewerFullName,
                reviewerImage: data.reviewerImage,
                reviewerTitle: data.reviewerTitle,
                userId: req.user.id, 
            },
        });

        if (isTestimonyExist) {
            return res.status(400).json({
                success: false,
                message: "This testimony is already registered",
            });
        }

        const testimony = await prisma.testimonial.create({
            data: {
                feedback: data.feedback,
                reviewerFullName: data.reviewerFullName,
                reviewerImage: data.reviewerImage,
                reviewerTitle: data.reviewerTitle,
                user: {
                    connect: { id: req.user.id }, 
                },
            },
        });

        return res.status(201).json({
            success: true,
            message: "Testimony created successfully",
            data: testimony,
        });
    } catch (error) {
        console.error("Error creating testimony:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "An internal server error occurred",
        });
    }
},

updatetestimony: async (req, res, next) => {
    try {
        const testimonyId = parseInt(req.params.id, 10);
        if (isNaN(testimonyId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid testimony ID",
            });
        }

        const data = testimonySchem.update.parse(req.body);
        const testimony = await prisma.testimonial.findFirst({
            where: { id: +testimonyId 
                
            },
        });

        if (!testimony) {
            return res.status(404).json({
                success: false,
                message: "Testimony not found",
            });
        }

        const updatedTestimony = await prisma.testimonial.update({
            where: { id: +testimonyId },
            data: {
                feedback: data.feedback,
                reviewerFullName: data.reviewerFullName,
                reviewerImage: data.reviewerImage,
                reviewerTitle: data.reviewerTitle,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Testimony updated successfully",
            data: updatedTestimony,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: error,
        });
    }
},
deletetestimony: async (req, res, next) => {
    try {
        const testimonyId = parseInt(req.params.id, 10);
        
        if (isNaN(testimonyId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid testimony ID",
            });
        }
        
        const testimony = await prisma.testimonial.findUnique({
            where: { id: +testimonyId },
        });

        if (!testimony) {
            return res.status(404).json({
                success: false,
                message: "Testimony not found",
            });
        }
    
        await prisma.testimonial.delete({
            where: { id: +testimonyId },
        });
    
        return res.status(200).json({
            success: true,
            message: "Testimony deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting testimony:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "An internal server error occurred",
        });
    }
},
deleteTestimony: async (req, res, next) => {
    try {
        const testimonyId = parseInt(req.params.id, 10);
        
        if (isNaN(testimonyId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid testimony ID",
            });
        }
                const testimony = await prisma.testimonial.findFirst({
            where: {
                id: testimonyId,
                userId: req.user.id, 
            },
        });

        if (!testimony) {
            return res.status(404).json({
                success: false,
                message: "Testimony not found or you do not have permission to delete it",
            });
        }
    
        await prisma.testimonial.delete({
            where: { id: testimonyId },
        });
    
        return res.status(200).json({
            success: true,
            message: "Testimony deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting testimony:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "An internal server error occurred",
        });
    }
},
}

export default temstimonyController