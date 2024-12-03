import z from "zod";

const testimonySchem = {
    create: z.object({
        reviewerFullName: z.string(),
        reviewerTitle: z.string(),
        reviewerImage: z.string(),
        feedback: z.string(),
    }),
    update: z.object({
        reviewerFullName: z.string(),
        reviewerTitle: z.string(),
        reviewerImage: z.string(),
        feedback: z.string(),
    }),
};

export default testimonySchem;