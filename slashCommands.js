const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guild } = require("./config.json");

const commands = [];
const slashCommandsFiles = fs
	.readdirSync("./slash")
	.filter((f) => f.endsWith("js"));

for (const file of slashCommandsFiles) {
	if (file.endsWith(".js")) {
		const command = require(`./slash/${file}`);

		commands.push(command.data.toJSON());
	}
}

const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);

(async () => {
	try {
		await rest.put(Routes.applicationCommands(clientId, guild), {
			body: commands,
		});
	} catch (error) {
		console.log(error);
	}
})();
