import z from "zod";

const skillSchema = {
    create: z.object({
        name: z.string(),
        description: z.string(),
        image: z.string(),
        skillCategoryId: z.number(),
        userId:z.number()
    }),
    updateskill: z.object({
        name: z.string(),
        description: z.string(),
        image: z.string().optional(),
    }),
    updateskillCategory: z.object({
        skillCategoryId: z.number(),
    }),
};

export default skillSchema;