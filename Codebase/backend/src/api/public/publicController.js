import prisma from "../../config/prisma.js";
import publicSchem from "./publicSchem.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET } from "../../config/secret.js"; // Ensure this is correctly defined

const publicController = {
  login: async (req, res, next) => {
    try {
      const data = publicSchem.login.parse(req.body);
      const { email, password } = data;

      let user = await prisma.serviceProvider.findFirst({
        where: { email },
      });

      if (!user) {
        user = await prisma.user.findFirst({
          where: { email },
        });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password ',
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or passwordnnnnnnnnn',
        });
      }


      // Determine the role based on the type of user
      const role = user.fullName ? 'serviceProvider' : 'user'; // Adjust based on your schema
      const payload={
        id: user.id, 
        email: user.email, 
        role: role
      }
      const token = jwt.sign(
        payload,SECRET
      );

      return res.status(200).json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role
        },
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

export default publicController;