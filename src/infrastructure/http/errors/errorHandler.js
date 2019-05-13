const { ServerError, BadRequest, NotFound } = require('./index');
const { APPLICATION_ERRORS } = require('../../../application/errors');

const defaults = {
	logger: console
};

module.exports = function(options = {}) {
	options = Object.assign({}, defaults, options);

	return (error, request, response, next) => { // eslint-disable-line no-unused-vars
		// Log the error if it didn't come from a service method call
		if (options.logger && typeof options.logger.error === 'function') {
			options.logger.error(error);
		}

		if (error.type === 'ApplicationError') {
			// Mapping application error to HTTP errors code.
			switch (error.code) {
				case APPLICATION_ERRORS.VALIDATION_ERROR: error = new BadRequest(error.message, 400); break;
				case APPLICATION_ERRORS.EXECUTION_ERROR: error = new ServerError(error.message, 500); break;
				case APPLICATION_ERRORS.ENTITY_NOT_FOUND: error = new NotFound(error.message, 404); break;
				case APPLICATION_ERRORS.INVALID_ARGUMENT: error = new BadRequest(error.message, 400); break;
				default: error = new ServerError(error.message, 500); break;
			}
		} else if (error.type !== 'httpError') {
			const oldError = error;
			error = new ServerError(oldError.message);

			if (oldError.stack) {
				error.stack = oldError.stack;
			}
		}

		error.code = !isNaN(parseInt(error.code, 10)) ? parseInt(error.code, 10) : 500;

		if (error.code === 404) {
			error.stack = null;
		}

		const output = Object.assign({}, error.toJSON());

		if (process.env.NODE_ENV === 'production') {
			delete output.stack;
		}

		response.set('Content-Type', 'application/json');
		response.status(error.code);
		response.json(output);
	};
};
