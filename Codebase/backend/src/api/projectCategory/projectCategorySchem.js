import z from "zod"
const projectCategorySchem={
    create:z.object({
        name:z.string(),
        user:z.number()
    }),
    update:z.object({
        name:z.string(),
    }),
    

}

export default projectCategorySchem;