import { Request, Response } from "express";
import { User } from "../models";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateAge,
  calculateUserType,
  ValidationResult
} from "../utils/helpers";
import {
  CreateUserRequest,
  UpdateUserRequest,
  CreateUserResponse,
  UpdateUserResponse,
} from "../types/user.interface";

interface ErrorResponse {
  error: string;
}

interface TypedRequest<T = any> extends Request {
  body: T;
  params: Request['params'];
}

const handleValidationError = (res: Response, validation: ValidationResult): Response<ErrorResponse> => {
  return res.status(400).json({ error: validation.error! });
};

export const processCreate = async (
  req: TypedRequest<CreateUserRequest>,
  res: Response<CreateUserResponse | ErrorResponse>
) => {
  try {
    const {
      name,
      email,
      password,
      age,
      phone,
      address,
      city,
      country,
      postalCode,
      preferredLanguage,
      marketingConsent,
      newsletterConsent,
      referralCode,
    } = req.body;

    // Validate name
    const nameValidation = validateName(name);
    if (!nameValidation.isValid) {
      return handleValidationError(res, nameValidation);
    }

    // Validate email
    let validatedEmail = email;
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      return handleValidationError(res, emailValidation);
    }

    // Normalize email to lowercase
    if (validatedEmail !== validatedEmail.toLowerCase()) {
      validatedEmail = validatedEmail.toLowerCase();
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return handleValidationError(res, passwordValidation);
    }

    // Validate age (optional)
    let validatedAge: number | undefined;
    if (age !== undefined) {
      const ageValidation = validateAge(age);
      if (!ageValidation.isValid) {
        return handleValidationError(res, ageValidation);
      }
      validatedAge = typeof age === "number" ? age : parseInt(age);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email: validatedEmail } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Calculate user type and benefits
    const { userType, discount, points } = calculateUserType(
      validatedAge || 0,
      referralCode,
      marketingConsent,
      newsletterConsent
    );

    // Create new user
    const newUser = await User.create({
      name,
      email: validatedEmail,
      password,
      age: validatedAge,
      status: "active",
    });

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
      userType,
      discount,
      points,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const upd = async (
  req: TypedRequest<UpdateUserRequest>,
  res: Response<UpdateUserResponse | ErrorResponse>
) => {
  try {
    const { id } = req.params;
    const { name, email, password, age, phone, address } = req.body;

    // Find user first
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate name if provided
    if (name !== undefined) {
      const nameValidation = validateName(name);
      if (!nameValidation.isValid) {
        return handleValidationError(res, nameValidation);
      }
      user.name = name;
    }

    // Validate email if provided
    if (email !== undefined) {
      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        return handleValidationError(res, emailValidation);
      }
      user.email = email.toLowerCase();
    }

    // Validate password if provided
    if (password !== undefined) {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        return handleValidationError(res, passwordValidation);
      }
      user.password = password;
    }

    // Validate age if provided
    if (age !== undefined) {
      const ageValidation = validateAge(age);
      if (!ageValidation.isValid) {
        return handleValidationError(res, ageValidation);
      }
      user.age = typeof age === "number" ? age : parseInt(age);
    }

    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Error fetching user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user" });
  }
};
