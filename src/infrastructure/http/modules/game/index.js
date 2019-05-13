const createRouter = require('./router');

module.exports = (container) => ({
	router: createRouter(container),
});
