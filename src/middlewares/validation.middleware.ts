import { Request, Response, NextFunction } from "express";

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  var name = req.body.name;
  var email = req.body.email;

  if (name) {
    if (name.length > 2) {
      if (name.length < 50) {
        console.log("Middleware: Name valid");
      } else {
        return res.status(400).json({ error: "Name too long" });
      }
    } else {
      return res.status(400).json({ error: "Name too short" });
    }
  }

  if (email) {
    if (email.includes("@")) {
      if (email.includes(".")) {
        console.log("Middleware: Email valid");
      } else {
        return res.status(400).json({ error: "Email invalid" });
      }
    } else {
      return res.status(400).json({ error: "Email invalid" });
    }
  }

  next();
};

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  var name = req.body.name;
  var price = req.body.price;

  if (name) {
    if (name.length > 2) {
      if (name.length < 100) {
        console.log("Product name valid");
      } else {
        return res.status(400).json({ error: "Name too long" });
      }
    } else {
      return res.status(400).json({ error: "Name too short" });
    }
  }

  next();
};

export const validateOrder = (req: Request, res: Response, next: NextFunction) => {
  console.log("This middleware is never used");
  next();
};
