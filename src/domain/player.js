const uuidv4 = require('uuid/v4');
const slugify = require('slugify');

class Player {
	constructor({ id, uuid, name, createdAt, slug, gamesWon }) {
		this.id = id;
		this.uuid = uuid;
		this.name = name;
		this.slug = slug;
		this.gamesWon = gamesWon || 0;
		this.createdAt = createdAt;
	}

	static create(name) {
		return new Player({
			name,
			uuid: uuidv4(),
			createdAt: new Date,
			slug: slugify(name, {
				lower: true
			})
		});
	}
}

module.exports = Player;
