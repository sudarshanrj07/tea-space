import { User } from "../models/User.js";
import { generateToken } from "../utils/tokenGenrator.js";
import { cloud } from "../utils/upload.js";

//User Creation route
export const createUserHandler = async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password)
		return res
			.status(400)
			.json({ message: "Please enter all required fields" });

	if ((await User.find({ email: email })).length > 0)
		return res.status(400).json({ message: "User already Exists" });

	let profileImage;
	if (req.file) {
		profileImage = await cloud(req.file.path, email);
	}

	const newUser = await User.create({ name, email, password, profileImage });

	if (!newUser)
		return res.status(400).json({ message: "User Creation failed" });

	return res.status(200).json(newUser);
};

//User login route
export const loginUserHandler = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password)
		return res
			.status(400)
			.json({ message: "Please enter all required fields" });

	const findUser = await User.findOne({ email });

	if (findUser && (await findUser.matchPassword(password))) {
		return res.status(200).json({
			_id: findUser._id,
			name: findUser.name,
			email: findUser.email,
			token: generateToken(findUser._id),
		});
	}
	return res.status(200).json({ message: "Invalid Credentials" });
};

//Get user route
export const fetchUserHandler = async (req, res) => {
	const findUser = await User.findById(req.user);

	if (!findUser) return res.status(404).json({ message: "User not found" });

	return res.status(200).json({
		_id: findUser._id,
		name: findUser.name,
		email: findUser.email,
	});
};

//update user route
export const updateUserHandler = async (req, res) => {
	const {
		body: { name, email, password },
		user: _id,
	} = req;

	const findUser = await User.findById(_id);

	if (!findUser) return res.status(404).json({ message: "User not found" });

	findUser.name = name || findUser.name;
	findUser.email = email || findUser.email;

	if (password) findUser.password = password;

	const updatedUser = await findUser.save();

	return res.status(200).json({
		_id: updatedUser._id,
		name: updatedUser.name,
		email: updatedUser.email,
		token: generateToken(updatedUser._id),
	});
};
