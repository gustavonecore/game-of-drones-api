const { Command } = require('simple-command-bus');

class AddMovement extends Command {
	constructor(gameId, playerId, movement) {
		super();
		this.gameId = gameId;
		this.playerId = playerId;
		this.movement = movement;
	}

	getGameId() {
		return this.gameId;
	}

	getPlayerId() {
		return this.playerId;
	}

	getMovement() {
		return this.movement;
	}
}

module.exports = AddMovement;
