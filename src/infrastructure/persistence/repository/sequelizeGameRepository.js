const Sequelize = require('sequelize');
const { toGame } = require('./mappers');

const Op = Sequelize.Op;

class SequelizeGameRepository {
	constructor({ database }) {
		this.model = database.models.Game;
		this.models = database.models;
	}

	findByUuid(uuid) {
		return this.model.findOne({
			attributes: { exclude: ['winner', 'playerA', 'playerB'] },
			include: [
				{ model: this.models.Player, as: 'Winner' },
				{ model: this.models.Player, as: 'PlayerA' },
				{ model: this.models.Player, as: 'PlayerB' },
			],
			where: { uuid }
		}).then(game => toGame(game));
	}

	findOneBy (...args) {
		return model.findOne({
			attributes: { exclude: ['winner', 'playerA', 'playerB'] },
			include: [
				{ model: this.models.Player, as: 'Winner' },
				{ model: this.models.Player, as: 'PlayerA' },
				{ model: this.models.Player, as: 'PlayerB' },
			],
			where: { ...args }
		}).then(game => toGame(game));
	}

	findAll(filters = {}) {
		const where = {};

		if (filters) {
			if (filters.player) {
				where[Op.or] = [
					{ playerA: filters.player },
					{ playerB: filters.player }
				];
			}

			if (filters.winner) {
				where.winner = filters.winner;
			}

			if (filters.finished) {
				where.finishedAt = { [Op.ne]: null };
			}
		}

		return this.model.findAll({
			attributes: { exclude: ['winner', 'playerA', 'playerB'] },
			include: [
				{ model: this.models.Player, as: 'Winner' },
				{ model: this.models.Player, as: 'PlayerA' },
				{ model: this.models.Player, as: 'PlayerB' },
			],
			where: where
		}).then(games => games.map(game => toGame(game)));
	}

	create(game) {
		return this.model.create(game, {
			attributes: { exclude: ['winner', 'playerA', 'playerB'] },
			include: [
				{ model: this.models.Player, as: 'Winner' },
				{ model: this.models.Player, as: 'PlayerA' },
				{ model: this.models.Player, as: 'PlayerB' },
			],
		}).then(game => game.reload()).then(game => toGame(game));
	}

	update(id, data) {
		return this.model.update(data, {
			attributes: { exclude: ['winner', 'playerA', 'playerB'] },
			include: [
				{ model: this.models.Player, as: 'Winner' },
				{ model: this.models.Player, as: 'PlayerA' },
				{ model: this.models.Player, as: 'PlayerB' },
			],
			where: { id }
		});
	}
}

module.exports = SequelizeGameRepository;
