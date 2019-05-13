const Sequelize = require('sequelize');

class Game extends Sequelize.Model {}

module.exports = (sequelize, DataTypes) => {
	Game.init({
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false
		},
		winner: {
			type: DataTypes.INTEGER,
			field: 'winner_id',
			allowNull: true,
			set(player) {
				if (player && player.id) {
					this.setDataValue('winner', player.id);
				} else if (Number.isInteger(player)) {
					this.setDataValue('winner', player);
				}
			}
		},
		playerA: {
			type: DataTypes.INTEGER,
			field: 'player_a',
			allowNull: false,
			set(player) {
				if (player && player.id) {
					this.setDataValue('playerA', player.id);
				} else if (Number.isInteger(player)) {
					this.setDataValue('playerA', player);
				}
			}
		},
		playerB: {
			type: DataTypes.INTEGER,
			field: 'player_b',
			allowNull: false,
			set(player) {
				if (player && player.id) {
					this.setDataValue('playerB', player.id);
				} else if (Number.isInteger(player)) {
					this.setDataValue('playerB', player);
				}
			}
		},
		maxRounds: {
			type: DataTypes.INTEGER,
			field: 'max_rounds',
			allowNull: false,
			defaultValue: 3,
		},
		currentRound: {
			type: DataTypes.INTEGER,
			field: 'current_round',
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			field: 'created_at',
			allowNull: false
		},
		finishedAt: {
			type: DataTypes.DATE,
			field: 'finished_at',
			allowNull: true
		},
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'game',
		sequelize,
	});

	Game.associate = models => {
		Game.hasOne(models.Player, { as: 'Winner', foreignKey: 'id', sourceKey: 'winner' });
		Game.hasOne(models.Player, { as: 'PlayerA', foreignKey: 'id', sourceKey: 'playerA' });
		Game.hasOne(models.Player, { as: 'PlayerB', foreignKey: 'id', sourceKey: 'playerB' });
		Game.hasMany(models.GameRound, { as: 'Rounds', foreignKey: 'game_id', sourceKey: 'id' });
	};

	return Game;
};
