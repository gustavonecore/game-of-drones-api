
const { Command } = require('simple-command-bus');

class FindPlayers extends Command {
	constructor(filter = {}) {
		super();
		this.filter = filter;
	}

	getFilter() {
		return this.filter;
	}
}

module.exports = FindPlayers;
