const Server = require("../schema/Server");

module.exports = async (guild) => {
	createServer(guild.id);
};

const createServer = async (id) => {
	try {
		const newServer = new Server({
			serverId: id,
		});

		await newServer.save();
	} catch (error) {
		console.log(error);
	}
};
