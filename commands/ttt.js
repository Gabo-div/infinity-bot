const Discord = require("discord.js");

module.exports = {
	name: "tictactoe",
	description: "Juega tic tac toe toe o tres en raya con el bot o un usuario",
	alias: ["ttt"],
	type: "fun",
	async execute({ message, embed, args }) {
		const member = message.mentions.members.first();

		if (member && member.user.bot) {
			embed.setColor("#dc3545");
			embed.setDescription("No puedes jugar con un bot");
			return message.channel.send({ embeds: [embed] });
		}

		if (member && member.user.id === message.author.id) {
			embed.setColor("#dc3545");
			embed.setDescription("No puedes contigo mismo");
			return message.channel.send({ embeds: [embed] });
		}

		const time = 1000 * 60 * 3;
		let button = new Array([], [], []);
		let row = [];
		let current = 0;

		const addRows = (btns) => {
			let row1 = new Discord.MessageActionRow();

			for (const btn of btns) {
				row1.addComponents(btn);
			}

			return row1;
		};

		const createButton = (label, emoji, id, style = "SECONDARY") => {
			const btn = new Discord.MessageButton()
				.setLabel(label)
				.setStyle(style)
				.setCustomId("ttt" + id);

			if (emoji) {
				btn.setEmoji(emoji);
				btn.setDisabled(true);
			}
			return btn;
		};

		const random = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1) + min);
		};

		for (let i = 1; i < 10; i++) {
			if (button[current].length === 3) current++;
			button[current].push(createButton(" ", null, i));
			if (i === 9) {
				for (let btn of button) row.push(addRows(btn));
			}
		}

		const findButtonIndex = (btnArr, btn) => {
			let btnIndex;

			btnArr.forEach((el, i) => {
				const x = el.components.findIndex(
					(com) => com.customId === btn.customId
				);
				if (x !== -1) {
					btnIndex = { x, y: i };
				}
			});

			return btnIndex;
		};

		embed.setTitle("Tic Tac Toe");
		embed.setColor("#28a745");
		embed.setDescription(
			`Jugadores: \n${message.author} :x: \n${
				member ? member : "<@895353026439704576>"
			} :o: `
		);
		message.channel
			.send({
				content: `Turno de ${message.author}`,
				embeds: [embed],
				components: row,
			})
			.then((msg) => {
				let buttonsGame = [...row];
				const player1 = message.author.id;
				let player2 = member ? member.user.id : false;
				let botInterval;
				let userTurn = true;

				const filter = (i) => i.user.id === player1 || player2 && i.user.id === player2

				const collect = msg.createMessageComponentCollector({
					filter,
					time,
				});

				const embed1 = new Discord.MessageEmbed();
				embed1.setTitle("Tic Tac Toe");
				embed1.setColor("#28a745");
				embed1.setDescription(
					`Jugadores: \n${message.author} :x: \n${
						member ? member : "<@895353026439704576>"
					} :o: \n`
				);

				const gameOver = setTimeout(() => {
					embed1.setColor("#dc3545");
					embed1.setDescription("El tiempo de juego ha acabado")
					msg.edit({content:" ", embeds:[embed1], components:[]})
				}, time)

				collect.on("collect", (btn) => {
					btn.deferUpdate();

					const editMsg = () => {
						let turnContent;

						if (player2) {
							if (!userTurn)
								turnContent = `Turno de: <@${player1}>`;
							else if (userTurn)
								turnContent = `Turno de: <@${player2}>`;
						} else {
							if (!userTurn)
								turnContent = `Turno de: <@${player1}>`;
							else if (userTurn)
								turnContent = `Turno de: <@895353026439704576>`;
						}
						msg.edit({
							content: turnContent,
							embeds: [embed1],
							components: buttonsGame,
						});

						const result = checkGame();
						if (result) {
							clearInterval(botInterval);
						}

						userTurn = !userTurn;
					};

					if (userTurn && btn.user.id === player1) {
						const btnIndex = findButtonIndex(buttonsGame, btn);
						buttonsGame[btnIndex.y].components[btnIndex.x] =
							createButton(
								"",
								"❌",
								btnIndex.y * 3 + (btnIndex.x + 1),
								"PRIMARY"
							);
						editMsg()
					} else if (
						!userTurn &&
						player2 &&
						btn.user.id === player2
					) {
						const btnIndex = findButtonIndex(buttonsGame, btn);
						buttonsGame[btnIndex.y].components[btnIndex.x] =
							createButton(
								"",
								"⭕",
								btnIndex.y * 3 + (btnIndex.x + 1),
								"DANGER"
							);
							editMsg()
					}
				});

				const checkGame = () => {
					let result;
					let winner;
					const checkedButtons = [[], [], []];
					//SORT
					for (let y = 0; y < 3; y++) {
						for (let x = 0; x < 3; x++) {
							const button = buttonsGame[y].components[x];
							if (button.emoji) {
								checkedButtons[y].push(button.emoji.name);
							} else {
								checkedButtons[y].push(null);
							}
						}
					}

					//CHECK
					const checkCases = (checkcase = 0) => {
						if (checkcase === 0) {
							for (let y = 0; y < 3; y++) {
								let collected = [];
								let matchs = 0;

								for (let x = 0; x < 3; x++) {
									const button = checkedButtons[y][x];
									collected.push(button);

									if (button && button === collected[x - 1]) {
										matchs++;
									}
								}

								if (matchs === 2) {
									result = true;
									winner = checkedButtons[y][0];
									break;
								}
							}
						} else if (checkcase === 1) {
							let collected = [];
							let matchs = 0;

							for (let i = 0; i < 3; i++) {
								for (let y = 0; y < 3; y++) {
									const button = checkedButtons[y][i];
									collected.push(button);

									if (button && button === collected[y - 1]) {
										matchs++;
									}
								}
								if (matchs === 2) {
									result = true;
									winner = checkedButtons[i][i];
									break;
								}
								collected = [];
								matchs = 0;
							}
						} else if (checkcase === 2) {
							let collected = [];
							let matchs = 0;

							for (let y = 0; y < 3; y++) {
								const button = checkedButtons[y][y];
								collected.push(button);

								if (button && button === collected[y - 1]) {
									matchs++;
								}

								if (matchs === 2) {
									result = true;
									winner = button;
								}
							}

							if (!result) {
								collected = [];
								matchs = 0;
								let count = 2;

								for (let y = 0; y < 3; y++) {
									const button = checkedButtons[y][count];
									collected.push(button);
									count--;

									if (button && button === collected[y - 1]) {
										matchs++;
									}

									if (matchs === 2) {
										result = true;
										winner = button;
									}
								}
							}
						}

						if (!result && checkcase !== 2) {
							checkCases(checkcase + 1);
						}
					};
					checkCases();

					if (!result) {
						let full = true;
						checkedButtons.forEach((el) => {
							const noEmojiBtn = el.findIndex(
								(btn) => btn === null
							);

							if (noEmojiBtn !== -1) {
								full = false;
							}

							if (full) {
								result = true;
								winner = false;
								return;
							}
						});
					}

					if (result) {
						embed1.setDescription(
							winner ? `Ganador: ${winner}` : "Empate"
						);
						msg.edit({
							content: " ",
							embeds: [embed1],
							components: [],
						});
						clearTimeout(gameOver)
					}
					return result;
				};

				if (!player2) {
					botInterval = setInterval(() => {
						if (!userTurn) {
							userTurn = !userTurn;

							const changeButton = () => {
								const randomY = random(0, 2);
								const randomX = random(0, 2);

								let button =
									buttonsGame[randomY].components[randomX];
								if (!button.emoji) {
									buttonsGame[randomY].components[randomX] =
										createButton(
											"",
											"⭕",
											randomY * 3 + (randomX + 1),
											"DANGER"
										);
								} else {
									changeButton();
								}
							};

							changeButton();

							msg.edit({
								embeds: [embed1],
								components: buttonsGame,
							});

							const result = checkGame();
							if (result) clearInterval(botInterval);
						}
					}, 500);
				}
			});
	},
};
