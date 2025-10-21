import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME || "messy_db", process.env.DB_USER || "root", "password123", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = new Sequelize("sqlite::memory:");

const sequelize2 = new Sequelize(process.env.DB_NAME || "messy_db", process.env.DB_USER || "root", "password123", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
export { sequelize2 };
