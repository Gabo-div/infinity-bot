const Discord = require("discord.js");

const usersMap = new Map();
const limit = 5;
const time = 10000;
const diff = 3000;

module.exports = async (message) => {
	if (message.author.bot) return;

	let isSpam;

	if (usersMap.has(message.author.id)) {
		const userData = usersMap.get(message.author.id);
		const { lastMessage, timer } = userData;
		const difference =
			message.createdTimestamp - lastMessage.createdTimestamp;
		let msgCount = userData.msgCount;

		if (difference > diff) {
			clearTimeout(timer);

			userData.msgCount = 1;
			userData.lastMessage = message;
			userData.timer = setTimeout(() => {
				usersMap.delete(message.author.id);
			}, time);

			usersMap.set(message.author.id, userData);

			isSpam = false;
		} else {
			msgCount++;
			if (parseInt(msgCount) >= limit) {
				let muteRole = message.guild.roles.cache.find(
					(r) => r.name === "Muted"
				);

				if (!muteRole) {
					await message.guild.roles.create({
						name: "Muted",
					});

					muteRole = message.guild.roles.cache.find(
						(r) => r.name === "Muted"
					);
				}

				message.guild.channels.cache.map((ch) =>
					ch.permissionOverwrites.edit(muteRole, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false,
						CREATE_PUBLIC_THREADS: false,
						CREATE_PRIVATE_THREADS: false,
						SEND_MESSAGES_IN_THREADS: false,
						SPEAK: false,
						STREAM: false,
					})
				);

				message.member.roles.add(muteRole);
				const embed = new Discord.MessageEmbed();
				embed.setColor("#dc3545");
				embed.setDescription("Se te a muteado unos segundos por spam");
				message.channel.send({ embeds: [embed] });

				setTimeout(() => {
					message.member.roles.remove(muteRole);
				}, time * 2);
			} else {
				userData.msgCount = msgCount;
				usersMap.set(message.author.id, userData);
			}

			isSpam = true;
		}
	} else {
		let fn = setTimeout(() => {
			usersMap.delete(message.author.id);
		}, time);
		usersMap.set(message.author.id, {
			msgCount: 1,
			lastMessage: message,
			time: fn,
		});

		isSpam = false;
	}

	return isSpam;
};
