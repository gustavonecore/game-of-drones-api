const {
	CommandBus,
	CommandHandlerMiddleware,
	ClassNameExtractor,
	HandleInflector,
} = require('simple-command-bus');

module.exports = ({ commandHandlerLocator }) => {
	const commandHandlerMiddleware = new CommandHandlerMiddleware(
		new ClassNameExtractor(),
		commandHandlerLocator,
		new HandleInflector()
	);

	return new CommandBus([commandHandlerMiddleware]);
};
