import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Order extends Model {
  public id: any;
  public userId: any;
  public productId: any;
  public quantity: any;
  public total: any;
  public status: any;
  public createdAt: any;
  public updatedAt: any;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "orders",
  }
);

export default Order;
