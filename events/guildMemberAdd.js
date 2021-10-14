const user = require("../features/user");
const xp = require("../features/xp");
const antiSpam = require("../features/antiSpam");

module.exports = {
	name: "guildMemberAdd",
	async execute(client, member) {
		await user(member, null);
	},
};
