import { Router } from "express";
import {
	createUserDetails,
	deleteUserDetails,
	fetchUserDetails,
	updateUserDetails,
} from "../controllers/detail.js";

const router = Router();

router.use("/create-user-details", createUserDetails);
router.use("/get-user-details", fetchUserDetails);
router.use("/update-user-details/:id", updateUserDetails);
router.use("/delete-user-details", deleteUserDetails);

export default router;
