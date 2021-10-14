module.exports = {
	name: "8ball",
	description: "Da una respuesta aleatoria",
	alias: [],
	execute({ message, embed, args }) {
		const replies = [
			"Si",
			"Es cierto",
			"Es decididamente así",
			"Buen pronóstico",
			"Todo apunta a que si",
			"Sin duda",
			"Definitivamente",
			"En mi opinión, si",
			"Debes confiar en ello",
			"Vuelve a intentarlo",
			"Pregunta en otro momento",
			"Será mejor que no te lo diga ahora",
			"No puedo decirtelo ahora",
			"Concentrate y vuelve a preguntar",
			"No cuentes con ello",
			"Seguramente no",
			"Mi respuesta es no",
			"Mi base de datos dice que no",
			"Las perspectivas no son buenas",
			"Muy dudoso",
			"No",
		];
		const question = args.join(" ");

		const random = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1) + min);
		};

		if (!question) {
			embed.setColor("#dc3545");
			embed.setDescription("Haz una pregunta de si o no");
			return message.channel.send({ embeds: [embed] });
		} else {
			message.reply(replies[random(0, replies.length - 1)]);
		}
	},
};
