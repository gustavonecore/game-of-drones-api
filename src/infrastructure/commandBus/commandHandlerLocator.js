const fs = require('fs');
const path = require('path');
const lowerFirst = require('lodash/lowerFirst');
const { MissingHandlerException, HandlerLocator } = require('simple-command-bus');

class CommandHandlerLocator extends HandlerLocator {
	constructor(container) {
		super();
		this.container = container;

		const { config } = container;

		const useCasesBasePath = config.bus.useCasesBasePath;

		if (!useCasesBasePath || !isDirectory(useCasesBasePath)) {
			throw new Error('Invalid useCases path.');
		}

		this.handlers = fs.readdirSync(useCasesBasePath).map(dir =>
			isDirectory(path.join(useCasesBasePath, dir)) ?
				path.join(useCasesBasePath, dir) :
				null
		);
	}

	getHandlerForCommand(commandName) {
		const useCase = lowerFirst(commandName);

		const foundHandler = this.handlers.find(handler => handler.endsWith(useCase));

		if (!foundHandler) {
			MissingHandlerException.forCommand(commandName);
		}

		const Handler = require(path.join(foundHandler, 'handler.js')); // eslint-disable-line global-require

		if (isFunction(Handler) === false) {
			MissingHandlerException.forCommand(commandName);
		}

		return new Handler(this.container);
	}
}

const isDirectory = dir => fs.lstatSync(dir).isDirectory();

const isFunction = f => typeof f === 'function';

module.exports = CommandHandlerLocator;
