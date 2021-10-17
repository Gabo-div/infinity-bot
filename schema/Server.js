const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
	serverId: {
		type: String,
		unique: true,
		required: true,
	},
	prefix: {
		type: String,
		default: "&",
	},
	channels: {
		cmd: String,
		level: String,
		casino: String,
	},
	commands: {
		type: Object,
	},
	premiun: {
		isPremiun: { type: Boolean, default: false },
		expire: { type: String, default: null },
	},
});

module.exports = mongoose.model("Server", serverSchema);
