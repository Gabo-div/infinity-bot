const User = require("../schema/User");

module.exports = async (member, message) => {
	if (message) {
		const { author } = message;

		if (author.bot) return;

		createUser(author);
	}

	if (member) {
		const { user } = member;

		if (user.bot) return;

		createUser(user);
	}
};

const createUser = async (author) => {
	try {
		const userExist = await User.findOne({ discordId: author.id });

		if (userExist) {
			const updateUser = await User.findOneAndUpdate(
				{
					discordId: author.id,
				},
				{
					discordTag: author.tag,
					avatar: author.avatar,
				}
			);
		} else {
			const newUser = new User({
				discordId: author.id,
				discordTag: author.tag,
				avatar: author.avatar,
			});

			await newUser.save();
		}
	} catch (error) {
		console.log(error);
	}
};
