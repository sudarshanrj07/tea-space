import { Router } from "express";
import userRoute from "./user.js";
import detailRoute from "./detail.js";
import { userAuth } from "../middlewares/auth.js";

const router = Router();

router.use("/user", userRoute);
router.use("/detail", userAuth, detailRoute);

export default router;
