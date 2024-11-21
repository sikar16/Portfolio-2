import z from "zod";

const projectSchema = {
  create: z.object({
    name: z.string().min(4), // Ensure name has a minimum length
    description: z.string().optional(),
    demoLink: z.string().optional(),
    technologies: z.array(z.string()), // Expecting an array of strings
    userId: z.number().int(), // User ID
    projectCategoryId: z.number().int(), // Project category ID
    imageUrl: z.array(z.string()), // Expecting an array of strings for image URLs
  }),
};

export default projectSchema;