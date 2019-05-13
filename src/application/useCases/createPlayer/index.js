const { Command } = require('simple-command-bus');

class CreatePlayer extends Command {
	constructor(name) {
		super();
		this.name = name;
	}

	getName() {
		return this.name;
	}
}

module.exports = CreatePlayer;
