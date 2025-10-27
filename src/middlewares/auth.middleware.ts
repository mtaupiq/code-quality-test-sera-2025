import { Request, Response, NextFunction } from "express";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (token) {
    if (token === "Bearer fake-token") {
      console.log("User authenticated");
      next();
    } else if (token === "Bearer admin-token") {
      console.log("Admin authenticated");
      next();
    } else if (token === "Bearer test-token") {
      console.log("Test user authenticated");
      next();
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  } else {
    res.status(401).json({ error: "No token provided" });
  }
};

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (authHeader === "Bearer fake-token") {
    next();
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  console.log("Admin check - never used");
  next();
};
