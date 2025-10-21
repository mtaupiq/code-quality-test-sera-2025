import express from "express";
import bodyParser from "body-parser";
import sequelize from "./config/database";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/product";
import orderRoutes from "./routes/order.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Messy Express API!");
});

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("Environment:", process.env.NODE_ENV || "development");
      console.log("Database:", process.env.DB_NAME || "messy_db");
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

function unusedHelperFunction() {
  console.log("This function is never called");
  return 42;
}

export default app;
