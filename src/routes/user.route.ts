import { Router } from "express";
import { 
  createUser, 
  updateUser, 
  getAllUsers, 
  getUserById, 
  deleteUser 
} from "../controllers";

const router = Router();

router.post("/register", createUser);
router.put("/:id/update", updateUser);
router.get("/all", getAllUsers);
router.get("/get/:id", getUserById);
router.delete("/remove/:id", deleteUser);

export default router;
