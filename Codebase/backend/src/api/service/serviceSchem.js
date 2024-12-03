import z from "zod"


const serviceSchem={
    create:z.object({
        name:z.string(),
        image:z.string(),
        description:z.string(),
    }),
    update:z.object({
        name:z.string(),
        image:z.string(),
        description:z.string()
    }),

}

export default serviceSchem;