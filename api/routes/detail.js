import { Router } from "express";
import {
	createUserDetails,
	deleteUserDetails,
	fetchUserDetails,
	updateUserDetails,
} from "../controllers/detail.js";

const router = Router();

router.post("/create-user-details", createUserDetails);
router.get("/get-user-details", fetchUserDetails);
router.put("/update-user-details/:id", updateUserDetails);
router.delete("/delete-user-details/:id", deleteUserDetails);

export default router;
