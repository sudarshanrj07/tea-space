import jwt from "jsonwebtoken";
//import { User } from "../models/User.js";

export const userAuth = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const { id } = await jwt.verify(token, process.env.JWT_SECRET);
			//req.user = await User.findById(decodedToken.id).select("-password");
			req.user = id;
			next();
		} catch (error) {
			return res
				.status(400)
				.json({ message: "User not Authorize please login again" });
		}
	}
	if (!token) {
		res.status(401).json({ message: "Not authorized!" });
	}
};
