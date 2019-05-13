const NotFoundError = require('../../errors/notFoundError');

class GetNextRoundHandler {
	constructor({ gameRepository, gameRoundRepository }) {
		this.gameRepository = gameRepository;
		this.gameRoundRepository = gameRoundRepository;
	}

	async handle(command) {
		const game = await this.gameRepository.findByUuid(command.getGameId());

		if (!game) {
			throw new NotFoundError('Game', command.getGameId());
		}

		const gameRound = await this.gameRoundRepository.findOneBy({
			index: game.currentRound,
			game_id: game.id
		});

		if (!gameRound) {
			throw new NotFoundError('Game Round for game ', command.getGameId());
		}

		// Select who is the next player according to selections
		let nextPlayer = gameRound.selectionA === null ? game.playerA : (
			gameRound.selectionB === null ? game.playerB : null
		);

		const nextRound = game.finishedAt ? null :  {
			round: gameRound.index,
			createdAt: gameRound.createdAt,
			selectionA: gameRound.selectionA,
			selectionB: gameRound.selectionB,
			winner: null,
			player: nextPlayer,
		};

		return {
			nextRound,
			game: {
				uuid: game.uuid,
				finishedAt: game.finishedAt,
				winner: game.winner,
			}
		};
	}
}

module.exports = GetNextRoundHandler;
