const ValidateCmds = (message, guildOptions) => {
	let validations = {};
	let msgSend = {};

	//COMMAND
	if (message.content.startsWith(guildOptions.prefix)) {
		validations.command = true;
		msgSend.command = "Es comando";
	} else {
		validations.command = false;
		msgSend.command = "No es comando";
	}

	//BOT-AUTHOR
	if (message.author.bot) {
		validations.bot = true;
		msgSend.bot = "Es bot";
	} else {
		validations.bot = false;
		msgSend.bot = "No es bot";
	}

	//GUILD-MESSAGE
	if (message.guild) {
		validations.guild = true;
		msgSend.guild = "Está en servidor";
	} else {
		validations.guild = false;
		msgSend.guild = "No está en servidor";
	}

	return [validations, msgSend];
};

module.exports = ValidateCmds;
