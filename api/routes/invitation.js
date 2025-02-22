import { Router } from "express";
import {
	deleteUserInvite,
	getAllInvites,
	sendUserInvite,
	updateInviteStatus,
} from "../controllers/invitation.js";

const router = Router();

router.post("/send-user-invite", sendUserInvite);
router.get("/get-all-invites", getAllInvites);
router.put("/update-user-invite/:id", updateInviteStatus);
router.delete("/delete-user-invite/:id", deleteUserInvite);

export default router;
