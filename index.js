const Discord = require("discord.js");
const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();
require("./slashCommands");
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.connection.on("error", (e) => {
	console.error(e);
});

//COMMANDS
client.commands = new Discord.Collection();
const commandsFiles = fs.readdirSync("./commands");

for (const file of commandsFiles) {
	if (file.endsWith(".js")) {
		const command = require(`./commands/${file}`);
		client.commands.set(command.name, command);
	}
}

//SLASH COMMANDS
client.slashCommands = new Discord.Collection();
const slashCommandsFiles = fs.readdirSync("./slash");

for (const file of slashCommandsFiles) {
	if (file.endsWith(".js")) {
		const command = require(`./slash/${file}`);
		client.slashCommands.set(command.data.name, command);
	}
}

//EVENTS
const eventsFiles = fs.readdirSync("./events");

for (const file of eventsFiles) {
	if (file.endsWith(".js")) {
		const event = require(`./events/${file}`);

		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}

client.login(process.env.BOT_TOKEN);
