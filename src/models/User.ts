import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  public id: any;
  public name: any;
  public email: any;
  public password: any;
  public age: any;
  public status: any;
  public createdAt: any;
  public updatedAt: any;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;
