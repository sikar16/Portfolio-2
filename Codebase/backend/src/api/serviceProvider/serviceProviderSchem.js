import z from "zod";

const serviceProviderSchem = {

  createServiceProvider:z.object({
    fullName:z.string(),
    email:z.string(),
    password:z.string()
  }),
  updateServiceProvider:z.object({
    fullName:z.string(),
    email:z.string().optional()

  })

};

export default serviceProviderSchem;
