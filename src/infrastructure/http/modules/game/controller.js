const BaseController = require('../shared/baseController');
const Yup = require('yup');

/**
 * Game controller handler.
 *
 * @class GameController
 * @extends {BaseController}
 */
class GameController extends BaseController {
	/**
	 * Creates a game
	 *
	 * @param {*} request
	 */
	async postGame(request) {
		const schema = Yup.object({
			playerA: Yup.string().required(),
			playerB: Yup.string().required(),
		});

		const { playerA, playerB } = await this.validateInput(request.body, schema, { abortEarly: true });

		const createGame = new this.useCases.createGame(playerA, playerB);

		const game = await this.bus.handle(createGame);

		const getNextRound = new this.useCases.getNextRound(game.uuid);

		const { nextRound } = await this.bus.handle(getNextRound);

		return this.json({ game, nextRound });
	}

	/**
	 * Creates a new movement in the game.
	 * It checks if the player and movement belongs to the current round.
	 *
	 * @param {*} request
	 */
	async postMovement(request) {
		const { gameId, playerId } = request.params;

		const schema = Yup.object({
			movement: Yup.string().required().oneOf(['paper', 'rock', 'scissors']),
		});

		const { movement } = await this.validateInput(request.body, schema);

		const addMovement = new this.useCases.addMovement(gameId, playerId, movement);

		const { currentRound } = await this.bus.handle(addMovement);

		const getNextRound = new this.useCases.getNextRound(gameId);

		const { nextRound, game } = await this.bus.handle(getNextRound);

		return this.json({ nextRound, currentRound, game });
	}

	/**
	 * Gets a game by id
	 *
	 * @param {*} request
	 */
	async getGame(request) {
		const getGame = new this.useCases.getGame(request.params.gameId);

		const game = await this.bus.handle(getGame);

		return this.json(game);
	}

	/**
	 * Gets all available games
	 *
	 * @param {*} request
	 */
	async getGames(request) {
		const filter = await this.validateInput(request.query, Yup.object({
			winner: Yup.string(),
			player: Yup.string(),
			finished: Yup.boolean(),
		}));

		const findGames = new this.useCases.findGames(filter);

		const games = await this.bus.handle(findGames);

		return this.json(games);
	}

	/**
	 * Gets all rounds.
	 *
	 * @param {*} request
	 */
	async getRounds(request) {
		const getRounds = new this.useCases.getRounds(request.params.gameId);

		const rounds = await this.bus.handle(getRounds);

		return this.json(rounds);
	}
}

module.exports = GameController;
