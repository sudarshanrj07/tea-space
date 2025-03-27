import { Schema, model } from "mongoose";

const educationSchema = new Schema({
	user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
	school: { type: String, required: true },
	degree: { type: String, required: true },
	duration: { type: String, required: true },
	description: { type: String, required: true },
});

export const Education = model("Education", educationSchema);
