import z from "zod"
const skillCategorySchem={
    create:z.object({
        name:z.string(),
        user:z.number()
    }),
    update:z.object({
        name:z.string(),
    }),
    

}

export default skillCategorySchem;