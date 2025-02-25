import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/user.service";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      status: true,
      data: [user],
      message: "User registered successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if ((error as any).code === 11000) {
        // Handling duplicate key error
        const field = Object.keys((error as any).keyValue)[0]; // Get the duplicate field
        res.status(400).json({
          status: false,
          data: [],
          message: `The ${field} already exists. Please use a different one.`,
        });
      } else {
        res
          .status(400)
          .json({ status: false, data: [], message: error.message });
      }
    } else {
      res.status(400).json({
        status: false,
        data: [],
        message: "An unknown error occurred",
      });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const { user, token } = await loginUser(userName, password);
    res.status(200).json({
      status: true,
      data: user,
      token: token,
      message: "Login successful",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(401).json({ status: false, data: [], message: error.message });
    } else {
      res.status(401).json({
        status: false,
        data: [],
        message: "An unknown error occurred",
      });
    }
  }
};
