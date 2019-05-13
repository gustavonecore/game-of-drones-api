const BaseController = require('../shared/baseController');
const Yup = require('yup');

/**
 * Player controller handler.
 *
 * @class PlayerController
 * @extends {BaseController}
 */
class PlayerController extends BaseController {

	/**
	 * Creates a new player.
	 *
	 * @param {*} request
	 */
	async postPlayer(request) {
		const schema = Yup.object({
			name: Yup.string().required(),
		});

		const { name } = await this.validateInput(request.body, schema);

		const createPlayer = new this.useCases.createPlayer(name);

		const player = await this.bus.handle(createPlayer);

		return this.json(player);
	}

	/**
	 * Gets a player by id or slug
	 *
	 * @param {*} request
	 */
	async getPlayer(request) {
		const getPlayer = new this.useCases.getPlayer(request.params.playerId);

		const player = await this.bus.handle(getPlayer);

		return this.json(player);
	}

	/**
	 * Gets all players
	 *
	 * @param {*} request
	 */
	async getPlayers(request) {
		const pageSizeDefault = this.container.config.api.pagination.pageSize;

		const schema = Yup.object({
			search: Yup.string(),
			page: Yup.number().positive().default(1),
			pageSize: Yup.number().positive().default(pageSizeDefault),
		});

		const { search, page, pageSize } = await this.validateInput(request.query, schema);

		const offset = (page - 1) * pageSize;
 		const limit = pageSize;

		const findPlayers = new this.useCases.findPlayers({ query: search, offset, limit });

		const players = await this.bus.handle(findPlayers);

		return this.json(players);
	}

	/**
	 * Gets all games where a player is participant.
	 *
	 * @param {*} request
	 */
	async getPlayerGames(request) {
		const { isWinner } = await this.validateInput(request.query, Yup.object({
			isWinner: Yup.boolean(),
		}));

		const filter = {
			player: request.params.playerId,
			finished: true,
		};

		if (isWinner) {
			filter.winner = request.params.playerId;
		}

		const findGames = new this.useCases.findGames(filter);

		const games = await this.bus.handle(findGames);

		return this.json(games);
	}
}

module.exports = PlayerController;
