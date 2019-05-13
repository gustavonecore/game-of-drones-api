const NotFoundError = require('../../errors/notFoundError');

class GetPlayerHandler {
	constructor({ playerRepository }) {
		this.playerRepository = playerRepository;
	}

	async handle(command) {
		let player = await this.playerRepository.findByUuid(command.getPlayerId());

		if (!player) {
			// Try to find by slug
			player = await this.playerRepository.findBySlug(command.getPlayerId());

			if (!player) {
				throw new NotFoundError('Player', command.getPlayerId());
			}
		}

		return player;
	}
}

module.exports = GetPlayerHandler;
