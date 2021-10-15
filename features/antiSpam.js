const Discord = require("discord.js");

const usersMap = new Map();
const time = 120000;
const diff = 60000;

module.exports = async (message) => {
	if (message.author.bot) return;

	let cooldown;

	if (usersMap.has(message.author.id)) {
		const userData = usersMap.get(message.author.id);
		const { lastMessage, timer } = userData;
		const difference =
			message.createdTimestamp - lastMessage.createdTimestamp;

		if (difference > diff) {
			clearTimeout(timer);

			userData.msgCount = 1;
			userData.lastMessage = message;
			userData.timer = setTimeout(() => {
				usersMap.delete(message.author.id);
			}, time);

			usersMap.set(message.author.id, userData);

			cooldown = false;
		} else {
			cooldown = true;
		}
	} else {
		let fn = setTimeout(() => {
			usersMap.delete(message.author.id);
		}, time);
		usersMap.set(message.author.id, {
			lastMessage: message,
			time: fn,
		});

		cooldown = false;
	}

	return cooldown;
};
