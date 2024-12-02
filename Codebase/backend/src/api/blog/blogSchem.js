

import z from "zod"
const blogSchema ={
    create:z.object({
        title: z.string(),
        content: z.string(),
        blogImage:z.array(z.object({
            imageUrl: z.string(),
        }))
    }),
    update:z.object({
        title: z.string(),
        content: z.string(),
        blogImage:z.array(z.object({
            imageUrl: z.string(),
        }))
    }),
}

export default blogSchema