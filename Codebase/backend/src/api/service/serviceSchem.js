import z from "zod"


const serviceSchem={
    create:z.object({
        name:z.string(),
        image:z.string(),
        description:z.string(),
        user:z.number()
    }),
    update:z.object({
        name:z.string(),
        image:z.string(),
        description:z.string()
    }),

}

export default serviceSchem;