import { Router } from "express";
import { userAuth } from "../middlewares/auth.js";
import {
	createEduationDetails,
	fetchEducationDetails,
} from "../controllers/education.js";

const router = Router();

router.post("/create-education-details/:id", createEduationDetails);
router.get("/get-education-details/:id", fetchEducationDetails);
router.put("/update-education-details/:id");
router.delete("/delete-education-details/:id");

export default router;
