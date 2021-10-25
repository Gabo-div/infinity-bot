const Discord = require("discord.js");
const Jimp = require("jimp");

const User = require("../schema/User");

module.exports = {
	name: "profile",
	description: "Muestra tu perfil de usuario del bot",
	alias: [],
	type: "utility",
	async execute({ message, embed, args }) {
		const member = message.mentions.members.first();

		message.channel.sendTyping();

		let id;
		let avatarURL;
		let username;

		if (member) {
			id = member.user.id;
			avatarURL = member.user.avatarURL({
				dinamyc: true,
				format: "png",
			});
			username = member.user.username;
		} else {
			id = message.author.id;
			avatarURL = message.author.avatarURL({
				dinamyc: true,
				format: "png",
			});
			username = message.author.username;
		}

		if (!avatarURL) {
			avatarURL = "assets/avatar-template.jpg";
		}

		try {
			const user = await User.findOne({
				discordId: id,
			});

			const bgURL =
				user.bgUrl ||
				"https://res.cloudinary.com/infinity-bot/image/upload/v1634249773/default_bg.jpg";

			if (!user) {
				embed.setColor("#dc3545");
				embed.setDescription(
					"No se ha encontrado el perfil de este usuario"
				);
				return message.channel.send({ embeds: [embed] });
			}

			const { level, xp, coins } = user;

			const bg = await Jimp.read(bgURL);
			const bgOpacity = await Jimp.read(bgURL);
			const avatarImg = await Jimp.read(avatarURL);

			const font16 = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
			const font32 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);

			bgOpacity.resize(220, 450);
			bgOpacity.brightness(-1);
			bgOpacity.opacity(0.6);

			avatarImg.resize(160, 160);
			avatarImg.circle();

			bg.resize(720, 450);
			bg.composite(bgOpacity, 0, 0);
			bg.composite(avatarImg, 25, 20);

			//USERNAME TEXT
			bg.print(font32, 18, 200, {
				text: username.toUpperCase(),
				alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
			});

			//LEVEL TEXT
			bg.print(font16, 20, 250, {
				text: "NIVEL",
				alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
				alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
			});

			bg.print(font32, 18, 265, {
				text: level.toString(),
				alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
				alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
			});

			//XP TEXT
			bg.print(font16, 20, 310, {
				text: "EXP",
				alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
				alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
			});

			bg.print(font32, 18, 325, {
				text: xp.toString(),
				alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
				alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
			});

			//COINS TEXT
			bg.print(font16, 20, 370, {
				text: "COINS",
				alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
				alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
			});

			bg.print(font32, 18, 385, {
				text: coins.toString(),
				alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
				alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
			});

			const bgBuffer = await bg.getBufferAsync(Jimp.MIME_GIF);

			message.channel.send({
				files: [bgBuffer],
			});
		} catch (error) {
			console.log(error);
		}
	},
};
