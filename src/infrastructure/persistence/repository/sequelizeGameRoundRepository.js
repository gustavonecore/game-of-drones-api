const { toGameRound } = require('./mappers');

class SequelizeGameRoundRepository {
	constructor({ database }) {
		this.sequelize = database.sequelize;
		this.model = database.models.GameRound;
		this.models = database.models;
	}

	findByUuid(uuid) {
		return this.model.findOne({
			include: [
				{ model: this.models.Game, as: 'Game' },
			],
			where: { uuid }
		}).then(gameRound => toGameRound(gameRound));
	}

	findOneBy(args) {
		return this.model.findOne({
			include: [
				{ model: this.models.Game },
			],
			where: args
		}).then(gameRound => toGameRound(gameRound));
	}

	findAll(filters = {}) {
		return this.model.findAll({
			attributes: { exclude: [] },
			include: [
				{ model: this.models.Game, as: 'Game' },
			],
			where: filters,
		}).then(gameRounds => gameRounds.map(gameRound => toGameRound(gameRound)));
	}

	create(gameRound) {
		return this.model.create(gameRound, {
			attributes: { exclude: [] },
			include: [
				{ model: this.models.Game, as: 'Game' },
			],
		}).then(gameRound => gameRound.reload()).then(gameRound => toGameRound(gameRound));
	}

	update(id, data) {
		return this.model.update(data, {
			attributes: { exclude: [] },
			include: [
				{ model: this.models.Game, as: 'Game' },
			],
			where: { id }
		});
	}

	getRoundsByGame(game) {
		return this.model.findAll({
			include: [
				{ model: this.models.Player, as: 'Winner' },
			],
			where: { game_id: game.id }
		}).then(gameRounds => gameRounds.map(gameRound => toGameRound(gameRound)));
	}
}

module.exports = SequelizeGameRoundRepository;
