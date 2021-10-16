const { MessageEmbed } = require("discord.js");
const { pagination } = require("reconlx");

module.exports = {
	name: "help",
	description: "Muestra una lista de los comandos disponibles",
	alias: [],
	type: "utility",
	execute({ message, client, args }) {
		const embeds = [];

		let page = new MessageEmbed();
		let pageLimit = 5;

		const cmds = [...client.commands.values()];

		for (const index in cmds) {
			const cmd = cmds[index];
			const i = parseInt(index) + 1;

			page.setTitle(`Comandos - ${cmds.length}`);
			page.setColor("#17a2b8");
			page.addField(cmd.name, cmd.description);

			if (i === pageLimit) {
				embeds.push(page);
				page = new MessageEmbed();
				pageLimit += 5;
			}
		}

		embeds.push(page);

		pagination({
			embeds,
			message,
			author: message.author,
			channel: message.channel,
			button: [
				{
					name: "previous",
					style: "PRIMARY",
				},
				{
					name: "next",
					style: "PRIMARY",
				},
			],
		});
	},
};
