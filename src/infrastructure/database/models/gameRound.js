const Sequelize = require('sequelize');

class GameRound extends Sequelize.Model {}

module.exports = (sequelize, DataTypes) => {
	GameRound.init({
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
		index: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
		},
		selectionA: {
			type: DataTypes.ENUM('paper', 'rock', 'scissors'),
			allowNull: true
		},
		selectionB: {
			type: DataTypes.ENUM('paper', 'rock', 'scissors'),
			allowNull: true
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
		game: {
			type: DataTypes.INTEGER,
			field: 'game_id',
			allowNull: false,
			set(game) {
				if (game && game.id) {
					this.setDataValue('game', game.id);
				} else if (Number.isInteger(game)) {
					this.setDataValue('game', game);
				}
			}
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			field: 'created_at',
			allowNull: false
		},
	}, {
		timestamps: false,
		underscored: true,
		freezeTableName: true,
		tableName: 'game_round',
		sequelize,
	});

	GameRound.associate = (models) => {
		GameRound.hasOne(models.Player, { as: 'Winner', foreignKey: 'id', sourceKey: 'winner' });
		GameRound.belongsTo(models.Game);
	};

	return GameRound;
};
