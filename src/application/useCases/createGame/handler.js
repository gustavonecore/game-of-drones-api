const Game = require('../../../domain/game');
const GameRound = require('../../../domain/GameRound');
const ValidationError = require('../../errors/validationError');
const NotFoundError = require('../../errors/notFoundError');

class CreateGameHandler {
	constructor({ config, gameRepository, playerRepository, gameRoundRepository }) {
		this.maxRounds = config.game.max_rounds;
		this.playerRepository = playerRepository;
		this.gameRepository = gameRepository;
		this.gameRoundRepository = gameRoundRepository;
	}

	async handle(command) {
		const playerA = await this.playerRepository.findByUuid(command.getPlayerA());

		if (!playerA) {
			throw new NotFoundError('Player', command.getPlayerA());
		}

		const playerB = await this.playerRepository.findByUuid(command.getPlayerB());

		if (!playerB) {
			throw new NotFoundError('Player', command.getPlayerB());
		}

		const maxRounds = command.getMaxRounds() || this.maxRounds;

		if (maxRounds <= 0) {
			throw new ValidationError(['Max rounds must be at least 1']);
		}

		if (maxRounds % 2 === 0) {
			throw new ValidationError(['Max rounds must be an odd number']);
		}

		const gameObject = Game.create(playerA, playerB, maxRounds);

		const newGame = await this.gameRepository.create(gameObject);

		let gameRound = GameRound.create(1, newGame);

		gameRound = await this.gameRoundRepository.create(gameRound);

		return newGame;
	}
}

module.exports = CreateGameHandler;
