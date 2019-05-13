const useCases = require('../../../../application/useCases');
const HttpValidationError = require('../../errors/httpValidationError');
const { deepOmit } = require('../../utils');

const PAYLOAD = 'data';

/**
 * Base controller for REST
 */
class BaseController {
	constructor(container) {
		this.container = container;
		this.useCases = useCases;
		this.bus = this.container.commandBus;
	}

	json(data, statusCode = 200) {
		const cleanedData = deepOmit(data, ['id']);

		return {
			body: { [PAYLOAD]: cleanedData },
			statusCode,
		};
	}

	async validateInput(value, schema, options = {}) {
		const castedValue = schema.cast(value);

		const result = await schema.validate(castedValue, options).catch(error => {
			throw new HttpValidationError(error);
		});

		return result;
	}
}

module.exports = BaseController;
