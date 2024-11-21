import prisma from "../../config/prisma.js";
import testimonySchem from "./testimonySchem.js";

const temstimonyController={
  getAlltestimony: async (req, res, next) => {
    try {
        // Fetch all testimonials (reviews) from the database
        const reviews = await prisma.testimonial.findMany({
            include: {
                // user: true, // Include user details if needed
            },
        });

        return res.status(200).json({
            success: true,
            message: "Fetching all testimonials",
            data: reviews,
        });
    } catch (error) {
        console.error("Error fetching testimonials:", error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: error.message || "An internal server error occurred",
        });
    }
},
getSingletestimony: async (req, res, next) => {
  try {
      const testimonyId = parseInt(req.params.id, 10);

      // Validate testimony ID
      if (isNaN(testimonyId)) {
          return res.status(400).json({
              success: false,
              message: "Invalid testimony ID",
          });
      }

      // Fetch the testimony by ID
      const testimony = await prisma.testimonial.findUnique({
          where: {
              id: testimonyId,
          },
          include: {
            //   user: true, // Include user details if needed
          },
      });

      // Check if testimony exists
      if (!testimony) {
          return res.status(404).json({
              success: false,
              message: "Testimony not found",
          });
      }

      return res.status(200).json({
          success: true,
          data: testimony,
      });
  } catch (error) {
      console.error("Error fetching testimony:", error); // Log the error for debugging
      return res.status(500).json({
          success: false,
          message: error.message || "An internal server error occurred",
      });
  }
},
createtestimony: async (req, res, next) => {
  try {
      // Validate the incoming request body against the Zod schema
      const data = testimonySchem.create.parse(req.body);
     
      // Check if the testimony already exists
      const isTestimonyExist = await prisma.testimonial.findFirst({
          where: {
              feedback: data.feedback,
              reviewerFullName: data.reviewerFullName,
              reviewerImage: data.reviewerImage,
              reviewerTitle: data.reviewerTitle,
          },
      });

      if (isTestimonyExist) {
          return res.status(400).json({
              success: false,
              message: "This testimony is already registered",
          });
      }

      // Create a new testimony
      const testimony = await prisma.testimonial.create({
          data: {
              feedback: data.feedback,
              reviewerFullName: data.reviewerFullName,
              reviewerImage: data.reviewerImage,
              reviewerTitle: data.reviewerTitle,
              user: {
                  connect: { id: data.user }, // Link the user by ID
              },
          },
      });

      return res.status(201).json({
          success: true,
          message: "Testimony created successfully",
          data: testimony,
      });
  } catch (error) {
      console.error("Error:", error);
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
            where: { id: +testimonyId },
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
        
        // Validate testimony ID
        if (isNaN(testimonyId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid testimony ID",
            });
        }
        
        // Check if the testimony exists
        const testimony = await prisma.testimonial.findUnique({
            where: { id: +testimonyId },
        });

        if (!testimony) {
            return res.status(404).json({
                success: false,
                message: "Testimony not found",
            });
        }
    
        // Delete the testimony
        await prisma.testimonial.delete({
            where: { id: +testimonyId },
        });
    
        // Respond with success
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