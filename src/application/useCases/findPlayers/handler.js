class FindPlayersHandler {
	constructor({ playerRepository }) {
		this.playerRepository = playerRepository;
	}

	async handle(command) {
		const { query, offset, limit } = command.getFilter();
		const filterData = { offset, limit };

		if (query) {
			filterData.query = query
		}

		const players = await this.playerRepository.findAll(filterData);

		return players;
	}
}

module.exports = FindPlayersHandler;
