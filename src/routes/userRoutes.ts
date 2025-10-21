import { Router } from "express";
import * as userController from "../controllers/user";

const router = Router();

router.post("/register", userController.processCreate);
router.put("/:id/update", userController.upd);
router.get("/all", userController.getAllUsers);
router.get("/get/:id", userController.getUserById);
router.delete("/remove/:id", userController.deleteUser);

export default router;
