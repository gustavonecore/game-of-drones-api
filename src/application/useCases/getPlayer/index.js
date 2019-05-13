const { Command } = require('simple-command-bus');

class GetPlayer extends Command {
	constructor(playerId) {
		super();
		this.playerId = playerId;
	}

	getPlayerId() {
		return this.playerId;
	}
}

module.exports = GetPlayer;
