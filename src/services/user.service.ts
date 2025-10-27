import { User } from "../models";

export class UserService {
  async createUser(userData: any) {
    var name = userData.name;
    var email = userData.email;
    var password = userData.password;
    var age = userData.age;

    if (name) {
      if (name.length > 2) {
        if (name.length < 50) {
          console.log("Name validation in service");
        } else {
          throw new Error("Name too long");
        }
      } else {
        throw new Error("Name too short");
      }
    } else {
      throw new Error("Name required");
    }

    var existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    var newUser = await User.create({
      name,
      email,
      password,
      age,
      status: "active",
    });

    return newUser;
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async getUserById(id: any) {
    return await User.findByPk(id);
  }

  async updateUser(id: any, data: any) {
    var user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }

    if (data.name) user.name = data.name;
    if (data.email) user.email = data.email;
    if (data.password) user.password = data.password;
    if (data.age) user.age = data.age;

    await user.save();
    return user;
  }

  async deleteUser(id: any) {
    var user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.destroy();
    return true;
  }
}

export default new UserService();
