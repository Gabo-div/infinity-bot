const Discord = require("discord.js");
const User = require("../schema/User");
const Server = require("../schema/Server");

module.exports = async (message, xp) => {
	const { author } = message;

	if (author.bot) return;

	addXP(message, author, xp);
};

const addXP = async (message, author, xpToAdd) => {
	try {
		const addUserXP = await User.findOneAndUpdate(
			{ discordId: author.id },
			{
				$inc: {
					xp: xpToAdd,
				},
			}
		);

		if (addUserXP) {
			const { xp, level } = addUserXP;

			const newLevel = Math.floor(xp / 100);

			if (newLevel > level) {
				const reward = 120;

				const updateUserLevel = await User.findOneAndUpdate(
					{ discordId: author.id },
					{
						level: newLevel,
						$inc: {
							coins: reward,
						},
					}
				);

				const serverOptions = await Server.findOne({
					discordId: author.id,
				});

				const embedLevelUp = new Discord.MessageEmbed()
					.setTitle("Nuevo Nivel")
					.setColor("#17a2b8")
					.setDescription(
						`Felicidades ${author} ahora eres nivel ${newLevel} \n \n Haz ganado **${reward} coins**`
					);

				if (serverOptions.channels && serverOptions.channels.level) {
					const levelCh = client.channels.get(channels.level);
					return levelCh.send({ embeds: [embedLevelUp] });
				} else {
					return message.channel.send({ embeds: [embedLevelUp] });
				}
			}
		}
	} catch (error) {
		console.log(error);
	}
};
