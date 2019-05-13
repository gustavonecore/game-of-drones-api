const uuidv4 = require('uuid/v4');

class Game {
	constructor({ id, uuid, playerA, playerB, winner, maxRounds, currentRound, createdAt, finishedAt }) {
		this.id = id;
		this.uuid = uuid;
		this.playerA = playerA;
		this.playerB = playerB;
		this.winner = winner || null;
		this.maxRounds = maxRounds;
		this.currentRound = currentRound;
		this.createdAt = createdAt;
		this.finishedAt = finishedAt || null;
	}

	static create(playerA, playerB, maxRounds) {
		return new Game({
			uuid: uuidv4(),
			currentRound: 1,
			createdAt: new Date,
			playerA,
			playerB,
			maxRounds,
		});
	}
}

module.exports = Game;
