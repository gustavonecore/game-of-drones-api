
const { Command } = require('simple-command-bus');

class GetRounds extends Command {
	constructor(gameId) {
		super();
		this.gameId = gameId;
	}

	getGameId() {
		return this.gameId;
	}
}

module.exports = GetRounds;
