import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// 🔹 Define custom request type with `user` property
export interface AuthRequest extends Request {
  user?: { id: string };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  let authHeader = req.header("Authorization");
  console.log("authHeader==checking token",authHeader)

  if (!authHeader) {
    res.status(401).json({
      status: false,
      data: [],
      message: "Unauthorized: No token provided",
    });
    return; // ✅ Stops execution here, avoids returning a response later
  }

  // 🔹 Extract token by removing "Bearer " prefix
  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      status: false,
      data: [],
      message: "Unauthorized: Malformed token",
    });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      console.log(err);
      res.status(401).json({
        status: false,
        data: [],
        message: "Unauthorized: Invalid token",
      });
      return;
    }

    req.user = user as { id: string };
    next(); // ✅ Ensures that the request moves forward
  });
};
