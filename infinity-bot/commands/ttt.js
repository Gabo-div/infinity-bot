const Discord = require("discord.js")

module.exports = {
	name: "tictactoe",
	description: "Juega tic tac toe toe o tres en raya con el bot o un usuario",
	alias: ["ttt"],
	type: "utility",
	async execute({ message, embed, args }) {

		const member = essage.mentions.members.first();
		const time = 1000 * 60 * 10
		let button = new Array([], [], []);
		let row = [];
		let current = 0;

		const addRows = (btns) => {
			let row1 = new Discord.MessageActionRow();

			for(const btn of btns){
				row1.addComponents(btn);
			}

			return row1;
		};


		const createButton = (label,style = "SECONDARY") => {
			const btn = new Discord.MessageButton()
			.setLabel(label)
			.setStyle(style)
			.setCustomId("ttt" + label)
			return btn;
		}

		for(let i = 0; i < 10; i++){
			if(button[current].length === 3) current++;
			button[current].push(createButton(":x:"))
			if(i === 9){
				for(let btn of button) row.push(addRows(btn));
			}
		}

		embed.setTitle("Tic Tac Toe");
		embed.setColor("#28a745");
		embed.setDescription(`Jugadores: \n\n${message.author} :x: \n\nRival :o: `);
		message.channel.send({content:"TTT", components: row}).then(msg => {
			console.log(msg)
		})



	},
};