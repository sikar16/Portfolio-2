import jwt from "jsonwebtoken";
import { SECRET } from "../config/secret.js";
import prisma from "../config/prisma.js";

export const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      success: false,
      message: "Not authorized: token not found",
    });
  }
  
  const token = authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }
  
  try {
    const payload = jwt.verify(token, SECRET);
    req.payload = payload;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export const isServiceProvider = async (req, res, next) => {
  try {
    const serviceProvider = await prisma.serviceProvider.findFirst({
      where: {
        id: +req.payload.id,
      },
    });
    
    if (!serviceProvider) {
      return res.status(403).json({
        success: false,
        message: "Access denied: not a service provider",
      });
    }
        
    req.user = serviceProvider;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const isUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: +req.payload.id,
      },
    });
    
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Access denied: not a user",
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Example of a role-based access control
// export const isAnyRole = (...roles) => {
//   return (req, res, next) => {
//     const account = req.user;
//     if (account && roles.includes(account.role)) {
//       return next();
//     }
//     return res.status(401).json({ success: false, message: "Access denied" });
//   };
// };