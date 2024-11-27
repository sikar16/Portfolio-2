import z from "zod";

const projectSchema = {
  create: z.object({
    name: z.string().min(4,{message:"name of project is required"}),
    description: z.string().optional(),
    demoLink: z.string().optional(),
    tecnology: z.string(),
    userId: z.number(),
    projectCategoryId: z.number(),
    projectImage: z.array(z.object({ 
      image: z.string(), 
    })),
  }),
  updateProject: z.object({
    name: z.string().min(4,{message:"name of project is required"}),
    description: z.string().optional(),
    demoLink: z.string().optional(),
    tecnology: z.string(),
    projectImage: z.array(z.object({ 
      image: z.string(), 
    })),
  }),
  updateProjectCategory: z.object({
    projectCategoryId: z.number(),
  }),
};

export default projectSchema;