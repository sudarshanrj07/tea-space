import { Router } from "express";
import {
	createUserHandler,
	fetchUserHandler,
	loginUserHandler,
	updateUserHandler,
} from "../controllers/user.js";
import { upload } from "../utils/upload.js";
import { userAuth } from "../middlewares/auth.js";

const router = Router();

router.post("/signup", upload.single("profileImage"), createUserHandler);
router.post("/signin", loginUserHandler);
router.get("/get-user", userAuth, fetchUserHandler);
router.put("/update-user", userAuth, updateUserHandler);

export default router;
