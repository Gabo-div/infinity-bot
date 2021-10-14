const Discord = require("discord.js");

module.exports = {
	name: "removerole",
	description: "Remueve roles a un usuario",
	alias: [],
	execute({ message, embed, args }) {
		const member = message.mentions.members.first();
		const roles = args.slice(1);

		if (
			message.member.permissions.has(
				Discord.Permissions.FLAGS.MANAGE_ROLES
			)
		) {
			if (!member) {
				embed.setColor("#dc3545");
				embed.setDescription("Necesitas mencionar a un usuario");
				return message.channel.send({ embeds: [embed] });
			}

			if (!roles.length) {
				embed.setColor("#dc3545");
				embed.setDescription("Especifica el nombre de un rol");
				return message.channel.send({ embeds: [embed] });
			}

			if (!member.manageable) {
				embed.setColor("#dc3545");
				embed.setDescription("Este usuario no puede ser cambiado");
				return message.channel.send({ embeds: [embed] });
			}

			let findedRoles = [];
			let noFindedRoles = [];

			roles.forEach((role) => {
				const currentRole = message.guild.roles.cache.find(
					(r) => r.name === role
				);

				if (currentRole) {
					findedRoles.push(currentRole);
				} else {
					noFindedRoles.push(role);
				}
			});

			if (noFindedRoles.length) {
				embed.setColor("#dc3545");
				embed.setDescription(
					`No se encontraron los roles: ${noFindedRoles.join(", ")}`
				);
				return message.channel.send({ embeds: [embed] });
			} else {
				member.roles.remove(findedRoles);
				embed.setColor("#28a745");
				embed.setDescription(
					`Le le an quitado los roles ${findedRoles.join(
						", "
					)}  al usuario ${member.user.username}`
				);
			}

			return message.channel.send({ embeds: [embed] });
		} else {
			embed.setColor("#dc3545");
			embed.setDescription(
				"No tienes permisos para realizar esta acción"
			);
			return message.channel.send({ embeds: [embed] });
		}
	},
};
