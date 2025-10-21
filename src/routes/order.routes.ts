import { Router } from "express";
import * as orderController from "../controllers/order.controller";

const router = Router();

router.post("/create", orderController.make);
router.get("/list", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.patch("/:id/status", orderController.updateOrderStatus);

export default router;
