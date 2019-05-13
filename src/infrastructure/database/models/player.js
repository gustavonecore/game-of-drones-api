const Sequelize = require('sequelize');

class Player extends Sequelize.Model {}

module.exports = (sequelize, DataTypes) => {
	Player.init({
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
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		slug: {
			type: DataTypes.STRING,
			allowNull: false
		},
		gamesWon: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
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
		tableName: 'player',
		sequelize,
	});

	Player.associate= (models) => {
		Player.hasMany(models.Game, { as: 'Games', foreignKey: 'winner_id', sourceKey: 'id' });
	};

	return Player;
};
