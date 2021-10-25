const mongoose = require("mongoose");
const moment = require("moment");

const userSchema = new mongoose.Schema({
	discordId: {
		type: String,
		require: true,
		unique: true,
	},
	discordTag: {
		type: String,
		require: true,
	},
	avatar: {
		type: String,
		require: true,
	},
	guilds: {
		type: Array,
		require: true,
		default: [],
	},
	premiun: {
		isPremiun: { type: Boolean, default: false },
		expire: { type: Date, default: null },
	},
	bgUrl: {
		type: String,
		default:
			"https://res.cloudinary.com/infinity-bot/image/upload/v1634249773/default_bg.jpg",
	},
	level: {
		type: Number,
		default: 0,
	},
	xp: {
		type: Number,
		default: 0,
	},
	coins: {
		type: Number,
		default: 0,
	},
	transactions: [
		{
			from: String,
			to: String,
			amount: Number,
			date: {
				type: Date,
				default: moment().utc(),
			},
		},
	],
	daily: {
		type: Date,
		default: 0
	}
});

module.exports = mongoose.model("User", userSchema);
