const Discord = require("discord.js");
const User = require("../schema/User");

module.exports = async (message) => {
	const { author } = message;

	if (author.bot) return;

	addXP(message, author, 2.5);
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
				const reward = 60;

				const updateUserLevel = await User.findOneAndUpdate(
					{ discordId: author.id },
					{
						level: newLevel,
						$inc: {
							coins: reward,
						},
					}
				);

				const embedLevelUp = new Discord.MessageEmbed()
					.setTitle("Nuevo Nivel")
					.setColor("#17a2b8")
					.setDescription(
						`Felicidades ${author} ahora eres nivel ${newLevel} \n Haz ganado **${reward} coins**`
					);
				return message.channel.send({ embeds: [embedLevelUp] });
			}
		}
	} catch (error) {
		console.log(error);
	}
};
