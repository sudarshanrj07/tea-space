import { Schema, model } from "mongoose";

const detailSchema = new Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
		age: String,
		location: {
			type: String,
		},
		bio: {
			type: String,
			default: "No bio available.",
		},
		interests: [
			{
				type: String,
			},
		],
		skills: [
			{
				type: String,
			},
		],
		experience: [
			{
				title: String,
				company: String,
				duration: String,
				description: String,
			},
		],
		education: [
			{
				school: String,
				degree: String,
				duration: String,
				description: String,
			},
		],
	},
	{ timestamps: true }
);

export const Detail = model("Detail", detailSchema);
