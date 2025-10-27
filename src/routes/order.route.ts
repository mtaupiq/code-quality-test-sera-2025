import { Router } from "express";
import { 
  createOrder, 
  getAllOrders, 
  getOrderById, 
  updateOrderStatus 
} from "../controllers";

const router = Router();

router.post("/create", createOrder);
router.get("/list", getAllOrders);
router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatus);

export default router;
