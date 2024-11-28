import prisma from "../../config/prisma.js";
import userSchem from "./userSchem.js";
import bcrypt from "bcrypt";

const userController={

    getSingleUser:async (req,res,next)=>{
        try {
            const userId=parseInt(req.params.id,10);

        if (isNaN(userId)) {
        return res.status(400).json({
          success: false,
          message: "invalid user id",
        });
      }
      const user=await prisma.user.findFirst({
        where:{
            id:userId
        },
        include:{
            userDetails:true,
            userInfo:true
        }
      })
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: user,
      });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `${error}`,
              });
        }
    },
    getAllUser:async (req,res,next)=>{
        try {
           const users=await prisma.user.findMany({
            include:{
              userDetails:true,
              userInfo:true
            }
           }) 
           return res.status(200).json({
            success: true,
            message: "fetching all users",
            data: users,
          });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: `${error}`,
              });
        }
    },
    createUser: async (req, res, next) => {
      try {
        const data = userSchem.register.parse(req.body);
          const isUserExist = await prisma.user.findFirst({
          where: {
            email: data.email,
          },
        });
        if (isUserExist) {
          return res.status(400).json({
            success: false,
            message: "This email is already registered",
          });
        }
          const isPhoneExist = await prisma.user.findFirst({
          where: {
             phoneNumber: data.phoneNumber,
          },
        });
        if (isPhoneExist) {
          return res.status(400).json({
            success: false,
            message: "This phone is already registered",
          });
        }
          const hashedPassword = await bcrypt.hash(data.password, 10);
          const newUser = await prisma.user.create({
            data: {
              email: data.email,
              phoneNumber: data.phoneNumber,
              password: hashedPassword,
              status: "ACTIVE",
              userInfo: {
                create: {
                  firstName: data.userInfo.firstName,
                  middleName: data.userInfo.middleName,
                  lastName: data.userInfo.lastName,
                  country: data.userInfo.country,
                  city: data.userInfo.city,
                },
              },
              userDetails: {
                create: {
                  title: data.userDetails.title,
                  quote: data.userDetails.quote,
                  yearsOfExperience: data.userDetails.yearsOfExperience,
                  rate: data.userDetails.rate,
                  aboutMe: data.userDetails.aboutMe,
                  cv: data.userDetails.cv,
                  heroImage: data.userDetails.heroImage,
                  aboutImage: data.userDetails.aboutImage,
                },
              },
              socialLinks: {
                create: data.socialMediaLink.map((link) => ({
                  name: link.name,
                  link: link.link,
                })),
              },
            },
        });
  
        return res.status(201).json({
          success: true,
          message: "User created successfully",
          user: {
            id: newUser.id,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
          },
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    },
    updateUser: async (req, res, next) => {
      try {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid user ID",
          });
        }
  
        const data = userSchem.updateUser.parse(req.body);
  
        const user = await prisma.user.findFirst({
          where: { id: userId },
        });
  
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
  
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            email: data.email,
            phoneNumber: data.phoneNumber,
            socialLinks: {
              create: data.socialMediaLink.map((link) => ({
                name: link.name,
                link: link.link,
              })),
            },
          },
        });
  
        return res.status(200).json({
          success: true,
          message: "User updated successfully",
          data: updatedUser,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    },
    updateUserInfo: async (req, res, next) => {
      try {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid user ID",
          });
        }
          const data = userSchem.updateUserInfo.parse(req.body);
  
        const user = await prisma.user.findFirst({
          where: { id: userId },
        });
  
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
  
        const updatedUserInfo = await prisma.userInfo.update({
          where: { id: userId },
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            middleName: data.middleName,
            country: data.country,
            city: data.city,
          },
        });
  
        return res.status(200).json({
          success: true,
          message: "User information updated successfully",
          data: updatedUserInfo,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    },
    updateUserDetail:async (req,res,next)=>{
      try {
        const userId = parseInt(req.params.id, 10);
        if (isNaN(userId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid user ID",
          });
        }

        const data = userSchem.updateUserDetails.parse(req.body);
  
        const user = await prisma.user.findFirst({
          where: { id: userId },
        });
  
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }

        const updatedUserDetail = await prisma.userDetail.update({
          where: { id: userId },
          include:{
            user: true
          },
          data: {
            aboutImage: data.aboutImage,
            heroImage: data.heroImage,
            aboutMe: data.aboutMe,
            cv: data.cv,
            quote: data.quote,
            rate: data.rate,
            title: data.title,
            yearsOfExperience: data.yearsOfExperience,
          },
        });
  
        return res.status(200).json({
          success: true,
          message: "User information updated successfully",
          data: updatedUserDetail,
        });

      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    },
    deleteUser: async (req, res, next) => {
      try {
          const userId = parseInt(req.params.id, 10);
  
          // Validate user ID
          if (isNaN(userId)) {
              return res.status(400).json({
                  success: false,
                  message: "Invalid user ID",
              });
          }
  
          // Check if the user exists
          const user = await prisma.user.findFirst({
              where: {
                  id: +userId,
              },
              include: {
                  userDetails: true,
                  userInfo: true,
              },
          });
  
          if (!user) {
              return res.status(404).json({
                  success: false,
                  message: "User not found",
              });
          }
  
          // Delete associated user details and user info
          await prisma.userDetail.deleteMany({
              where: {
                userId: userId,
              },
          });
  
          await prisma.userInfo.deleteMany({
              where: {
                  userId: userId,
              },
          });
  
          // Delete the user
          await prisma.user.delete({
              where: {
                  id: userId,
              },
          });
  
          return res.status(200).json({
              success: true,
              message: "User deleted successfully",
          });
      } catch (error) {
          console.error("Error deleting user:", error);
          return res.status(500).json({
              success: false,
              message: error,
          });
      }
  }
}

export default userController