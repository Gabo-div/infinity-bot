const Discord = require("discord.js");
const ValidateCmds = require("../ValidateCmds");
const guildOptions = require("../guildOptionsDemo.json");

const user = require("../features/user");
const xp = require("../features/xp");
const antiSpam = require("../features/antiSpam");

const Server = require("../schema/Server");

module.exports = {
	name: "messageCreate",
	async execute(client, message) {
		try {
			const ServerOptions = await Server.findOne({
				serverId: message.guild.id,
			});

			const [validations] = ValidateCmds(message, ServerOptions);

			const cooldown = await antiSpam(message);

			if (!cooldown && !validations.command) {
				await user(null, message);
				await xp(message, 2.5);
			} else if (!cooldown && validations.command) {
				await user(null, message);
				await xp(message, 0.5);
			}

			if (validations.bot || !validations.command || !validations.guild) {
				return;
			}

			//COMANDS EXECUTE
			const args = message.content
				.slice(guildOptions.prefix.length)
				.trim()
				.split(/ +/g);

			const command = args.shift().toLowerCase();

			const embed = new Discord.MessageEmbed();

			const cmd = client.commands.find(
				(c) =>
					c.name === command || (c.alias && c.alias.includes(command))
			);

			const cmdAttributes = {
				args,
				message,
				client,
				embed,
			};

			if (
				ServerOptions.channels.casino &&
				cmd.type &&
				cmd.type === "casino" &&
				ServerOptions.channels.casino !== message.channel.id
			) {
				embed.setColor("#dc3545");
				embed.setDescription(
					`Solo recibo comandos de casino del canal <#${ServerOptions.channels.cmd}>`
				);
				return message.channel.send({ embeds: [embed] });
			} else if (
				cmd.type &&
				cmd.type !== "casino" &&
				ServerOptions.channels.cmd &&
				ServerOptions.channels.cmd !== message.channel.id
			) {
				embed.setColor("#dc3545");
				embed.setDescription(
					`Solo recibo comandos del canal <#${ServerOptions.channels.cmd}>`
				);
				return message.channel.send({ embeds: [embed] });
			}

			if (cmd) await cmd.execute(cmdAttributes);
		} catch (error) {
			console.log(error);
			embed.setTitle("Error");
			embed.setDescription("Ha ocurrido un error no esperado.");
			return message.channel.send({ embeds: [embed] });
		}
	},
};
