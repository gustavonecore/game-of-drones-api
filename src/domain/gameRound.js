const uuidv4 = require('uuid/v4');

class GameRound {
	constructor({ id, uuid, index, game, winner, selectionA, selectionB, createdAt }) {
		this.id = id;
		this.uuid = uuid;
		this.index = index;
		this.game = game;
		this.winner = winner || null;
		this.selectionA = selectionA || null;
		this.selectionB = selectionB || null;
		this.createdAt = createdAt;
	}

	static create(index, game) {
		return new GameRound({
			uuid: uuidv4(),
			createdAt: new Date,
			index,
			game,
		});
	}
}

module.exports = GameRound;
