const { APPLICATION_ERRORS } = require('./index');

function InvalidArgumentError(message, code) {
	this.message = message;
	this.code = code || APPLICATION_ERRORS.INVALID_ARGUMENT;

	this.toJSON = () => ({
		code: this.code,
		message: this.message,
	});
}

InvalidArgumentError.prototype = new Error();
InvalidArgumentError.prototype.name = 'InvalidArgumentError';
InvalidArgumentError.prototype.type = 'ApplicationError';
InvalidArgumentError.prototype.constructor = InvalidArgumentError;

module.exports = InvalidArgumentError;
