const NotFoundError = require('../../errors/notFoundError');

class GetGameHandler {
	constructor({ gameRepository }) {
		this.gameRepository = gameRepository;
	}

	async handle(command) {
		const game = await this.gameRepository.findByUuid(command.getGameId());

		if (!game) {
			throw new NotFoundError('Game', command.getGameId());
		}

		return game;
	}
}

module.exports = GetGameHandler;
