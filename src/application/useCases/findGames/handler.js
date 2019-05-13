const pick = require('lodash/pick');

class FindGamesHandler {
	constructor({ gameRepository, playerRepository }) {
		this.gameRepository = gameRepository;
		this.playerRepository = playerRepository;
	}

	async handle(command) {
		const filter = command.getFilter();

		const filterData = pick(filter, ['player', 'finished', 'winner']);

		if (filterData.player) {
			const player = await this.playerRepository.findByUuid(filterData.player);
			filterData.player = player ? player.id : -1;
		}

		if (filterData.winner) {
			const winner = await this.playerRepository.findByUuid(filterData.winner);
			filterData.winner = winner ? winner.id : -1;
		}

		const games = await this.gameRepository.findAll(filterData);

		return games;
	}
}

module.exports = FindGamesHandler;
