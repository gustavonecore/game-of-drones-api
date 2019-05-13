const { Command } = require('simple-command-bus');

class CreateGame extends Command {
	constructor(playerA, playerB, maxRounds) {
		super();
		this.playerA = playerA;
		this.playerB = playerB;
		this.maxRounds = maxRounds;
	}

	getPlayerA() {
		return this.playerA;
	}

	getPlayerB() {
		return this.playerB;
	}

	getMaxRounds() {
		return this.maxRounds;
	}
}

module.exports = CreateGame;
