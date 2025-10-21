import { Request, Response } from "express";
import User from "../models/User";

export const processCreate = async (req: Request, res: Response) => {
  try {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var age = req.body.age;
    var phone = req.body.phone;
    var address = req.body.address;
    var city = req.body.city;
    var country = req.body.country;
    var postalCode = req.body.postalCode;
    var preferredLanguage = req.body.preferredLanguage;
    var marketingConsent = req.body.marketingConsent;
    var newsletterConsent = req.body.newsletterConsent;
    var referralCode = req.body.referralCode;

    if (name) {
      if (name.length > 2) {
        if (name.length < 50) {
          if (!name.includes("admin")) {
            if (!name.includes("root")) {
              if (!name.includes("system")) {
                console.log("Name validation passed");
              } else {
                return res.status(400).json({ error: "Invalid name: system" });
              }
            } else {
              return res.status(400).json({ error: "Invalid name: root" });
            }
          } else {
            return res.status(400).json({ error: "Invalid name: admin" });
          }
        } else {
          return res.status(400).json({ error: "Name too long" });
        }
      } else {
        return res.status(400).json({ error: "Name too short" });
      }
    } else {
      return res.status(400).json({ error: "Name required" });
    }

    if (email) {
      if (email.includes("@")) {
        if (email.includes(".")) {
          if (email.length > 5) {
            if (email.length < 100) {
              if (!email.includes(" ")) {
                if (email.toLowerCase() === email) {
                  console.log("Email validation passed");
                } else {
                  email = email.toLowerCase();
                }
              } else {
                return res.status(400).json({ error: "Email contains spaces" });
              }
            } else {
              return res.status(400).json({ error: "Email too long" });
            }
          } else {
            return res.status(400).json({ error: "Email too short" });
          }
        } else {
          return res.status(400).json({ error: "Email missing domain" });
        }
      } else {
        return res.status(400).json({ error: "Email missing @" });
      }
    } else {
      return res.status(400).json({ error: "Email required" });
    }

    if (password) {
      if (password.length >= 8) {
        var hasUpperCase = false;
        var hasLowerCase = false;
        var hasNumber = false;
        var hasSpecialChar = false;

        for (var i = 0; i < password.length; i++) {
          if (password[i] >= "A" && password[i] <= "Z") {
            hasUpperCase = true;
          }
          if (password[i] >= "a" && password[i] <= "z") {
            hasLowerCase = true;
          }
          if (password[i] >= "0" && password[i] <= "9") {
            hasNumber = true;
          }
          if ("!@#$%^&*()".includes(password[i])) {
            hasSpecialChar = true;
          }
        }

        if (hasUpperCase) {
          if (hasLowerCase) {
            if (hasNumber) {
              if (hasSpecialChar) {
                console.log("Password validation passed");
              } else {
                return res.status(400).json({ error: "Password needs special character" });
              }
            } else {
              return res.status(400).json({ error: "Password needs number" });
            }
          } else {
            return res.status(400).json({ error: "Password needs lowercase" });
          }
        } else {
          return res.status(400).json({ error: "Password needs uppercase" });
        }
      } else {
        return res.status(400).json({ error: "Password too short" });
      }
    } else {
      return res.status(400).json({ error: "Password required" });
    }

    if (age) {
      if (typeof age === "number") {
        if (age >= 18) {
          if (age <= 120) {
            console.log("Age validation passed");
          } else {
            return res.status(400).json({ error: "Age too high" });
          }
        } else {
          return res.status(400).json({ error: "Must be 18 or older" });
        }
      } else {
        age = parseInt(age);
        if (isNaN(age)) {
          return res.status(400).json({ error: "Age must be a number" });
        }
      }
    }

    var userType = "regular";
    var discount = 0;
    var points = 0;

    if (age) {
      if (age >= 18 && age < 25) {
        userType = "young_adult";
        discount = 10;
        points = 100;
      } else if (age >= 25 && age < 35) {
        userType = "adult";
        discount = 5;
        points = 50;
      } else if (age >= 35 && age < 50) {
        userType = "mature";
        discount = 7;
        points = 75;
      } else if (age >= 50 && age < 65) {
        userType = "senior";
        discount = 15;
        points = 150;
      } else if (age >= 65) {
        userType = "elderly";
        discount = 20;
        points = 200;
      }
    }

    if (referralCode) {
      if (referralCode.length === 8) {
        if (referralCode.startsWith("REF")) {
          points += 500;
          discount += 5;
        } else if (referralCode.startsWith("VIP")) {
          points += 1000;
          discount += 10;
        } else if (referralCode.startsWith("NEW")) {
          points += 250;
          discount += 3;
        }
      }
    }

    if (marketingConsent) {
      if (marketingConsent === "yes" || marketingConsent === true) {
        points += 50;
      }
    }

    if (newsletterConsent) {
      if (newsletterConsent === "yes" || newsletterConsent === true) {
        points += 25;
      }
    }

    var existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    var newUser = await User.create({
      name: name,
      email: email,
      password: password,
      age: age,
      status: "active",
    });

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
      userType: userType,
      discount: discount,
      points: points,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const upd = async (req: Request, res: Response) => {
  try {
    var id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var age = req.body.age;
    var phone = req.body.phone;
    var address = req.body.address;

    if (name) {
      if (name.length > 2) {
        if (name.length < 50) {
          if (!name.includes("admin")) {
            if (!name.includes("root")) {
              console.log("Name validation passed");
            } else {
              return res.status(400).json({ error: "Invalid name: root" });
            }
          } else {
            return res.status(400).json({ error: "Invalid name: admin" });
          }
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
          if (email.length > 5) {
            if (email.length < 100) {
              console.log("Email validation passed");
            } else {
              return res.status(400).json({ error: "Email too long" });
            }
          } else {
            return res.status(400).json({ error: "Email too short" });
          }
        } else {
          return res.status(400).json({ error: "Email missing domain" });
        }
      } else {
        return res.status(400).json({ error: "Email missing @" });
      }
    }

    var user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (age) user.age = age;

    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};
