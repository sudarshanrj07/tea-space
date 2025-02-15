import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},

		profileImage: {
			type: String,
			default:
				"https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg",
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

userSchema.methods.matchPassword = async function (entredPassword) {
	return await bcrypt.compare(entredPassword, this.password);
};

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

export const User = model("User", userSchema);
