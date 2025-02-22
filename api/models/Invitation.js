import { Schema, model } from "mongoose";

const invitationSchema = new Schema(
	{
		senderId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		receiverId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		message: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "accepted", "declined"],
			default: "pending",
		},
	},
	{ timestamps: true }
);

export const Invitation = model("Invitation", invitationSchema);
