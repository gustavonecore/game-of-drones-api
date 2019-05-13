const NotFoundError = require('../../errors/notFoundError');

class GetRoundsHandler {
	constructor({ gameRepository, gameRoundRepository }) {
		this.gameRepository = gameRepository;
		this.gameRoundRepository = gameRoundRepository;
	}

	async handle(command) {
		const game = await this.gameRepository.findByUuid(command.getGameId());

		if (!game) {
			throw new NotFoundError('Game', command.getGameId());
		}

		const rounds = await this.gameRoundRepository.getRoundsByGame(game);

		return rounds;
	}
}

module.exports = GetRoundsHandler;
