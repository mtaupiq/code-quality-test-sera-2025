import User from "../models/User";

export class UserRepository {
  async findAll() {
    return await User.findAll();
  }

  async findById(id: any) {
    return await User.findByPk(id);
  }

  async findByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  async create(userData: any) {
    return await User.create(userData);
  }

  async update(id: any, data: any) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.update(data);
    return user;
  }

  async delete(id: any) {
    const user = await User.findByPk(id);
    if (!user) return false;
    await user.destroy();
    return true;
  }

  async getUserByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  async getById(id: any) {
    return await User.findByPk(id);
  }
}

export default new UserRepository();
