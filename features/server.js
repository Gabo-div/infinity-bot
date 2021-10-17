const Server = require("../schema/Server");

module.exports = async (client, guild) => {
	createServer(client, guild.id);
};

const createServer = async (client, id) => {
	try {
		const newServer = new Server({
			serverId: id,
		});

		await newServer.save();
	} catch (error) {
		console.log(error);
	}
};
