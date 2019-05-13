
const { Command } = require('simple-command-bus');

class GetNextRound extends Command {
	constructor(gameId) {
		super();
		this.gameId = gameId;
	}

	getGameId() {
		return this.gameId;
	}
}

module.exports = GetNextRound;
