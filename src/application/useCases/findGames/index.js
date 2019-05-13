
const { Command } = require('simple-command-bus');

class FindGames extends Command {
	constructor(filter = {}) {
		super();
		this.filter = filter;
	}

	getFilter() {
		return this.filter;
	}
}

module.exports = FindGames;
