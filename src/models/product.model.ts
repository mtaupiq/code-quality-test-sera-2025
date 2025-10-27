import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Product extends Model {
  public id: any;
  public name: any;
  public price: any;
  public description: any;
  public category: any;
  public stock: any;
  public createdAt: any;
  public updatedAt: any;
}

Product.init(
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
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "products",
  }
);

export default Product;
