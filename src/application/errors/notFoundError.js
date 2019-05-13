const { APPLICATION_ERRORS } = require('./index');

function NotFoundError(entity, id, code) {
	this.message = `Entity ${entity} with '${id}' not found`;
	this.code = code || APPLICATION_ERRORS.ENTITY_NOT_FOUND;

	this.toJSON = () => ({
		code: this.code,
		message: this.message,
	});
}

NotFoundError.prototype = new Error();
NotFoundError.prototype.name = 'NotFoundError';
NotFoundError.prototype.type = 'ApplicationError';
NotFoundError.prototype.constructor = NotFoundError;

module.exports = NotFoundError;
