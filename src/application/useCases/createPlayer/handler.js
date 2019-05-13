const Player = require('../../../domain/player');

class CreatePlayerHandler {
	constructor({ playerRepository }) {
		this.playerRepository = playerRepository;
	}

	async handle(command) {
		let newPlayer = Player.create(command.getName());

		let player = await this.playerRepository.findBySlug(newPlayer.slug);

		if (!player) {
			player = await this.playerRepository.create(newPlayer);
		}

		return player;
	}
}

module.exports = CreatePlayerHandler;
