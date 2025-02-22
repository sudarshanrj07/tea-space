import { Invitation } from "../models/Invitation.js";

export const sendUserInvite = async (req, res) => {
	const { message, receiverId } = req.body;

	if (!message || !receiverId)
		return res
			.status(400)
			.json({ message: "Please enter all required fields" });

	const invite = await Invitation.create({
		senderId: req.user,
		receiverId,
		message,
	});

	if (!invite)
		return res
			.status(400)
			.json({ message: "Cant send invitation, pleae try again" });

	return res.status(201).json({ message: `Inviation sent successfully` });
};

export const getAllInvites = async (req, res) => {
	const { filter, value } = req.query;
	let invitations;
	if (filter === "sent")
		invitations = await Invitation.find({ senderId: value });
	if (filter === "received")
		invitations = await Invitation.find({ receiverId: value });
	else {
		invitations = await Invitation.find({});
	}

	if (!invitations.length > 0)
		return res.json({ message: "There are no invitations" });

	return res.json(invitations);
};

export const updateInviteStatus = async (req, res) => {
	const { id } = req.params;

	const invite = await Invitation.findById(id);

	if (!invite)
		return res.status(400).json({ message: "Invite does not exists anymore" });

	invite.status = req.body.status;

	const saveInvite = await invite.save();

	if (!saveInvite)
		return res
			.status(400)
			.json({ message: "Something went wrong, please try again" });

	return res.status(200).json({ message: "Success" });
};

export const deleteUserInvite = async (req, res) => {
	const invite = await Invitation.findByIdAndDelete(req.params.id);

	if (!invite)
		return res.status(400).json({ message: "Invite does not exists anymore" });

	return res.status(200).json({ message: "Success" });
};
