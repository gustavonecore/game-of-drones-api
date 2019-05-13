const Sequelize = require('sequelize');
const { toPlayer } = require('./mappers');

const Op = Sequelize.Op;

class SequelizePlayerRepository {
	constructor({ database }) {
		this.model = database.models.Player;
		this.models = database.models;
	}

	findByUuid(uuid) {
		return this.model.findOne({
			where: { uuid }
		}).then(player => toPlayer(player));
	}

	findBySlug(slug) {
		return this.model.findOne({
			where: { slug }
		}).then(player => toPlayer(player));
	}

	findOneBy(args) {
		return this.model.findOne({
			where: args
		}).then(player => toPlayer(player));
	}

	findAll(filters = {}) {
		const options = {
			where: {},
		};

		if (filters && filters.query) {
			options.where.name = {
				[Op.like]: `%${filters.query}%`,
			};
		}

		if (filters.offset) {
			options.offset = filters.offset;
		}

		if (filters.limit) {
			options.limit = filters.limit;
		}

		return this.model.findAll(options).then(players => players.map(player => toPlayer(player)));
	}

	create(player) {
		return this.model.create(player)
			.then(gameRound => gameRound.reload())
			.then(player => toPlayer(player));
	}

	update(id, data) {
		return this.model.update(data, {
			attributes: { exclude: [] },
			where: { id }
		});
	}
}

module.exports = SequelizePlayerRepository;
