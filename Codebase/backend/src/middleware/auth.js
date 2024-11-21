import jwt from "jsonwebtoken";
import { SECRET } from "../config/secret.js";
import prisma from "../config/prisma.js";

export const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }
  
  try {
    const payload = jwt.verify(token, SECRET);
    
    const user = await prisma.user.findFirst({
      where: {
        id: +payload.id,
      },
    });

    const serviceProvider = await prisma.serviceProvider.findFirst({
      where: {
        id: +payload.id,
      },
    });

    if (!user && !serviceProvider) {
      return res.status(404).json({
        success: false,
        message: "User or ServiceProvider not found",
      });
    }
    
    req.user = user || serviceProvider; // Attach user or serviceProvider to req
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export const isServiceProvider = (req, res, next) => {
  const account = req.user;
  if (account && !account.fullName) { // Assuming fullName exists only in ServiceProvider
    return next();
  }
  return res.status(401).json({ success: false, message: "Not a service provider" });
};

export const isUser = (req, res, next) => {
  const account = req.user;
  if (account && account.email) { // Assuming email exists only in User
    return next();
  }
  return res.status(401).json({ success: false, message: "Not a user" });
};

// Example of a role-based access control
export const isAnyRole = (...roles) => {
  return (req, res, next) => {
    const account = req.user;
    if (account && roles.includes(account.role)) {
      return next();
    }
    return res.status(401).json({ success: false, message: "Access denied" });
  };
};