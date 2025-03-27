import { Education } from "../models/Education.js";

export const createEduationDetails = async (req, res) => {
	console.log("inside eudaction post");

	console.log(req.body);
	const user = req.params.id;
	if (!user) return res.status(400).json({ error: "User ID is required" });

	try {
		const educationData = req.body.education.map((item) => ({
			user: user,
			school: item.school,
			degree: item.degree,
			duration: item.duration,
			description: item.description,
		}));

		await Education.insertMany(educationData);

		res.status(200).json({ message: "Education data added successfully" });
	} catch (error) {
		res.status(400).json({ error: "Failed to add education data" });
	}
};

export const fetchEducationDetails = async (req, res) => {
	const education = await Education.find({ user: req.params.id });
	console.log(education);
	if (!education)
		return res
			.status(400)
			.json({ message: "Unable to find education details" });

	return res.status(200).json(education);
};
