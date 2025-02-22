import { Detail } from "../models/Detail.js";

export const createUserDetails = async (req, res) => {
	const userDetails = await Detail.create({ user: req.user, ...req.body });

	if (!userDetails)
		return res.status(400).json({ message: "Unable to create user details" });

	return res.status(200).json(userDetails);
};

export const fetchUserDetails = async (req, res) => {
	const findDetails = await Detail.findOne({ user: req.user });
	if (!findDetails)
		return res.status(400).json({ message: "Unable to find user details" });

	return res.status(200).json(findDetails);
};

export const updateUserDetails = async (req, res) => {
	const { age, location, bio, interests, skills, experience, education } =
		req.body;

	const findDetails = await Detail.findById(req.params.id);

	if (!findDetails)
		return res.status(400).json({ message: "Unable to find user details" });

	findDetails.age = age || findDetails.age;
	findDetails.location = location || findDetails.location;
	findDetails.bio = bio || findDetails.bio;
	if (interests.length > 0) {
		interests.forEach((interest) => {
			if (!findDetails.interests.includes(interest))
				findDetails.interests.push(interest);
		});
	}
	if (skills.length > 0) {
		skills.forEach((skill) => {
			if (!findDetails.skills.includes(skill)) findDetails.skills.push(skill);
		});
	}
	if (experience.length > 0) {
		experience.forEach((exp) => {
			const existingExpIndex = findDetails.experience.findIndex(
				(expItem) =>
					expItem.title === exp.title && expItem.company === exp.company
			);
			if (existingExpIndex === -1) {
				findDetails.experience.push(exp);
			} else {
				findDetails.experience[existingExpIndex] = {
					...findDetails.experience[existingExpIndex],
					...exp,
				};
			}
		});
	}
	if (education.length > 0) {
		education.forEach((edu) => {
			const existingEduIndex = findDetails.education.findIndex(
				(eduItem) =>
					eduItem.school === edu.school && eduItem.degree === edu.degree
			);
			if (existingEduIndex === -1) {
				findDetails.education.push(edu);
			} else {
				findDetails.education[existingEduIndex] = {
					...findDetails.education[existingEduIndex],
					...edu,
				};
			}
		});
	}

	const newDetails = await findDetails.save();

	return res.status(200).json(newDetails);
};

export const deleteUserDetails = async (req, res) => {};
