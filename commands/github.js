const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
	name: "github",
	description: "Muestra información de un repositorio en github",
	alias: [],
	async execute({ message, embed, args }) {
		const search = args[0];
		const githubApi = `https://api.github.com/repos/${search}`;

		if (!search) {
			embed.setColor("#dc3545");
			embed.setDescription(
				"Debes poner el nombre del usuario y el nombre del repositorio de la siguiente forma {user}/{repo}"
			);
			return message.channel.send({ embeds: [embed] });
		}

		try {
			const res = await fetch(githubApi);

			const data = await res.json();

			if (!data.message) {
				embed.setColor("#28a745");
				embed.setAuthor(data.owner.login, data.owner.avatar_url);
				embed.setThumbnail(data.owner.avatar_url);
				embed.addField("Repositorio", data.name, true);
				embed.addField("Lenguaje", data.language, true);
				embed.addField("Forks", data.forks.toString(), true);
				embed.addField("Vistas", data.watchers.toString(), true);
				embed.addField(
					"Open Issues",
					data.open_issues.toString(),
					true
				);
				embed.addField(
					"Licencia",
					data.license ? data.license.key : "null",
					true
				);
				embed.addField(
					"Suscriptores",
					data.subscribers_count.toString(),
					true
				);
				return message.channel.send({ embeds: [embed] });
			} else {
				embed.setColor("#dc3545");
				embed.setDescription(
					"No se ha podido encontrar el repositorio"
				);
				return message.channel.send({ embeds: [embed] });
			}
		} catch (error) {
			console.log(error);
		}
	},
};
