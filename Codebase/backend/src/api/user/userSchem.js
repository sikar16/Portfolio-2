import z from 'zod';

const userSchem = {
  register: z.object({
    email: z.string().email(),
    password: z.string(), 
    phoneNumber: z.string(),
    userInfo: z.object({
      firstName: z.string(), 
      middleName: z.string(), 
      lastName: z.string(),
      country: z.string(), 
      city: z.string(),
    }),
    userDetails: z.object({
      title: z.string().min(1).max(100),
      quote: z.string(),
      yearsOfExperience: z.number(), 
      rate: z.number().int(), 
      aboutMe: z.string(), 
      cv: z.string(),
      heroImage: z.string(), 
      aboutImage: z.string(),
    }),
    socialMediaLink: z.array(z.object({ 
      name: z.string(),
      link: z.string(),
    })),
  }),

  updateUser:z.object({
    email: z.string().email(),
    phoneNumber: z.string(),
  }),

  updateUserInfo:z.object({
    firstName: z.string(), 
    middleName: z.string(), 
    lastName: z.string(),
    country: z.string(), 
    city: z.string(),
  }),
  updateUserDetails: z.object({
    title: z.string().min(1).max(100),
    quote: z.string(),
    yearsOfExperience: z.number(), 
    rate: z.number().int(), 
    aboutMe: z.string(), 
    cv: z.string(),
    heroImage: z.string(), 
    aboutImage: z.string(),
  }),
  socialMediaLink: z.array(z.object({ 
    name: z.string(),
    link: z.string(),
  })),
};

export default userSchem;
